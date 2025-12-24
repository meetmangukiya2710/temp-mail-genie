import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

interface DomainSelectorProps {
    domains: string[];
    selectedDomain: string;
    onDomainChange: (domain: string) => void;
    disabled?: boolean;
}

export function DomainSelector({
    domains,
    selectedDomain,
    onDomainChange,
    disabled,
}: DomainSelectorProps) {
    if (domains.length === 0) {
        return null;
    }

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Email Domain
            </label>
            <Select
                value={selectedDomain}
                onValueChange={onDomainChange}
                disabled={disabled}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select domain">
                        @{selectedDomain}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {domains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                            @{domain}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
