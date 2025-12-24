import { ArrowLeft, Copy, Shield, User, Clock, File, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmailMessage } from '@/types/email';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useState } from 'react';

interface EmailDetailProps {
  message: EmailMessage;
  onBack: () => void;
  authToken?: string;
}

export function EmailDetail({ message, onBack, authToken }: EmailDetailProps) {
  const [copied, setCopied] = useState(false);

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(message.text || '');
      setCopied(true);
      toast.success('Email content copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  // Extract potential OTP codes from message
  const extractOtpCodes = (text: string): string[] => {
    const patterns = [
      /\b(\d{4,8})\b/g, // 4-8 digit codes
      /\b([A-Z0-9]{6,8})\b/g, // Alphanumeric codes
    ];

    const codes: string[] = [];
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        codes.push(...matches.slice(0, 3)); // Limit to 3 codes
      }
    });

    return [...new Set(codes)]; // Remove duplicates
  };

  const otpCodes = message.text ? extractOtpCodes(message.text) : [];

  const copyOtp = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(`Code "${code}" copied!`);
    } catch {
      toast.error('Failed to copy code');
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card className="animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="font-semibold truncate flex-1">Message</h2>
        <Button variant="outline" size="sm" onClick={copyContent}>
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </div>

      {/* Meta info */}
      <div className="p-4 bg-muted/30 border-b space-y-3">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">
              {message.from.name || 'Unknown Sender'}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {message.from.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{format(message.createdAt, 'PPpp')}</span>
        </div>

        {message.isOtp && (
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              This email contains a verification code
            </span>
          </div>
        )}
      </div>

      {/* Subject */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">{message.subject}</h3>
      </div>

      {/* OTP Codes (if detected) */}
      {otpCodes.length > 0 && (
        <div className="p-4 border-b bg-accent/50">
          <p className="text-sm font-medium mb-2">Detected codes:</p>
          <div className="flex flex-wrap gap-2">
            {otpCodes.map((code, idx) => (
              <button
                key={idx}
                onClick={() => copyOtp(code)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-lg border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <code className="font-mono font-bold text-primary">{code}</code>
                <Copy className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attachments */}
      {message.attachments && message.attachments.length > 0 && (
        <div className="p-4 border-b bg-muted/20">
          <p className="text-sm font-medium mb-3 flex items-center gap-2">
            <File className="h-4 w-4" />
            Attachments ({message.attachments.length})
          </p>
          <div className="space-y-2">
            {message.attachments.map((attachment) => {
              const isImage = attachment.contentType.startsWith('image/');

              return (
                <div
                  key={attachment.id}
                  className="flex items-center gap-3 p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    {isImage ? (
                      <ImageIcon className="h-5 w-5 text-primary" />
                    ) : (
                      <File className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm">{attachment.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Body */}
      <div className="p-4">
        {message.html && message.html.length > 0 ? (
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: message.html.join('') }}
          />
        ) : (
          <p className="whitespace-pre-wrap text-foreground leading-relaxed">
            {message.text || 'No content'}
          </p>
        )}
      </div>
    </Card>
  );
}
