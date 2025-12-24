import { useState, useEffect, useCallback } from 'react';
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
    hasAttachments: msg.hasAttachments,
    attachments: fullMsg.attachments?.map(att => ({
      id: att.id,
      filename: att.filename,
      contentType: att.contentType,
      size: att.size,
      downloadUrl: att.downloadUrl,
    })),
  };
}

// Create a new email account
async function createNewAccount(selectedDomain?: string): Promise<MailTmSession | null> {
  try {
    // Get available domains
    const domains = await mailTmApi.getDomains();
    if (!domains.length) {
      throw new Error('No domains available');
    }

    // Use selected domain or first available
    const domain = selectedDomain || domains[0].domain;
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
}

function sessionToEmail(session: MailTmSession): TempEmail {
  return {
    id: session.accountId,
    address: session.address,
    createdAt: session.createdAt,
    expiresAt: session.expiresAt,
  };
}

export function useTempEmail() {
  const [email, setEmail] = useState<TempEmail | null>(null);
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<MailTmSession | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [initialized, setInitialized] = useState(false);
  const [availableDomains, setAvailableDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('');

  // Initialize or restore session
  useEffect(() => {
    if (initialized) return;

    let mounted = true;

    const init = async () => {
      // Fetch available domains first
      try {
        const domains = await mailTmApi.getDomains();
        const domainList = domains.map(d => d.domain);
        if (mounted) {
          setAvailableDomains(domainList);
          if (domainList.length > 0 && !selectedDomain) {
            setSelectedDomain(domainList[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch domains:', err);
      }

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
              if (mounted) {
                setSession(parsed);
                setEmail(sessionToEmail(parsed));
                setIsLoading(false);
                setInitialized(true);
              }
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

      if (mounted) {
        if (newSession) {
          setSession(newSession);
          setEmail(sessionToEmail(newSession));
          setIsLoading(false);
        } else {
          setError('Failed to create email. Please try again.');
          setIsLoading(false);
        }
        setInitialized(true);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [initialized]);

  // Update countdown timer
  useEffect(() => {
    if (!email) return;

    const updateTimer = () => {
      const now = new Date();
      const remaining = Math.max(0, email.expiresAt.getTime() - now.getTime());
      setTimeLeft(Math.floor(remaining / 1000));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [email]);

  // Generate new email
  const generateNewEmail = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Delete old account if exists
    if (session) {
      try {
        await mailTmApi.deleteAccount(session.token, session.accountId);
      } catch {
        // Ignore errors
      }
    }

    localStorage.removeItem(STORAGE_KEY);

    const newSession = await createNewAccount(selectedDomain);

    if (newSession) {
      setSession(newSession);
      setEmail(sessionToEmail(newSession));
      setMessages([]);
      setIsLoading(false);
      toast.success('New email address generated!');
    } else {
      setError('Failed to create email. Please try again.');
      setIsLoading(false);
      toast.error('Failed to generate new email');
    }
  }, [session, selectedDomain]);

  // Refresh inbox (manual)
  const refreshInbox = useCallback(async () => {
    if (!session) return;

    setIsLoading(true);
    setError(null);

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

      // Deduplicate messages by ID to prevent double showing
      const uniqueMessages = Array.from(
        new Map(messagesWithContent.map(m => [m.id, m])).values()
      );

      // Sort by date, newest first
      uniqueMessages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      const newCount = uniqueMessages.filter(m =>
        !messages.find(om => om.id === m.id)
      ).length;

      setMessages(uniqueMessages);
      setIsLoading(false);

      if (newCount > 0) {
        toast.success(`${newCount} new message${newCount > 1 ? 's' : ''} received!`);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setError('Failed to fetch messages');
      setIsLoading(false);
      toast.error('Failed to refresh inbox');
    }
  }, [session, messages]);

  // Copy email to clipboard
  const copyEmail = useCallback(async () => {
    if (!email) return false;
    try {
      await navigator.clipboard.writeText(email.address);
      return true;
    } catch {
      return false;
    }
  }, [email]);

  // Format time remaining
  const formatTimeLeft = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    email,
    messages,
    isLoading,
    error,
    timeLeft,
    formattedTimeLeft: formatTimeLeft(timeLeft),
    generateNewEmail,
    refreshInbox,
    copyEmail,
    isExpired: timeLeft <= 0,
    availableDomains,
    selectedDomain,
    setSelectedDomain,
    authToken: session?.token,
  };
}
