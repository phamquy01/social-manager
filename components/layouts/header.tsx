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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`w-10 h-10 ${currentTheme.gradient} rounded-xl flex items-center justify-center`}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1
                className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Social Manager
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Quản lý mạng xã hội thông minh
              </p>
            </div>
          </div>
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
