'use client';

import { Button } from '@/components/ui/button';
import {
  Home,
  Plus,
  BarChart3,
  MessageSquare,
  Users,
  Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/lib/contexts/theme-context';

export function Sidebar() {
  const { isDarkMode, currentTheme, t } = useTheme();
  const pathname = usePathname();

  const menuItems = [
    { id: '/', icon: Home, label: t('dashboard') },
    { id: '/create', icon: Plus, label: t('create') },
    { id: '/posts', icon: BarChart3, label: t('posts') },
    { id: '/comments', icon: MessageSquare, label: t('comments') },
    { id: '/accounts', icon: Users, label: t('accounts') },
    { id: '/settings', icon: Settings, label: t('settings') },
  ];

  return (
    <div
      className={`w-80 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white/80'
      } backdrop-blur-sm border-r ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      } flex flex-col shadow-xl`}
    >
      {/* Header */}
      <div
        className={`p-6 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-white/20'
        }`}
      >
        <div className="flex items-center space-x-3">
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
              className={`text-xl font-bold ${currentTheme.gradient.replace(
                'bg-gradient-to-r',
                'bg-gradient-to-r'
              )} bg-clip-text text-transparent`}
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
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.id}>
            <Button
              variant={pathname === item.id ? 'default' : 'ghost'}
              className={`w-full justify-start transition-all duration-200 cursor-pointer ${
                pathname === item.id
                  ? `${currentTheme.gradient} text-white shadow-lg`
                  : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-white/50'}`
              }`}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
