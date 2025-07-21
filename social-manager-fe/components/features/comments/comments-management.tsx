'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Reply,
  MoreHorizontal,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useTheme } from '@/lib/contexts/theme-context';
import { useTranslations } from 'next-intl';
import { SocialPlatformIcons } from '@/components/common/icons/social-platform-icons';

export function CommentsManagement() {
  const { isDarkMode, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const t = useTranslations();
  const platforms = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'twitter', name: 'Twitter X' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'tiktok', name: 'TikTok' },
  ];

  const mockComments = [
    {
      id: '1',
      platform: 'facebook',
      account: 'Fanpage Business',
      postId: '1',
      author: 'Nguyễn Văn A',
      content: 'Sản phẩm tuyệt vời! Khi nào có thể mua được?',
      timestamp: new Date('2024-01-15T10:30:00'),
      replied: false,
    },
    {
      id: '2',
      platform: 'instagram',
      account: '@business_account',
      postId: '1',
      author: '@user123',
      content: 'Love this! 😍',
      timestamp: new Date('2024-01-15T11:15:00'),
      replied: true,
    },
    {
      id: '3',
      platform: 'twitter',
      account: '@company',
      postId: '2',
      author: '@follower456',
      content: 'Looking forward to this event!',
      timestamp: new Date('2024-01-16T09:20:00'),
      replied: false,
    },
  ];

  const filteredComments = mockComments.filter((comment) => {
    const matchesSearch = comment.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPlatform =
      filterPlatform === 'all' || comment.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  const handleReplyToComment = (commentId: string) => {
    if (replyingTo === commentId) {
      console.log('Replying to comment:', commentId, 'with:', replyContent);
      setReplyingTo(null);
      setReplyContent('');
    } else {
      setReplyingTo(commentId);
      setReplyContent('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-400'
              } w-4 h-4`}
            />
            <Input
              placeholder={t('search-comments')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 w-64 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white/50 border-white/20 focus:bg-white'
              }`}
            />
          </div>
          <Select value={filterPlatform} onValueChange={setFilterPlatform}>
            <SelectTrigger
              className={`w-40 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white/50 border-white/20'
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all-platforms')}</SelectItem>
              {platforms.map((platform) => (
                <SelectItem key={platform.id} value={platform.id}>
                  {platform.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className={`${
              isDarkMode
                ? 'bg-gray-700 text-red-400 border-red-600'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {filteredComments.filter((c) => !c.replied).length}{' '}
            {t('not-replied')}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredComments.map((comment) => (
          <Card
            key={comment.id}
            className={`${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white/80 backdrop-blur-sm border-white/20'
            } shadow-lg hover:shadow-xl transition-all duration-200`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div
                    className={`w-10 h-10 ${currentTheme.gradient} rounded-full flex items-center justify-center`}
                  >
                    <SocialPlatformIcons
                      platform={comment.platform}
                      className="w-5 h-5 text-white"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        {comment.author}
                      </span>
                      <span
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        trên {comment.account}
                      </span>
                      <span
                        className={`text-xs ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}
                      >
                        {comment.timestamp.toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <p
                      className={`${
                        isDarkMode
                          ? 'text-gray-300 bg-gray-700'
                          : 'text-gray-700 bg-gray-50'
                      } mb-3 p-3 rounded-lg`}
                    >
                      {comment.content}
                    </p>
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        className={`${currentTheme.gradient} ${currentTheme.hover}`}
                        onClick={() => handleReplyToComment(comment.id)}
                      >
                        <Reply className="w-4 h-4 mr-1" />
                        {replyingTo === comment.id ? 'Gửi' : t('reply')}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${
                          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    {replyingTo === comment.id && (
                      <div className="mt-3">
                        <Textarea
                          placeholder="Nhập phản hồi..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className={`${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600'
                              : 'bg-white border-gray-200'
                          } mb-2`}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  {comment.replied ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">{t('replied')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-red-600">
                      <XCircle className="w-5 h-5" />
                      <span className="text-sm">{t('not-replied-status')}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
