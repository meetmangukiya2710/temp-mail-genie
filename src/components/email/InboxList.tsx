import { RefreshCw, Inbox, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmailMessage } from '@/types/email';
import { useTranslation } from 'react-i18next';

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
  selectedId
}: InboxListProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-card/30 border rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="px-6 py-4 border-b flex items-center justify-between bg-card/50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Inbox size={18} />
          </div>
          <h2 className="font-semibold">{t('inbox.title')}</h2>
          {messages.length > 0 && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              {messages.length}
            </span>
          )}
        </div>
        <Button
          onClick={onRefresh}
          variant="ghost"
          size="sm"
          className="gap-2 text-xs h-8"
          disabled={isLoading}
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          {t('common.refresh')}
        </Button>
      </div>

      <div className="divide-y max-h-[400px] overflow-y-auto interactive-scroll">
        {messages.length === 0 ? (
          <div className="py-20 px-6 text-center flex flex-col items-center">
            {isLoading ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-muted/20 rounded-full mb-4" />
                <div className="h-4 w-32 bg-muted/20 rounded mb-2" />
                <div className="h-3 w-48 bg-muted/20 rounded" />
              </div>
            ) : (
              <>
                <div className="h-16 w-16 bg-muted/10 rounded-full flex items-center justify-center text-muted-foreground/40 mb-4">
                  <Inbox size={32} />
                </div>
                <h3 className="font-medium text-muted-foreground">{t('inbox.no_emails')}</h3>
                <p className="text-sm text-muted-foreground/60">{t('inbox.no_emails_desc')}</p>
              </>
            )}
          </div>
        ) : (
          messages.map((message) => (
            <button
              key={message.id}
              onClick={() => onSelectMessage(message)}
              className={`w-full text-left p-4 hover:bg-primary/5 transition-colors flex items-center gap-4 group ${selectedId === message.id ? 'bg-primary/5' : ''
                }`}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-bold shrink-0">
                {message.from.name ? message.from.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-bold text-sm truncate pr-2">{message.from.name || message.from.address}</span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground truncate font-medium">{message.subject}</p>
                  {message.subject.toLowerCase().includes('otp') || message.subject.toLowerCase().includes('code') || message.subject.toLowerCase().includes('verify') ? (
                    <span className="flex items-center gap-0.5 bg-success/10 text-success text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0">
                      <ShieldCheck size={10} />
                      {t('inbox.otp_badge')}
                    </span>
                  ) : null}
                </div>
              </div>
              <ArrowRight size={14} className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
