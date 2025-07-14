'use client';
import { SocialPlatformIcons } from '@/components/common/icons/social-platform-icons';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Platform {
  id: string;
  name: string;
  color: string;
}

interface AccountSelectorProps {
  platform: Platform;
  accounts: string[];
  selectedAccounts: string[];
  onAccountSelect: (accounts: string[]) => void;
}

export function AccountSelector({
  platform,
  accounts,
  selectedAccounts,
  onAccountSelect,
}: AccountSelectorProps) {
  const handleAccountToggle = (account: string) => {
    const newSelected = selectedAccounts.includes(account)
      ? selectedAccounts.filter((a) => a !== account)
      : [...selectedAccounts, account];

    onAccountSelect(newSelected);
  };

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center space-x-2 mb-3">
          <SocialPlatformIcons platform={platform.id} className="w-4 h-4" />
          <Label className="font-medium">{platform.name}</Label>
        </div>
        <div className="space-y-2">
          {accounts.map((account) => (
            <div key={account} className="flex items-center space-x-2">
              <Checkbox
                id={`${platform.id}-${account}`}
                checked={selectedAccounts.includes(account)}
                onCheckedChange={() => handleAccountToggle(account)}
              />
              <Label
                htmlFor={`${platform.id}-${account}`}
                className="text-sm cursor-pointer"
              >
                {account}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
