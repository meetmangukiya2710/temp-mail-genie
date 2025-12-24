import { useState, useEffect, useCallback, useRef } from 'react';
import { TempEmail, EmailMessage, InboxState } from '@/types/email';
import { mailTmApi, MailTmSession, MailTmMessage, MailTmMessageFull } from '@/services/mailTmApi';
import { toast } from 'sonner';

const EMAIL_LIFETIME_MINUTES = 30;
const STORAGE_KEY = 'tempmail-session-v2';

// Check if text contains OTP-like patterns
function isOtpEmail(subject: string, text?: string): boolean {
  const otpKeywords = ['otp', 'code', 'verification', 'verify', 'confirm', 'pin', 'token', 'password', 'login', 'authenticate', '2fa', 'two-factor'];
  const combined = `${subject} ${text || ''}`.toLowerCase();
  return otpKeywords.some(keyword => combined.includes(keyword));
}

// Convert mail.tm message to our format
function convertMessage(msg: MailTmMessage | MailTmMessageFull): EmailMessage {
  const fullMsg = msg as MailTmMessageFull;
  return {
    id: msg.id,
    from: {
      address: msg.from.address,
      name: msg.from.name || undefined,
    },
    subject: msg.subject,
    intro: msg.intro,
    text: fullMsg.text,
    html: fullMsg.html,
    createdAt: new Date(msg.createdAt),
    isOtp: isOtpEmail(msg.subject, msg.intro),
  };
}

export function useTempEmail() {
  const [state, setState] = useState<InboxState>({
    email: null,
    messages: [],
    isLoading: true,
    error: null,
  });

  const [session, setSession] = useState<MailTmSession | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const initRef = useRef(false);

  // Create a new email account
  const createNewAccount = useCallback(async (): Promise<MailTmSession | null> => {
    try {
      // Get available domains
      const domains = await mailTmApi.getDomains();
      if (!domains.length) {
        throw new Error('No domains available');
      }

      const domain = domains[0].domain;
      const username = mailTmApi.generateUsername();
      const password = mailTmApi.generatePassword();
      const address = `${username}@${domain}`;

      // Create account
      const account = await mailTmApi.createAccount(address, password);

      // Get auth token
      const { token } = await mailTmApi.getToken(address, password);

      const now = new Date();
      const newSession: MailTmSession = {
        accountId: account.id,
        address,
        password,
        token,
        createdAt: now,
        expiresAt: new Date(now.getTime() + EMAIL_LIFETIME_MINUTES * 60 * 1000),
      };

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));

      return newSession;
    } catch (error) {
      console.error('Failed to create account:', error);
      return null;
    }
  }, []);

  // Initialize or restore session
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const init = async () => {
      setState(prev => ({ ...prev, isLoading: true }));

      // Try to restore session
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (stored) {
        try {
          const parsed: MailTmSession = JSON.parse(stored);
          parsed.createdAt = new Date(parsed.createdAt);
          parsed.expiresAt = new Date(parsed.expiresAt);

          // Check if expired
          if (new Date() >= parsed.expiresAt) {
            // Try to delete old account (best effort)
            try {
              await mailTmApi.deleteAccount(parsed.token, parsed.accountId);
            } catch {
              // Ignore errors
            }
            localStorage.removeItem(STORAGE_KEY);
          } else {
            // Verify token still works
            try {
              await mailTmApi.getMe(parsed.token);
              setSession(parsed);
              setState({
                email: {
                  id: parsed.accountId,
                  address: parsed.address,
                  createdAt: parsed.createdAt,
                  expiresAt: parsed.expiresAt,
                },
                messages: [],
                isLoading: false,
                error: null,
              });
              return;
            } catch {
              // Token invalid, create new account
              localStorage.removeItem(STORAGE_KEY);
            }
          }
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // Create new account
      const newSession = await createNewAccount();
      
      if (newSession) {
        setSession(newSession);
        setState({
          email: {
            id: newSession.accountId,
            address: newSession.address,
            createdAt: newSession.createdAt,
            expiresAt: newSession.expiresAt,
          },
          messages: [],
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          email: null,
          messages: [],
          isLoading: false,
          error: 'Failed to create email. Please try again.',
        });
      }
    };

    init();
  }, [createNewAccount]);

  // Update countdown timer
  useEffect(() => {
    if (!state.email) return;

    const updateTimer = () => {
      const now = new Date();
      const remaining = Math.max(0, state.email!.expiresAt.getTime() - now.getTime());
      setTimeLeft(Math.floor(remaining / 1000));

      if (remaining <= 0) {
        // Auto-expire - create new account
        generateNewEmail();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [state.email]);

  // Generate new email
  const generateNewEmail = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    // Delete old account if exists
    if (session) {
      try {
        await mailTmApi.deleteAccount(session.token, session.accountId);
      } catch {
        // Ignore errors
      }
    }

    localStorage.removeItem(STORAGE_KEY);

    const newSession = await createNewAccount();
    
    if (newSession) {
      setSession(newSession);
      setState({
        email: {
          id: newSession.accountId,
          address: newSession.address,
          createdAt: newSession.createdAt,
          expiresAt: newSession.expiresAt,
        },
        messages: [],
        isLoading: false,
        error: null,
      });
      toast.success('New email address generated!');
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to create email. Please try again.',
      }));
      toast.error('Failed to generate new email');
    }
  }, [session, createNewAccount]);

  // Refresh inbox (manual)
  const refreshInbox = useCallback(async () => {
    if (!session) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const mailTmMessages = await mailTmApi.getMessages(session.token);
      
      // Get full content for each message
      const messagesWithContent = await Promise.all(
        mailTmMessages.map(async (msg) => {
          try {
            const fullMsg = await mailTmApi.getMessage(session.token, msg.id);
            return convertMessage(fullMsg);
          } catch {
            return convertMessage(msg);
          }
        })
      );

      // Sort by date, newest first
      messagesWithContent.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      setState(prev => ({
        ...prev,
        messages: messagesWithContent,
        isLoading: false,
      }));

      if (messagesWithContent.length > 0) {
        const newCount = messagesWithContent.filter(m => 
          !state.messages.find(om => om.id === m.id)
        ).length;
        if (newCount > 0) {
          toast.success(`${newCount} new message${newCount > 1 ? 's' : ''} received!`);
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch messages',
      }));
      toast.error('Failed to refresh inbox');
    }
  }, [session, state.messages]);

  // Copy email to clipboard
  const copyEmail = useCallback(async () => {
    if (!state.email) return false;
    try {
      await navigator.clipboard.writeText(state.email.address);
      return true;
    } catch {
      return false;
    }
  }, [state.email]);

  // Format time remaining
  const formatTimeLeft = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    ...state,
    timeLeft,
    formattedTimeLeft: formatTimeLeft(timeLeft),
    generateNewEmail,
    refreshInbox,
    copyEmail,
    isExpired: timeLeft <= 0,
  };
}
