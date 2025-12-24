import { useState } from 'react';
import { Copy, Check, RefreshCw, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface EmailDisplayProps {
  email: string;
  timeLeft: string;
  isExpired: boolean;
  onCopy: () => Promise<boolean>;
  onGenerate: () => void;
  isLoading?: boolean;
}

export function EmailDisplay({
  email,
  timeLeft,
  isExpired,
  onCopy,
  onGenerate,
  isLoading,
}: EmailDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopy();
    if (success) {
      setCopied(true);
      toast.success('Email copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy email');
    }
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <div className="p-6 sm:p-8">
        {/* Timer */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
            isExpired 
              ? "bg-destructive/10 text-destructive"
              : "bg-accent text-accent-foreground"
          )}>
            {isExpired ? (
              <>
                <AlertCircle className="h-4 w-4" />
                <span>Expired</span>
              </>
            ) : (
              <>
                <Clock className="h-4 w-4" />
                <span className="font-mono tabular-nums">{timeLeft}</span>
                <span className="text-muted-foreground">remaining</span>
              </>
            )}
          </div>
        </div>

        {/* Email address */}
        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Your temporary email address
          </p>
          
          <div className="relative group">
            <div className={cn(
              "flex items-center justify-between gap-3 p-4 rounded-xl border-2 border-dashed transition-all duration-200",
              "bg-muted/50 hover:border-primary/50",
              copied && "border-success bg-success/5"
            )}>
              <code className="flex-1 text-base sm:text-lg font-mono font-medium truncate">
                {email}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-success" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={handleCopy}
            size="lg"
            className="flex-1"
            disabled={isLoading}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                Copy Email
              </>
            )}
          </Button>
          
          <Button
            onClick={onGenerate}
            variant="outline"
            size="lg"
            className="flex-1"
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-5 w-5", isLoading && "animate-spin")} />
            New Email
          </Button>
        </div>
      </div>
    </Card>
  );
}
