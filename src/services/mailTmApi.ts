// mail.tm API service
// API docs: https://docs.mail.tm/

const API_BASE = 'https://api.mail.tm';

export interface MailTmDomain {
  id: string;
  domain: string;
  isActive: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MailTmAccount {
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MailTmMessage {
  id: string;
  accountId: string;
  msgid: string;
  from: {
    address: string;
    name: string;
  };
  to: {
    address: string;
    name: string;
  }[];
  subject: string;
  intro: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MailTmAttachment {
  id: string;
  filename: string;
  contentType: string;
  disposition: string;
  transferEncoding: string;
  related: boolean;
  size: number;
  downloadUrl: string;
}

export interface MailTmMessageFull extends MailTmMessage {
  text?: string;
  html?: string[];
  attachments?: MailTmAttachment[];
}

export interface MailTmSession {
  accountId: string;
  address: string;
  password: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

class MailTmApi {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  private async requestWithAuth<T>(
    endpoint: string,
    token: string,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Get available domains
  async getDomains(): Promise<MailTmDomain[]> {
    const response = await this.request<{ 'hydra:member': MailTmDomain[] }>(
      '/domains'
    );
    return response['hydra:member'];
  }

  // Create a new account
  async createAccount(
    address: string,
    password: string
  ): Promise<MailTmAccount> {
    return this.request<MailTmAccount>('/accounts', {
      method: 'POST',
      body: JSON.stringify({ address, password }),
    });
  }

  // Get auth token
  async getToken(
    address: string,
    password: string
  ): Promise<{ token: string; id: string }> {
    return this.request<{ token: string; id: string }>('/token', {
      method: 'POST',
      body: JSON.stringify({ address, password }),
    });
  }

  // Get current account info
  async getMe(token: string): Promise<MailTmAccount> {
    return this.requestWithAuth<MailTmAccount>('/me', token);
  }

  // Get messages
  async getMessages(token: string, page = 1): Promise<MailTmMessage[]> {
    const response = await this.requestWithAuth<{
      'hydra:member': MailTmMessage[];
    }>(`/messages?page=${page}`, token);
    return response['hydra:member'];
  }

  // Get single message with full content
  async getMessage(token: string, messageId: string): Promise<MailTmMessageFull> {
    return this.requestWithAuth<MailTmMessageFull>(
      `/messages/${messageId}`,
      token
    );
  }

  // Delete message
  async deleteMessage(token: string, messageId: string): Promise<void> {
    return this.requestWithAuth<void>(`/messages/${messageId}`, token, {
      method: 'DELETE',
    });
  }

  // Delete account
  async deleteAccount(token: string, accountId: string): Promise<void> {
    return this.requestWithAuth<void>(`/accounts/${accountId}`, token, {
      method: 'DELETE',
    });
  }

  // Generate random password
  generatePassword(length = 16): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  // Generate random username
  generateUsername(length = 10): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }
}

export const mailTmApi = new MailTmApi();
