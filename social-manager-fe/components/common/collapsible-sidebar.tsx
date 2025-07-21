'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Home,
  Plus,
  BarChart3,
  MessageSquare,
  Users,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { useTheme } from '@/lib/contexts/theme-context';

interface CollapsibleSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function CollapsibleSidebar({
  activeTab,
  setActiveTab,
}: CollapsibleSidebarProps) {
  const { isDarkMode, currentTheme, t } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: t('dashboard') },
    { id: 'create', icon: Plus, label: t('create') },
    { id: 'posts', icon: BarChart3, label: t('posts') },
    { id: 'comments', icon: MessageSquare, label: t('comments') },
    { id: 'accounts', icon: Users, label: t('accounts') },
    { id: 'settings', icon: Settings, label: t('settings') },
  ];

  return (
    <div
      className={`${isCollapsed ? 'w-16' : 'w-64'} ${
        isDarkMode ? 'bg-gray-800' : 'bg-white/80'
      } backdrop-blur-sm border-r ${
        isDarkMode ? 'border-gray-700' : 'border-white/20'
      } flex flex-col shadow-xl transition-all duration-300`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-white/20'
        } flex items-center justify-between`}
      >
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={
                        currentTheme.id === 'blue'
                          ? '#3B82F6'
                          : currentTheme.id === 'green'
                          ? '#10B981'
                          : currentTheme.id === 'purple'
                          ? '#8B5CF6'
                          : currentTheme.id === 'orange'
                          ? '#F97316'
                          : currentTheme.id === 'pink'
                          ? '#EC4899'
                          : currentTheme.id === 'teal'
                          ? '#14B8A6'
                          : currentTheme.id === 'indigo'
                          ? '#6366F1'
                          : currentTheme.id === 'red'
                          ? '#EF4444'
                          : currentTheme.id === 'yellow'
                          ? '#EAB308'
                          : '#8B5CF6'
                      }
                    />
                    <stop
                      offset="100%"
                      stopColor={
                        currentTheme.id === 'blue'
                          ? '#1E40AF'
                          : currentTheme.id === 'green'
                          ? '#059669'
                          : currentTheme.id === 'purple'
                          ? '#7C3AED'
                          : currentTheme.id === 'orange'
                          ? '#EA580C'
                          : currentTheme.id === 'pink'
                          ? '#DB2777'
                          : currentTheme.id === 'teal'
                          ? '#0F766E'
                          : currentTheme.id === 'indigo'
                          ? '#4F46E5'
                          : currentTheme.id === 'red'
                          ? '#DC2626'
                          : currentTheme.id === 'yellow'
                          ? '#D97706'
                          : '#7C3AED'
                      }
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1
              className={`text-lg font-bold ${currentTheme.gradient.replace(
                'bg-gradient-to-r',
                'bg-gradient-to-r'
              )} bg-clip-text text-transparent`}
            >
              Social Manager
            </h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-white/50'
          }`}
        >
          {isCollapsed ? (
            <Menu className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? 'default' : 'ghost'}
            className={`w-full ${
              isCollapsed ? 'px-2' : 'justify-start'
            } transition-all duration-200 ${
              activeTab === item.id
                ? `${currentTheme.gradient} text-white shadow-lg`
                : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-white/50'}`
            }`}
            onClick={() => setActiveTab(item.id)}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className={`w-4 h-4 ${isCollapsed ? '' : 'mr-2'}`} />
            {!isCollapsed && item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}
