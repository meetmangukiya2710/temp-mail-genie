import { useState } from 'react';
import { Copy, RefreshCw, Clock, Check, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from 'react-i18next';
import { CustomEmailDialog } from './CustomEmailDialog';

interface EmailDisplayProps {
  email: string;
  timeLeft: string;
  isExpired: boolean;
  onCopy: () => void;
  onGenerate: () => void;
  onCreateCustom?: (username: string, domain: string) => Promise<void>;
  isLoading?: boolean;
  availableDomains?: string[];
  selectedDomain?: string;
  onDomainChange?: (domain: string) => void;
}

export function EmailDisplay({
  email,
  timeLeft,
  isExpired,
  onCopy,
  onGenerate,
  onCreateCustom,
  isLoading,
  availableDomains = [],
  selectedDomain,
  onDomainChange
}: EmailDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const { t } = useTranslation();

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    toast.success(t('common.copied'));
    setTimeout(() => setCopied(false), 2000);
  };

  const emailUser = email.split('@')[0];

  return (
    <Card className="border-2 shadow-lg animate-scale-in overflow-hidden">
      <div className="bg-primary/5 px-6 py-4 border-b">
        <label className="text-sm font-medium text-muted-foreground block mb-1">
          {t('email.your_address')}
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-1 min-w-[200px] flex items-center bg-background border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <span className="px-3 py-2 font-medium truncate">{emailUser}</span>
            <span className="text-muted-foreground">@</span>
            <div className="flex-1">
              <Select value={selectedDomain} onValueChange={onDomainChange} disabled={isLoading}>
                <SelectTrigger className="border-0 focus:ring-0 h-9 bg-transparent shadow-none">
                  <SelectValue placeholder="domain" />
                </SelectTrigger>
                <SelectContent>
                  {availableDomains.map(domain => (
                    <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className="shrink-0"
            aria-label={t('email.copy_email')}
          >
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <CardContent className="p-6 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isExpired ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary animate-pulse-gentle'}`}>
              <Clock size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">
                {isExpired ? t('email.expired') : timeLeft}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                {isExpired ? "" : t('email.remaining')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={handleCopy}
              className="flex-1 sm:flex-none gap-2"
              variant="cyan"
            >
              <Copy size={18} />
              {t('email.copy_email')}
            </Button>
            {onCreateCustom && (
              <Button
                onClick={() => setShowCustomDialog(true)}
                className="flex-1 sm:flex-none gap-2"
                variant="purple"
                disabled={isLoading}
              >
                <Edit size={18} />
                {t('email.custom.create_custom')}
              </Button>
            )}
            <Button
              onClick={onGenerate}
              className="flex-1 sm:flex-none gap-2 shadow-md hover:shadow-lg transition-all"
              disabled={isLoading}
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              {t('common.new_email')}
            </Button>
          </div>
        </div>
      </CardContent>

      {onCreateCustom && (
        <CustomEmailDialog
          open={showCustomDialog}
          onOpenChange={setShowCustomDialog}
          availableDomains={availableDomains}
          selectedDomain={selectedDomain || availableDomains[0] || ''}
          onDomainChange={onDomainChange || (() => { })}
          onCreate={onCreateCustom}
          isLoading={isLoading}
        />
      )}
    </Card>
  );
}
