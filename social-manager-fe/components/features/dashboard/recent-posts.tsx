'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';
import { useTheme } from '@/lib/contexts/theme-context';
import { SocialPlatformIcons } from '@/components/common/icons/social-platform-icons';

export function RecentPosts() {
  const { isDarkMode, t } = useTheme();

  const mockPosts = [
    {
      id: '1',
      content: 'Chào mừng đến với sản phẩm mới của chúng tôi! 🎉',
      platforms: ['facebook', 'instagram'],
      status: 'published',
    },
    {
      id: '2',
      content: 'Đang chuẩn bị cho sự kiện lớn tuần tới...',
      platforms: ['twitter', 'linkedin'],
      status: 'scheduled',
    },
    {
      id: '3',
      content: 'Tips marketing hiệu quả cho doanh nghiệp nhỏ',
      platforms: ['linkedin'],
      status: 'draft',
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
          <BarChart3 className="w-5 h-5 text-green-600" />
          <span>{t('recent-posts')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className={`flex items-center justify-between p-4 ${
                isDarkMode
                  ? 'bg-gray-700'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100'
              } rounded-xl border ${
                isDarkMode ? 'border-gray-600' : 'border-gray-200'
              }`}
            >
              <div className="flex-1">
                <p
                  className={`text-sm font-medium truncate ${
                    isDarkMode ? 'text-white' : ''
                  }`}
                >
                  {post.content}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {post.platforms.map((platform) => (
                    <SocialPlatformIcons
                      key={platform}
                      platform={platform}
                      className="w-4 h-4"
                    />
                  ))}
                  <Badge
                    variant={
                      post.status === 'published' ? 'default' : 'secondary'
                    }
                    className={
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'scheduled'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {post.status === 'published'
                      ? t('published')
                      : post.status === 'scheduled'
                      ? t('scheduled')
                      : t('draft')}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
