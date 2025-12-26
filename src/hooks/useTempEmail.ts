import { useState, useEffect, useCallback } from 'react';
import { TempEmail, EmailMessage } from '@/types/email';
import { mailTmApi, MailTmSession, MailTmMessage, MailTmMessageFull } from '@/services/mailTmApi';
import { toast } from 'sonner';

const EMAIL_LIFETIME_MINUTES = 30;
const STORAGE_KEY = 'tempmail-session-v4';

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
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + EMAIL_LIFETIME_MINUTES * 60 * 1000).toISOString(),
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
    createdAt: new Date(session.createdAt),
    expiresAt: new Date(session.expiresAt),
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
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);
  const REFRESH_COOLDOWN = 3000;

  // Helper for retrying with backoff
  const retryWithBackoff = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
    try {
      return await fn();
    } catch (error: any) {
      if (retries === 0 || error.message === 'RATE_LIMIT') throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
  };

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
          const expiresAt = new Date(parsed.expiresAt);

          // Check if expired
          if (new Date() >= expiresAt) {
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

    // Cool-down check
    const now = Date.now();
    if (now - lastRefreshTime < REFRESH_COOLDOWN) {
      toast.info(`Please wait a few seconds before refreshing again.`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch brief messages with retry
      const mailTmMessages = await retryWithBackoff(() =>
        mailTmApi.getMessages(session.token)
      );

      // Fetch full content for each message (Resiliently)
      const messagesWithContent = await Promise.all(
        mailTmMessages.map(async (msg) => {
          try {
            const fullMsg = await mailTmApi.getMessage(session.token, msg.id);
            return convertMessage(fullMsg);
          } catch (err) {
            console.warn(`Failed to fetch detail for message ${msg.id}:`, err);
            return convertMessage(msg);
          }
        })
      );

      // Sort by date, newest first
      messagesWithContent.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      const newCount = messagesWithContent.filter(m =>
        !messages.find(om => om.id === m.id)
      ).length;

      setMessages(messagesWithContent);
      setLastRefreshTime(Date.now());
      setIsLoading(false);

      if (newCount > 0) {
        toast.success(`${newCount} new message${newCount > 1 ? 's' : ''} received!`);
      } else if (mailTmMessages.length === 0) {
        toast.info('Inbox is empty. No new messages.');
      }
    } catch (err: any) {
      console.error('Failed to fetch messages:', err);

      let errorMessage = 'Failed to refresh inbox';
      if (err.message === 'RATE_LIMIT') {
        errorMessage = 'Too many requests. Please wait a minute.';
      } else if (err.message === 'TIMEOUT') {
        errorMessage = 'Connection timed out. Check your internet.';
      }

      setError(errorMessage);
      setIsLoading(false);
      toast.error(errorMessage);
    }
  }, [session, messages, lastRefreshTime]);

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
