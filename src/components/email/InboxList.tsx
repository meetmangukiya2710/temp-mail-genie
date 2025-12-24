import { RefreshCw, Mail, MailOpen, Shield, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmailMessage } from '@/types/email';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface InboxListProps {
  messages: EmailMessage[];
  isLoading: boolean;
  onRefresh: () => void;
  onSelectMessage: (message: EmailMessage) => void;
  selectedId?: string;
}

export function InboxList({
  messages,
  isLoading,
  onRefresh,
  onSelectMessage,
  selectedId,
}: InboxListProps) {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-semibold">Inbox</h2>
          {messages.length > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {messages.length}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      <div className="divide-y">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-2">No emails yet</p>
            <p className="text-sm text-muted-foreground/70">
              Tap refresh to check for new messages
            </p>
          </div>
        ) : (
          <ul className="stagger-children">
            {messages.map((message) => (
              <li key={message.id}>
                <button
                  onClick={() => onSelectMessage(message)}
                  className={cn(
                    "w-full text-left p-4 transition-colors hover:bg-muted/50",
                    selectedId === message.id && "bg-accent"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "shrink-0 h-10 w-10 rounded-full flex items-center justify-center mt-0.5",
                      message.isOtp 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {message.isOtp ? (
                        <Shield className="h-5 w-5" />
                      ) : (
                        <MailOpen className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-medium truncate">
                          {message.from.name || message.from.address}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                        </span>
                      </div>
                      
                      <p className={cn(
                        "text-sm truncate",
                        message.isOtp ? "text-primary font-medium" : "text-foreground"
                      )}>
                        {message.subject}
                      </p>
                      
                      {message.intro && (
                        <p className="text-sm text-muted-foreground truncate mt-0.5">
                          {message.intro}
                        </p>
                      )}
                      
                      {message.isOtp && (
                        <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          <Shield className="h-3 w-3" />
                          OTP / Verification
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
