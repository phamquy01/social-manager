'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  Send,
  BarChart3,
  MessageSquare,
  Users,
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Calendar,
  EyeOff,
  Reply,
  Moon,
  Sun,
  Palette,
} from 'lucide-react';
import { PostPreview } from './post-preview';
import { ScheduleModal } from './schedule-modal';
import { AccountSelector } from './account-selector';
import { FileUpload } from './file-upload';
import { SocialPlatformIcons } from './social-platform-icons';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmojiPicker } from './emoji-picker';
import { AIWritingAssistant } from './ai-writing-assistant';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CollapsibleSidebar } from './collapsible-sidebar';
import { useTheme } from '@/lib/contexts/theme-context';

interface Post {
  id: string;
  content: string;
  images?: File[];
  video?: File;
  platforms: string[];
  accounts: { [platform: string]: string[] };
  scheduledTime?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  createdAt: Date;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface Comment {
  id: string;
  platform: string;
  account: string;
  postId: string;
  author: string;
  content: string;
  timestamp: Date;
  replied: boolean;
}

interface Account {
  id: string;
  platform: string;
  name: string;
  username: string;
  connected: boolean;
  followers: number;
  lastSync: Date;
}

export function SocialMediaDashboard() {
  const {
    isDarkMode,
    toggleDarkMode,
    currentTheme,
    setTheme,
    themes,
    language,
    setLanguage,
    t,
  } = useTheme();
  const [activeTab, setActiveTab] = useState('create');
  const [postContent, setPostContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<{
    [platform: string]: string[];
  }>({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [previewPlatform, setPreviewPlatform] = useState('facebook');
  const [uploadedFiles, setUploadedFiles] = useState<{
    images?: File[];
    video?: File;
  }>({});
  const [showPreview, setShowPreview] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      color: 'bg-pink-600',
      hoverColor: 'hover:bg-pink-600',
    },
    {
      id: 'twitter',
      name: 'Twitter X',
      color: 'bg-gray-900',
      hoverColor: 'hover:bg-gray-900',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      color: 'bg-blue-700',
      hoverColor: 'hover:bg-blue-700',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      color: 'bg-black',
      hoverColor: 'hover:bg-black',
    },
  ];

  const accounts = {
    facebook: ['Tài khoản cá nhân', 'Fanpage Business', 'Fanpage Shop'],
    instagram: ['@myaccount', '@business_account', '@shop_account'],
    twitter: ['@personal', '@company'],
    linkedin: ['Hồ sơ cá nhân', 'Trang công ty'],
    tiktok: ['@mytiktok', '@business_tiktok'],
  };

  // Mock data
  const mockPosts: Post[] = [
    {
      id: '1',
      content: 'Chào mừng đến với sản phẩm mới của chúng tôi! 🎉',
      platforms: ['facebook', 'instagram'],
      accounts: {
        facebook: ['Fanpage Business'],
        instagram: ['@business_account'],
      },
      status: 'published',
      createdAt: new Date('2024-01-15'),
      engagement: { likes: 45, comments: 12, shares: 8 },
    },
    {
      id: '2',
      content: 'Đang chuẩn bị cho sự kiện lớn tuần tới...',
      platforms: ['twitter', 'linkedin'],
      accounts: { twitter: ['@company'], linkedin: ['Trang công ty'] },
      status: 'scheduled',
      createdAt: new Date('2024-01-14'),
      scheduledTime: new Date('2024-01-20'),
    },
    {
      id: '3',
      content: 'Tips marketing hiệu quả cho doanh nghiệp nhỏ',
      platforms: ['linkedin'],
      accounts: { linkedin: ['Trang công ty'] },
      status: 'draft',
      createdAt: new Date('2024-01-13'),
    },
  ];

  const mockComments: Comment[] = [
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

  const mockAccounts: Account[] = [
    {
      id: '1',
      platform: 'facebook',
      name: 'Fanpage Business',
      username: 'business.page',
      connected: true,
      followers: 12500,
      lastSync: new Date('2024-01-15T09:00:00'),
    },
    {
      id: '2',
      platform: 'instagram',
      name: 'Business Account',
      username: '@business_account',
      connected: true,
      followers: 8900,
      lastSync: new Date('2024-01-15T09:05:00'),
    },
    {
      id: '3',
      platform: 'twitter',
      name: 'Company Twitter',
      username: '@company',
      connected: false,
      followers: 5600,
      lastSync: new Date('2024-01-10T15:30:00'),
    },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((p) => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleAccountSelect = (platform: string, accounts: string[]) => {
    setSelectedAccounts((prev) => ({
      ...prev,
      [platform]: accounts,
    }));
  };

  const handleFileUpload = (files: { images?: File[]; video?: File }) => {
    setUploadedFiles(files);
    // Không tự động chọn TikTok nữa
  };

  const getAvailablePlatforms = () => {
    if (uploadedFiles.video) {
      return platforms;
    } else {
      return platforms.filter((p) => p.id !== 'tiktok');
    }
  };

  const hasContent =
    (postContent.trim() ||
      uploadedFiles.images?.length ||
      uploadedFiles.video) &&
    selectedPlatforms.length > 0;

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = post.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPlatform =
      filterPlatform === 'all' || post.platforms.includes(filterPlatform);
    return matchesSearch && matchesPlatform;
  });

  const filteredComments = mockComments.filter((comment) => {
    const matchesSearch = comment.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPlatform =
      filterPlatform === 'all' || comment.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  const handleDeletePost = (postId: string) => {
    // Logic to delete post
    console.log('Deleting post:', postId);
  };

  const handleEditPost = (postId: string) => {
    // Logic to edit post
    console.log('Editing post:', postId);
  };

  const handleReplyToComment = (commentId: string) => {
    if (replyingTo === commentId) {
      // Submit reply
      console.log('Replying to comment:', commentId, 'with:', replyContent);
      setReplyingTo(null);
      setReplyContent('');
    } else {
      setReplyingTo(commentId);
      setReplyContent('');
    }
  };

  const handleConnectAccount = (platform: string) => {
    // Logic to connect account
    console.log('Connecting account for platform:', platform);
  };

  const handleDisconnectAccount = (accountId: string) => {
    // Logic to disconnect account
    console.log('Disconnecting account:', accountId);
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode
          ? 'dark bg-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
    >
      {/* Sidebar */}
      <CollapsibleSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
                {mockAccounts.filter((a) => a.connected).length} tài khoản
              </Badge>
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  className={`${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white/50 border-white/20'
                  } shadow-md`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Nguyễn Văn A
                </Button>
              ) : (
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className={`${currentTheme.gradient} ${currentTheme.hover} shadow-lg`}
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'create' && (
            <div
              className={`grid gap-6 ${
                hasContent ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {/* Post Creation Form */}
              <Card
                className={`${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white/80 backdrop-blur-sm border-white/20'
                } shadow-xl`}
              >
                <CardHeader
                  className={`${
                    isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-gradient-to-r from-blue-50 to-purple-50'
                  }`}
                >
                  <CardTitle className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 ${currentTheme.gradient} rounded-lg flex items-center justify-center`}
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                    <span className={isDarkMode ? 'text-white' : ''}>
                      {t('create-new-post')}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div>
                    <Label
                      htmlFor="content"
                      className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {t('post-content')}
                    </Label>
                    <div className="mt-2 relative">
                      <Textarea
                        id="content"
                        placeholder={t('post-content')}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className={`min-h-32 ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border border-gray-200'
                        } shadow-sm focus:shadow-md ${
                          isDarkMode
                            ? 'focus:border-blue-400'
                            : 'focus:border-blue-300'
                        } transition-all duration-200`}
                      />
                      <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                        <EmojiPicker
                          onEmojiSelect={(emoji) =>
                            setPostContent((prev) => prev + emoji)
                          }
                        />
                        <AIWritingAssistant
                          onContentGenerate={(content) =>
                            setPostContent(content)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <FileUpload onFileUpload={handleFileUpload} />

                  <div>
                    <Label
                      className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {t('select-platforms')}
                    </Label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {getAvailablePlatforms().map((platform) => (
                        <Button
                          key={platform.id}
                          variant={
                            selectedPlatforms.includes(platform.id)
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => handlePlatformToggle(platform.id)}
                          className={`justify-start transition-all duration-200 shadow-md ${
                            selectedPlatforms.includes(platform.id)
                              ? `${platform.color} text-white shadow-lg relative overflow-hidden`
                              : `${
                                  isDarkMode
                                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                                    : 'bg-white/50 hover:bg-white border-white/20'
                                } shadow-sm hover:shadow-md`
                          }`}
                          style={
                            selectedPlatforms.includes(platform.id)
                              ? {
                                  background:
                                    platform.id === 'facebook'
                                      ? 'linear-gradient(135deg, #1877F2, #42A5F5)'
                                      : platform.id === 'instagram'
                                      ? 'linear-gradient(135deg, #E4405F, #F77737, #FCAF45)'
                                      : platform.id === 'twitter'
                                      ? 'linear-gradient(135deg, #000000, #1DA1F2)'
                                      : platform.id === 'linkedin'
                                      ? 'linear-gradient(135deg, #0077B5, #00A0DC)'
                                      : platform.id === 'tiktok'
                                      ? 'linear-gradient(135deg, #000000, #FF0050)'
                                      : undefined,
                                }
                              : undefined
                          }
                        >
                          <SocialPlatformIcons
                            platform={platform.id}
                            className={`w-4 h-4 mr-2 ${
                              selectedPlatforms.includes(platform.id)
                                ? 'text-white drop-shadow-sm'
                                : ''
                            }`}
                          />
                          <span
                            className={
                              selectedPlatforms.includes(platform.id)
                                ? 'text-white font-medium drop-shadow-sm'
                                : ''
                            }
                          >
                            {platform.name}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedPlatforms.length > 0 && (
                    <div>
                      <Label
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {t('select-accounts')}
                      </Label>
                      <div className="space-y-3 mt-3">
                        {selectedPlatforms.map((platformId) => {
                          const platform = platforms.find(
                            (p) => p.id === platformId
                          );
                          return (
                            <AccountSelector
                              key={platformId}
                              platform={platform!}
                              accounts={
                                accounts[platformId as keyof typeof accounts]
                              }
                              selectedAccounts={
                                selectedAccounts[platformId] || []
                              }
                              onAccountSelect={(accounts) =>
                                handleAccountSelect(platformId, accounts)
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <Separator
                    className={`${
                      isDarkMode
                        ? 'bg-gray-600'
                        : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent'
                    }`}
                  />

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className={`flex-1 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                          : 'bg-white/50 border-white/20 hover:bg-white'
                      } shadow-md hover:shadow-lg transition-all duration-200`}
                      onClick={() => setShowScheduleModal(true)}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {t('schedule')}
                    </Button>
                    <Button
                      className={`flex-1 ${currentTheme.gradient} ${currentTheme.hover} shadow-lg hover:shadow-xl transition-all duration-200`}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t('post-now')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              {hasContent && (
                <Card
                  className={`${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white/80 backdrop-blur-sm border-white/20'
                  } shadow-xl`}
                >
                  <CardHeader
                    className={`${
                      isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-gradient-to-r from-purple-50 to-pink-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <div
                          className={`w-8 h-8 ${currentTheme.gradient} rounded-lg flex items-center justify-center`}
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                        <span className={isDarkMode ? 'text-white' : ''}>
                          {t('preview')}
                        </span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPreview(!showPreview)}
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-300 hover:text-white' : ''
                          } shadow-sm hover:shadow-md transition-all duration-200`}
                        >
                          {showPreview ? (
                            <EyeOff className="w-4 h-4 mr-1" />
                          ) : (
                            <Eye className="w-4 h-4 mr-1" />
                          )}
                          {showPreview ? t('hide') : t('show')} preview
                        </Button>
                        <Select
                          value={previewPlatform}
                          onValueChange={setPreviewPlatform}
                        >
                          <SelectTrigger
                            className={`w-32 ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600'
                                : 'bg-white/50 border-white/20'
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedPlatforms.map((platformId) => {
                              const platform = platforms.find(
                                (p) => p.id === platformId
                              );
                              return (
                                <SelectItem key={platformId} value={platformId}>
                                  {platform?.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  {showPreview && (
                    <CardContent className="p-6">
                      {selectedPlatforms.includes(previewPlatform) ? (
                        <PostPreview
                          platform={previewPlatform}
                          content={postContent}
                          account={selectedAccounts[previewPlatform]?.[0] || ''}
                          images={uploadedFiles.images}
                          video={uploadedFiles.video}
                        />
                      ) : (
                        <div
                          className={`text-center py-8 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          <p>{t('select-platforms')}</p>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              )}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card
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
                          {t('total-posts')}
                        </p>
                        <p
                          className={`text-3xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          124
                        </p>
                        <p className="text-green-600 text-xs mt-1">
                          +12% so với tháng trước
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
                        } rounded-xl flex items-center justify-center`}
                      >
                        <BarChart3
                          className={`w-6 h-6 ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
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
                          {t('scheduled')}
                        </p>
                        <p
                          className={`text-3xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          8
                        </p>
                        <p className="text-orange-600 text-xs mt-1">Tuần này</p>
                      </div>
                      <div
                        className={`w-12 h-12 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-orange-100'
                        } rounded-xl flex items-center justify-center`}
                      >
                        <Clock
                          className={`w-6 h-6 ${
                            isDarkMode ? 'text-orange-400' : 'text-orange-600'
                          }`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
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
                          {t('interactions')}
                        </p>
                        <p
                          className={`text-3xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          2.4K
                        </p>
                        <p className="text-green-600 text-xs mt-1">
                          +18% so với tuần trước
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-green-100'
                        } rounded-xl flex items-center justify-center`}
                      >
                        <MessageSquare
                          className={`w-6 h-6 ${
                            isDarkMode ? 'text-green-400' : 'text-green-600'
                          }`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
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
                          {t('accounts')}
                        </p>
                        <p
                          className={`text-3xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          5
                        </p>
                        <p className="text-purple-600 text-xs mt-1">
                          Tất cả đã kết nối
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-purple-100'
                        } rounded-xl flex items-center justify-center`}
                      >
                        <Users
                          className={`w-6 h-6 ${
                            isDarkMode ? 'text-purple-400' : 'text-purple-600'
                          }`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Posts and Upcoming Schedule */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      {mockPosts.slice(0, 3).map((post) => (
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
                                  post.status === 'published'
                                    ? 'default'
                                    : 'secondary'
                                }
                                className={
                                  post.status === 'published'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-orange-100 text-orange-800'
                                }
                              >
                                {post.status === 'published'
                                  ? t('published')
                                  : t('scheduled')}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

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
                      <div
                        className={`flex items-center space-x-3 p-3 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                        } rounded-lg`}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : ''
                            }`}
                          >
                            Bài viết về sản phẩm mới
                          </p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            Hôm nay, 14:30
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center space-x-3 p-3 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
                        } rounded-lg`}
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : ''
                            }`}
                          >
                            Story Instagram
                          </p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            Ngày mai, 09:00
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center space-x-3 p-3 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-green-50'
                        } rounded-lg`}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : ''
                            }`}
                          >
                            Video TikTok
                          </p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            Thứ 3, 19:00
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
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
                  <Select
                    value={filterPlatform}
                    onValueChange={setFilterPlatform}
                  >
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
                                : post.status === 'failed'
                                ? 'destructive'
                                : 'outline'
                            }
                            className={
                              post.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : post.status === 'scheduled'
                                ? 'bg-orange-100 text-orange-800'
                                : post.status === 'draft'
                                ? 'bg-gray-100 text-gray-800'
                                : ''
                            }
                          >
                            {post.status === 'published' && t('published')}
                            {post.status === 'scheduled' && t('scheduled')}
                            {post.status === 'draft' && t('draft')}
                            {post.status === 'failed' && t('failed')}
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
                                isDarkMode
                                  ? 'hover:bg-gray-600'
                                  : 'hover:bg-blue-50'
                              }`}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`${
                                isDarkMode
                                  ? 'hover:bg-gray-600'
                                  : 'hover:bg-green-50'
                              }`}
                              onClick={() => handleEditPost(post.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`${
                                isDarkMode
                                  ? 'hover:bg-gray-600'
                                  : 'hover:bg-red-50'
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
          )}

          {activeTab === 'comments' && (
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
                  <Select
                    value={filterPlatform}
                    onValueChange={setFilterPlatform}
                  >
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
                                  isDarkMode
                                    ? 'hover:bg-gray-700'
                                    : 'hover:bg-gray-100'
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
                                  onChange={(e) =>
                                    setReplyContent(e.target.value)
                                  }
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
                              <span className="text-sm">
                                {t('not-replied-status')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3
                  className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {t('connected-accounts')}
                </h3>
                <Button
                  className={`${currentTheme.gradient} ${currentTheme.hover} shadow-lg`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('connect-new-account')}
                </Button>
              </div>

              <div className="grid gap-6">
                {mockAccounts.map((account) => (
                  <Card
                    key={account.id}
                    className={`${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white/80 backdrop-blur-sm border-white/20'
                    } shadow-lg hover:shadow-xl transition-all duration-200`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-16 h-16 ${currentTheme.gradient} rounded-2xl flex items-center justify-center`}
                          >
                            <SocialPlatformIcons
                              platform={account.platform}
                              className="w-8 h-8 text-white"
                            />
                          </div>
                          <div>
                            <h4
                              className={`font-semibold text-lg ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                              }`}
                            >
                              {account.name}
                            </h4>
                            <p
                              className={`${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}
                            >
                              {account.username}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span
                                className={`text-sm ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                {account.followers.toLocaleString()} người theo
                                dõi
                              </span>
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    account.connected
                                      ? 'bg-green-500'
                                      : 'bg-red-500'
                                  }`}
                                />
                                <span
                                  className={`text-sm ${
                                    isDarkMode
                                      ? 'text-gray-300'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  {account.connected
                                    ? t('connected')
                                    : t('disconnected')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {t('last-sync')}
                            </p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? 'text-gray-500' : 'text-gray-400'
                              }`}
                            >
                              {account.lastSync.toLocaleString('vi-VN')}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                                : 'bg-white/50 border-white/20 hover:bg-white'
                            }`}
                            onClick={() =>
                              account.connected
                                ? handleDisconnectAccount(account.id)
                                : handleConnectAccount(account.platform)
                            }
                          >
                            {account.connected ? 'Ngắt kết nối' : 'Kết nối lại'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Tabs defaultValue="general" className="w-full">
                <TabsList
                  className={`grid w-full grid-cols-4 ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white/50 border-white/20'
                  }`}
                >
                  <TabsTrigger
                    value="general"
                    className={
                      isDarkMode ? 'data-[state=active]:bg-gray-700' : ''
                    }
                  >
                    {t('general-settings').split(' ')[0]}
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className={
                      isDarkMode ? 'data-[state=active]:bg-gray-700' : ''
                    }
                  >
                    {t('notification-settings').split(' ')[0]}
                  </TabsTrigger>
                  <TabsTrigger
                    value="posting"
                    className={
                      isDarkMode ? 'data-[state=active]:bg-gray-700' : ''
                    }
                  >
                    {t('posting-settings').split(' ')[0]}
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className={
                      isDarkMode ? 'data-[state=active]:bg-gray-700' : ''
                    }
                  >
                    {t('account-settings').split(' ')[0]}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <Card
                    className={`${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white/80 backdrop-blur-sm border-white/20'
                    } shadow-xl`}
                  >
                    <CardHeader>
                      <CardTitle className={isDarkMode ? 'text-white' : ''}>
                        {t('general-settings')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div
                        className={`flex items-center justify-between p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-gray-50 to-gray-100'
                        } rounded-xl`}
                      >
                        <div className="flex items-center space-x-3">
                          {isDarkMode ? (
                            <Moon className="w-5 h-5" />
                          ) : (
                            <Sun className="w-5 h-5" />
                          )}
                          <div>
                            <Label
                              className={`font-medium ${
                                isDarkMode ? 'text-white' : ''
                              }`}
                            >
                              {t('dark-mode')}
                            </Label>
                            <p
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {t('dark-mode-desc')}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={isDarkMode}
                          onCheckedChange={toggleDarkMode}
                        />
                      </div>

                      <div
                        className={`flex items-center justify-between p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-gray-50 to-gray-100'
                        } rounded-xl`}
                      >
                        <div>
                          <Label
                            className={`font-medium ${
                              isDarkMode ? 'text-white' : ''
                            }`}
                          >
                            {t('language')}
                          </Label>
                          <p
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {t('language-desc')}
                          </p>
                        </div>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger
                            className={`w-32 ${
                              isDarkMode
                                ? 'bg-gray-600 border-gray-500'
                                : 'bg-white border-white/20'
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vi">Tiếng Việt</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div
                        className={`p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-gray-50 to-gray-100'
                        } rounded-xl`}
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <Palette className="w-5 h-5" />
                          <div>
                            <Label
                              className={`font-medium ${
                                isDarkMode ? 'text-white' : ''
                              }`}
                            >
                              {t('theme-color')}
                            </Label>
                            <p
                              className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {t('theme-color-desc')}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                          {themes.map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => setTheme(theme)}
                              className={`w-12 h-12 rounded-xl ${
                                theme.gradient
                              } flex items-center justify-center transition-all duration-200 ${
                                currentTheme.id === theme.id
                                  ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                                  : 'hover:scale-105'
                              }`}
                              title={theme.name}
                            >
                              {currentTheme.id === theme.id && (
                                <CheckCircle className="w-6 h-6 text-white" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <Card
                    className={`${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white/80 backdrop-blur-sm border-white/20'
                    } shadow-xl`}
                  >
                    <CardHeader>
                      <CardTitle className={isDarkMode ? 'text-white' : ''}>
                        {t('notification-settings')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div
                        className={`flex items-center justify-between p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-blue-50 to-purple-50'
                        } rounded-xl`}
                      >
                        <div>
                          <Label
                            className={`font-medium ${
                              isDarkMode ? 'text-white' : ''
                            }`}
                          >
                            {t('email-notifications')}
                          </Label>
                          <p
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {t('email-notifications-desc')}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div
                        className={`flex items-center justify-between p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-green-50 to-blue-50'
                        } rounded-xl`}
                      >
                        <div>
                          <Label
                            className={`font-medium ${
                              isDarkMode ? 'text-white' : ''
                            }`}
                          >
                            {t('comment-notifications')}
                          </Label>
                          <p
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {t('comment-notifications-desc')}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div
                        className={`flex items-center justify-between p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-purple-50 to-pink-50'
                        } rounded-xl`}
                      >
                        <div>
                          <Label
                            className={`font-medium ${
                              isDarkMode ? 'text-white' : ''
                            }`}
                          >
                            {t('weekly-reports')}
                          </Label>
                          <p
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {t('weekly-reports-desc')}
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="posting" className="space-y-4">
                  <Card
                    className={`${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white/80 backdrop-blur-sm border-white/20'
                    } shadow-xl`}
                  >
                    <CardHeader>
                      <CardTitle className={isDarkMode ? 'text-white' : ''}>
                        {t('posting-settings')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div
                        className={`p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-orange-50 to-yellow-50'
                        } rounded-xl`}
                      >
                        <Label
                          className={`font-medium ${
                            isDarkMode ? 'text-white' : ''
                          }`}
                        >
                          {t('default-timezone')}
                        </Label>
                        <Select defaultValue="Asia/Ho_Chi_Minh">
                          <SelectTrigger
                            className={`mt-2 ${
                              isDarkMode
                                ? 'bg-gray-600 border-gray-500'
                                : 'bg-white border-white/20'
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Ho_Chi_Minh">
                              Việt Nam (GMT+7)
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              New York (GMT-5)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              London (GMT+0)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div
                        className={`flex items-center justify-between p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-green-50 to-teal-50'
                        } rounded-xl`}
                      >
                        <div>
                          <Label
                            className={`font-medium ${
                              isDarkMode ? 'text-white' : ''
                            }`}
                          >
                            {t('auto-save-drafts')}
                          </Label>
                          <p
                            className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {t('auto-save-drafts-desc')}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-4">
                  <Card
                    className={`${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white/80 backdrop-blur-sm border-white/20'
                    } shadow-xl`}
                  >
                    <CardHeader>
                      <CardTitle className={isDarkMode ? 'text-white' : ''}>
                        {t('account-settings')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div
                        className={`p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                        } rounded-xl`}
                      >
                        <Label
                          htmlFor="name"
                          className={`font-medium ${
                            isDarkMode ? 'text-white' : ''
                          }`}
                        >
                          {t('display-name')}
                        </Label>
                        <Input
                          id="name"
                          defaultValue="Nguyễn Văn A"
                          className={`mt-2 ${
                            isDarkMode
                              ? 'bg-gray-600 border-gray-500'
                              : 'bg-white border-white/20'
                          }`}
                        />
                      </div>
                      <div
                        className={`p-4 ${
                          isDarkMode
                            ? 'bg-gray-700'
                            : 'bg-gradient-to-r from-purple-50 to-pink-50'
                        } rounded-xl`}
                      >
                        <Label
                          htmlFor="email"
                          className={`font-medium ${
                            isDarkMode ? 'text-white' : ''
                          }`}
                        >
                          {t('email')}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="user@example.com"
                          className={`mt-2 ${
                            isDarkMode
                              ? 'bg-gray-600 border-gray-500'
                              : 'bg-white border-white/20'
                          }`}
                        />
                      </div>
                      <Button
                        className={`${currentTheme.gradient} ${currentTheme.hover} shadow-lg`}
                      >
                        {t('update-info')}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>

      <ScheduleModal
        open={showScheduleModal}
        onOpenChange={setShowScheduleModal}
      />
    </div>
  );
}
