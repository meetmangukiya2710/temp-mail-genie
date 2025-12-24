import { useState, useEffect, useCallback } from 'react';
import { TempEmail, EmailMessage, InboxState } from '@/types/email';

const EMAIL_LIFETIME_MINUTES = 30;
const STORAGE_KEY = 'tempmail-session';

// Generate random string for email
function generateRandomString(length: number = 10): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Check if text contains OTP-like patterns
function isOtpEmail(subject: string, text?: string): boolean {
  const otpKeywords = ['otp', 'code', 'verification', 'verify', 'confirm', 'pin', 'token', 'password', 'login'];
  const combined = `${subject} ${text || ''}`.toLowerCase();
  return otpKeywords.some(keyword => combined.includes(keyword));
}

// Mock email generation for demo purposes
// In production, integrate with mail.tm or similar API
function createMockEmail(): TempEmail {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + EMAIL_LIFETIME_MINUTES * 60 * 1000);
  
  return {
    id: generateRandomString(20),
    address: `${generateRandomString(12)}@tempmail.dev`,
    createdAt: now,
    expiresAt,
  };
}

// Generate mock messages for demo
function generateMockMessages(): EmailMessage[] {
  const messages: EmailMessage[] = [
    {
      id: '1',
      from: { address: 'noreply@example.com', name: 'Example Service' },
      subject: 'Your verification code is 847293',
      intro: 'Use this code to verify your account.',
      text: 'Your verification code is: 847293. This code will expire in 10 minutes.',
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
      isOtp: true,
    },
    {
      id: '2',
      from: { address: 'welcome@newsletter.com', name: 'Newsletter' },
      subject: 'Welcome to our newsletter!',
      intro: 'Thank you for subscribing to our newsletter.',
      text: 'You will now receive our latest updates and news directly in your inbox.',
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
      isOtp: false,
    },
    {
      id: '3',
      from: { address: 'security@app.io', name: 'App Security' },
      subject: 'Login OTP: 159734',
      intro: 'Your one-time password for login.',
      text: 'Your OTP for logging in is 159734. Do not share this code with anyone.',
      createdAt: new Date(Date.now() - 2 * 60 * 1000),
      isOtp: true,
    },
  ];

  return messages.map(msg => ({
    ...msg,
    isOtp: isOtpEmail(msg.subject, msg.text),
  }));
}

export function useTempEmail() {
  const [state, setState] = useState<InboxState>({
    email: null,
    messages: [],
    isLoading: true,
    error: null,
  });

  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Load or create email on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const email: TempEmail = {
          ...parsed.email,
          createdAt: new Date(parsed.email.createdAt),
          expiresAt: new Date(parsed.email.expiresAt),
        };
        
        // Check if expired
        if (new Date() >= email.expiresAt) {
          localStorage.removeItem(STORAGE_KEY);
          const newEmail = createMockEmail();
          setState({ email: newEmail, messages: [], isLoading: false, error: null });
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: newEmail, messages: [] }));
        } else {
          const messages = parsed.messages.map((m: EmailMessage) => ({
            ...m,
            createdAt: new Date(m.createdAt),
          }));
          setState({ email, messages, isLoading: false, error: null });
        }
      } catch {
        const newEmail = createMockEmail();
        setState({ email: newEmail, messages: [], isLoading: false, error: null });
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: newEmail, messages: [] }));
      }
    } else {
      const newEmail = createMockEmail();
      setState({ email: newEmail, messages: [], isLoading: false, error: null });
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: newEmail, messages: [] }));
    }
  }, []);

  // Update countdown timer
  useEffect(() => {
    if (!state.email) return;

    const updateTimer = () => {
      const now = new Date();
      const remaining = Math.max(0, state.email!.expiresAt.getTime() - now.getTime());
      setTimeLeft(Math.floor(remaining / 1000));

      if (remaining <= 0) {
        // Auto-expire
        localStorage.removeItem(STORAGE_KEY);
        const newEmail = createMockEmail();
        setState({ email: newEmail, messages: [], isLoading: false, error: null });
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: newEmail, messages: [] }));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [state.email]);

  // Generate new email
  const generateNewEmail = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    const newEmail = createMockEmail();
    setState({ email: newEmail, messages: [], isLoading: false, error: null });
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: newEmail, messages: [] }));
  }, []);

  // Refresh inbox (manual)
  const refreshInbox = useCallback(async () => {
    if (!state.email) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, fetch from mail.tm API
    // For demo, add mock messages
    const mockMessages = generateMockMessages();
    
    setState(prev => {
      const updated = { ...prev, messages: mockMessages, isLoading: false };
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: prev.email, messages: mockMessages }));
      return updated;
    });
  }, [state.email]);

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
