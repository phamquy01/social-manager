'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { useTheme } from '@/lib/contexts/theme-context';
import { bgColorMap, dotColorMap } from '@/lib/colors';

export function UpcomingSchedule() {
  const { isDarkMode, t } = useTheme();

  const scheduleItems = [
    {
      title: 'Bài viết về sản phẩm mới',
      time: 'Hôm nay, 14:30',
      color: 'blue',
    },
    {
      title: 'Story Instagram',
      time: 'Ngày mai, 09:00',
      color: 'purple',
    },
    {
      title: 'Video TikTok',
      time: 'Thứ 3, 19:00',
      color: 'green',
    },
  ];

  return (
    <Card
      className={`${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white/80 backdrop-blur-sm border-white/20'
      } shadow-xl`}
    >
      <CardHeader>
        <CardTitle
          className={`flex items-center space-x-2 ${
            isDarkMode ? 'text-white' : ''
          }`}
        >
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>{t('upcoming-schedule')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduleItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 ${
                isDarkMode ? 'bg-gray-700' : bgColorMap[item.color]
              } rounded-lg`}
            >
              <div
                className={`w-2 h-2 ${dotColorMap[item.color]} rounded-full`}
              ></div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : ''
                  }`}
                >
                  {item.title}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
