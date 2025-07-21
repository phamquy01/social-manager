'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Clock, Send, Plus, Eye, EyeOff } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/lib/contexts/theme-context';
import { SocialPlatformIcons } from '@/components/common/icons/social-platform-icons';
import { EmojiPicker } from '@/components/common/emoji-picker';
import { AIWritingAssistant } from '@/components/common/ai-writing-assistant';
import { FileUpload } from '@/components/common/file-upload';
import { AccountSelector } from '@/components/common/account-selector';
import { PostPreview } from '@/components/common/post-preview';
import { ScheduleModal } from '@/components/common/schedule-modal';

export function PostCreationForm() {
  const { isDarkMode, currentTheme, t } = useTheme();
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

  return (
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
                  isDarkMode ? 'focus:border-blue-400' : 'focus:border-blue-300'
                } transition-all duration-200`}
              />
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <EmojiPicker
                  onEmojiSelect={(emoji) =>
                    setPostContent((prev) => prev + emoji)
                  }
                />
                <AIWritingAssistant
                  onContentGenerate={(content) => setPostContent(content)}
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
                  const platform = platforms.find((p) => p.id === platformId);
                  return (
                    <AccountSelector
                      key={platformId}
                      platform={platform!}
                      accounts={accounts[platformId as keyof typeof accounts]}
                      selectedAccounts={selectedAccounts[platformId] || []}
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

      <ScheduleModal
        open={showScheduleModal}
        onOpenChange={setShowScheduleModal}
      />
    </div>
  );
}
