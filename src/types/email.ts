export interface TempEmail {
  id: string;
  address: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface EmailMessage {
  id: string;
  from: {
    address: string;
    name?: string;
  };
  subject: string;
  intro?: string;
  text?: string;
  html?: string[];
  createdAt: Date;
  isOtp?: boolean;
  hasAttachments?: boolean;
  attachments?: Array<{
    id: string;
    filename: string;
    contentType: string;
    size: number;
    downloadUrl: string;
  }>;
}

export interface InboxState {
  email: TempEmail | null;
  messages: EmailMessage[];
  isLoading: boolean;
  error: string | null;
}
