'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/lib/contexts/theme-context';
import { BarChart3, Clock, MessageSquare, Users } from 'lucide-react';
import { textColorMap, bgLightColorMap, iconDarkColorMap } from '@/lib/colors';
import { useTranslations } from 'next-intl';

export function DashboardStats() {
  const { isDarkMode } = useTheme();
  const t = useTranslations();

  const stats = [
    {
      title: t('total-posts'),
      value: '124',
      change: '+12% so với tháng trước',
      icon: BarChart3,
      color: 'blue',
    },
    {
      title: t('scheduled'),
      value: '8',
      change: 'Tuần này',
      icon: Clock,
      color: 'orange',
    },
    {
      title: t('interactions'),
      value: '2.4K',
      change: '+18% so với tuần trước',
      icon: MessageSquare,
      color: 'green',
    },
    {
      title: t('accounts'),
      value: '5',
      change: 'Tất cả đã kết nối',
      icon: Users,
      color: 'purple',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border border-gray-200'
          } shadow-lg`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-sm font-medium`}
                >
                  {stat.title}
                </p>
                <p
                  className={`text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {stat.value}
                </p>
                <p className={`${textColorMap[stat.color]} text-xs mt-1`}>
                  {stat.change}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : bgLightColorMap[stat.color]
                }`}
              >
                <stat.icon
                  className={`w-6 h-6 ${
                    isDarkMode
                      ? iconDarkColorMap[stat.color]
                      : textColorMap[stat.color]
                  }`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
