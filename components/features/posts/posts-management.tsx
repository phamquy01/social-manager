'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useTheme } from '@/lib/contexts/theme-context';
import { useTranslations } from 'next-intl';
import { SocialPlatformIcons } from '@/components/common/icons/social-platform-icons';

export function PostsManagement() {
  const { isDarkMode, currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const t = useTranslations();
  const platforms = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'twitter', name: 'Twitter X' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'tiktok', name: 'TikTok' },
  ];

  const mockPosts = [
    {
      id: '1',
      content: 'Chào mừng đến với sản phẩm mới của chúng tôi! 🎉',
      platforms: ['facebook', 'instagram'],
      status: 'published',
      createdAt: new Date('2024-01-15'),
      engagement: { likes: 45, comments: 12, shares: 8 },
    },
    {
      id: '2',
      content: 'Đang chuẩn bị cho sự kiện lớn tuần tới...',
      platforms: ['twitter', 'linkedin'],
      status: 'scheduled',
      createdAt: new Date('2024-01-14'),
    },
    {
      id: '3',
      content: 'Tips marketing hiệu quả cho doanh nghiệp nhỏ',
      platforms: ['linkedin'],
      status: 'draft',
      createdAt: new Date('2024-01-13'),
    },
  ];

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = post.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPlatform =
      filterPlatform === 'all' || post.platforms.includes(filterPlatform);
    return matchesSearch && matchesPlatform;
  });

  const handleDeletePost = (postId: string) => {
    console.log('Deleting post:', postId);
  };

  const handleEditPost = (postId: string) => {
    console.log('Editing post:', postId);
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
              placeholder={t('search-posts')}
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
          <Button
            variant="outline"
            size="sm"
            className={`${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                : 'bg-white/50 border-white/20 hover:bg-white'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            {t('filter')}
          </Button>
        </div>
        <Button
          className={`${currentTheme.gradient} ${currentTheme.hover} shadow-lg`}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('create-new-post')}
        </Button>
      </div>

      <Card
        className={`${
          isDarkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white/80 backdrop-blur-sm border-white/20'
        } shadow-xl`}
      >
        <Table>
          <TableHeader>
            <TableRow className={isDarkMode ? 'border-gray-700' : ''}>
              <TableHead className={isDarkMode ? 'text-gray-300' : ''}>
                {t('content')}
              </TableHead>
              <TableHead className={isDarkMode ? 'text-gray-300' : ''}>
                {t('platform')}
              </TableHead>
              <TableHead className={isDarkMode ? 'text-gray-300' : ''}>
                {t('status')}
              </TableHead>
              <TableHead className={isDarkMode ? 'text-gray-300' : ''}>
                {t('created-date')}
              </TableHead>
              <TableHead className={isDarkMode ? 'text-gray-300' : ''}>
                {t('interactions')}
              </TableHead>
              <TableHead className={isDarkMode ? 'text-gray-300' : ''}>
                {t('actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow
                key={post.id}
                className={`${
                  isDarkMode
                    ? 'border-gray-700 hover:bg-gray-700'
                    : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                }`}
              >
                <TableCell className="max-w-xs">
                  <p
                    className={`truncate font-medium ${
                      isDarkMode ? 'text-white' : ''
                    }`}
                  >
                    {post.content}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {post.platforms.map((platform) => (
                      <div
                        key={platform}
                        className={`w-8 h-8 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                        } rounded-lg flex items-center justify-center`}
                      >
                        <SocialPlatformIcons
                          platform={platform}
                          className="w-4 h-4"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      post.status === 'published'
                        ? 'default'
                        : post.status === 'scheduled'
                        ? 'secondary'
                        : 'outline'
                    }
                    className={
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'scheduled'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {post.status === 'published' && t('published')}
                    {post.status === 'scheduled' && t('scheduled')}
                    {post.status === 'draft' && t('draft')}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {post.createdAt.toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell>
                  {post.engagement && (
                    <div
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <span>{post.engagement.likes} thích, </span>
                      <span>{post.engagement.comments} bình luận</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${
                        isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-blue-50'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${
                        isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-green-50'
                      }`}
                      onClick={() => handleEditPost(post.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${
                        isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-red-50'
                      }`}
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
