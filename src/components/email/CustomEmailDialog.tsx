import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface CustomEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableDomains: string[];
  selectedDomain: string;
  onDomainChange: (domain: string) => void;
  onCreate: (username: string, domain: string) => Promise<void>;
  isLoading?: boolean;
}

// Email username validation rules
const EMAIL_USERNAME_MIN_LENGTH = 3;
const EMAIL_USERNAME_MAX_LENGTH = 32;
const EMAIL_USERNAME_PATTERN = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/;

export function CustomEmailDialog({
  open,
  onOpenChange,
  availableDomains,
  selectedDomain,
  onDomainChange,
  onCreate,
  isLoading = false,
}: CustomEmailDialogProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [domain, setDomain] = useState(selectedDomain);

  // Update domain when selectedDomain prop changes
  useEffect(() => {
    if (selectedDomain && availableDomains.includes(selectedDomain)) {
      setDomain(selectedDomain);
    } else if (availableDomains.length > 0) {
      setDomain(availableDomains[0]);
    }
  }, [selectedDomain, availableDomains]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setUsername('');
      setError(null);
    }
  }, [open]);

  const validateUsername = (value: string): string | null => {
    if (!value.trim()) {
      return t('email.custom.username_required');
    }

    if (value.length < EMAIL_USERNAME_MIN_LENGTH) {
      return t('email.custom.username_too_short', { min: EMAIL_USERNAME_MIN_LENGTH });
    }

    if (value.length > EMAIL_USERNAME_MAX_LENGTH) {
      return t('email.custom.username_too_long', { max: EMAIL_USERNAME_MAX_LENGTH });
    }

    if (!EMAIL_USERNAME_PATTERN.test(value)) {
      return t('email.custom.username_invalid');
    }

    return null;
  };

  const handleUsernameChange = (value: string) => {
    // Convert to lowercase and remove spaces
    const cleaned = value.toLowerCase().replace(/\s/g, '');
    setUsername(cleaned);
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleCreate = async () => {
    const validationError = validateUsername(username);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!domain) {
      setError(t('email.custom.domain_required'));
      return;
    }

    setError(null);
    
    try {
      await onCreate(username, domain);
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || t('email.custom.create_failed'));
    }
  };

  const handleDomainChange = (newDomain: string) => {
    setDomain(newDomain);
    onDomainChange(newDomain);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('email.custom.title')}</DialogTitle>
          <DialogDescription>
            {t('email.custom.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t('email.custom.username_label')}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder={t('email.custom.username_placeholder')}
                disabled={isLoading}
                maxLength={EMAIL_USERNAME_MAX_LENGTH}
                className="flex-1"
                autoFocus
              />
              <span className="text-muted-foreground">@</span>
              <Select value={domain} onValueChange={handleDomainChange} disabled={isLoading}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('email.custom.domain_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {availableDomains.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">
              {t('email.custom.username_hint', {
                min: EMAIL_USERNAME_MIN_LENGTH,
                max: EMAIL_USERNAME_MAX_LENGTH,
              })}
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            <p className="font-medium mb-1">{t('email.custom.preview')}</p>
            <p className="font-mono">
              {username || t('email.custom.username_placeholder')}@{domain || availableDomains[0] || 'domain.com'}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isLoading || !username.trim() || !domain}
          >
            {isLoading ? t('common.loading') : t('email.custom.create_button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

