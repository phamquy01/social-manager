'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/lib/contexts/theme-context';

export function Header() {
  const { isDarkMode, currentTheme } = useTheme();

  const mockConnectedAccounts = 3;

  return (
    <>
      <header
        className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white/80'
        } backdrop-blur-sm border-b ${
          isDarkMode ? 'border-gray-700' : 'border-white/20'
        } px-6 py-4 shadow-sm`}
      >
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-3">
            <Badge
              variant="outline"
              className={`${
                isDarkMode
                  ? 'bg-gray-700 text-green-400 border-green-600'
                  : 'bg-green-50 text-green-700 border-green-200'
              }`}
            >
              {mockConnectedAccounts} tài khoản
            </Badge>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className={`${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white/50 border-white/20'
                } shadow-md`}
              >
                Đăng ký
              </Button>
              <Button
                className={`${currentTheme.gradient} ${currentTheme.hover} shadow-lg`}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
