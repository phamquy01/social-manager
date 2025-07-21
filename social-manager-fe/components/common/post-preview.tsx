'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  ThumbsUp,
  Send,
  Bookmark,
  Play,
  Globe,
  Lock,
  Users,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface PostPreviewProps {
  platform: string;
  content: string;
  account: string;
  images?: File[];
  video?: File;
}

export function PostPreview({
  platform,
  content,
  account,
  images,
  video,
}: PostPreviewProps) {
  const formatContent = (text: string) => {
    if (!text) return 'Nội dung bài đăng sẽ hiển thị ở đây...';
    return text;
  };

  const getMediaUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  if (platform === 'facebook') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-0">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>FB</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {account || 'Tên tài khoản'}
                </p>
                <p className="text-xs text-gray-500 flex items-center">
                  Vừa xong · <Globe className="w-3 h-3 ml-1" />
                </p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48" align="end">
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Công khai
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Bạn bè
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Chỉ mình tôi
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-sm mb-3">{formatContent(content)}</p>
          </div>

          {/* Media Display */}
          {images && images.length > 0 && (
            <div
              className={`grid gap-1 ${
                images.length === 1
                  ? 'grid-cols-1'
                  : images.length === 2
                  ? 'grid-cols-2'
                  : images.length === 3
                  ? 'grid-cols-2'
                  : 'grid-cols-2'
              }`}
            >
              {images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`relative ${
                    images.length === 3 && index === 0 ? 'col-span-2' : ''
                  } ${images.length > 4 && index === 3 ? 'relative' : ''}`}
                >
                  <img
                    src={getMediaUrl(image) || '/placeholder.svg'}
                    alt={`Preview ${index + 1}`}
                    className={`w-full object-cover ${
                      images.length === 1 ? 'h-64' : 'h-32'
                    }`}
                  />
                  {images.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {video && (
            <div className="relative bg-black rounded-lg overflow-hidden mb-3">
              <video
                src={getMediaUrl(video)}
                className="w-full h-64 object-cover"
                controls
                preload="metadata"
                poster={getMediaUrl(video)}
              />
            </div>
          )}

          <div className="border-t border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>👍❤️😊 15 người khác</span>
              <span>3 bình luận</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-2">
              <Button variant="ghost" size="sm" className="flex-1">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Thích
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-1" />
                Bình luận
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Share className="w-4 h-4 mr-1" />
                Chia sẻ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (platform === 'instagram') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-0">
          <div className="p-3">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>IG</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">{account || 'username'}</p>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Media Display */}
          {images && images.length > 0 && (
            <div
              className={`grid gap-1 ${
                images.length === 1
                  ? 'grid-cols-1'
                  : images.length === 2
                  ? 'grid-cols-2'
                  : images.length === 3
                  ? 'grid-cols-2'
                  : 'grid-cols-2'
              }`}
            >
              {images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`relative ${
                    images.length === 3 && index === 0 ? 'col-span-2' : ''
                  } ${images.length > 4 && index === 3 ? 'relative' : ''}`}
                >
                  <img
                    src={getMediaUrl(image) || '/placeholder.svg'}
                    alt={`Preview ${index + 1}`}
                    className={`w-full object-cover aspect-square ${
                      images.length === 1 ? '' : ''
                    }`}
                  />
                  {images.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {video && (
            <div className="relative bg-black rounded-lg overflow-hidden mb-3 aspect-square">
              <video
                src={getMediaUrl(video)}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster={getMediaUrl(video)}
              />
            </div>
          )}

          {!images && !video && (
            <div className="bg-gray-100 aspect-square flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                Hình ảnh sẽ hiển thị ở đây
              </p>
            </div>
          )}

          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <Heart className="w-6 h-6" />
                <MessageCircle className="w-6 h-6" />
                <Send className="w-6 h-6" />
              </div>
              <Bookmark className="w-6 h-6" />
            </div>
            <p className="font-semibold text-sm mb-1">15 lượt thích</p>
            <p className="text-sm">
              <span className="font-semibold">{account || 'username'}</span>{' '}
              {formatContent(content)}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (platform === 'twitter') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>TW</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-1 mb-1">
                <p className="font-semibold text-sm">Tên hiển thị</p>
                <p className="text-gray-500 text-sm">
                  {account || '@username'}
                </p>
                <p className="text-gray-500 text-sm">· 1m</p>
              </div>
              <p className="text-sm mb-3">{formatContent(content)}</p>

              {/* Media Display */}
              {images && images.length > 0 && (
                <div
                  className={`grid gap-1 ${
                    images.length === 1
                      ? 'grid-cols-1'
                      : images.length === 2
                      ? 'grid-cols-2'
                      : images.length === 3
                      ? 'grid-cols-2'
                      : 'grid-cols-2'
                  } mb-3 rounded-2xl overflow-hidden`}
                >
                  {images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={`relative ${
                        images.length === 3 && index === 0 ? 'col-span-2' : ''
                      } ${images.length > 4 && index === 3 ? 'relative' : ''}`}
                    >
                      <img
                        src={getMediaUrl(image) || '/placeholder.svg'}
                        alt={`Preview ${index + 1}`}
                        className={`w-full object-cover h-64`}
                      />
                      {images.length > 4 && index === 3 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-semibold">
                            +{images.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {video && (
                <div className="relative bg-black rounded-lg overflow-hidden mb-3">
                  <video
                    src={getMediaUrl(video)}
                    className="w-full h-64 object-cover"
                    controls
                    preload="metadata"
                    poster={getMediaUrl(video)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-gray-500 max-w-md">
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">12</span>
                </Button>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <Share className="w-4 h-4 mr-1" />
                  <span className="text-xs">3</span>
                </Button>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-xs">24</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (platform === 'linkedin') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>LI</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {account || 'Tên người dùng'}
              </p>
              <p className="text-xs text-gray-500">Chức vụ tại Công ty</p>
              <p className="text-xs text-gray-500">1 phút · 🌍</p>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm mb-4">{formatContent(content)}</p>

          {/* Media Display */}
          {images && images.length > 0 && (
            <div
              className={`grid gap-1 ${
                images.length === 1
                  ? 'grid-cols-1'
                  : images.length === 2
                  ? 'grid-cols-2'
                  : images.length === 3
                  ? 'grid-cols-2'
                  : 'grid-cols-2'
              } mb-4 rounded-lg overflow-hidden`}
            >
              {images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`relative ${
                    images.length === 3 && index === 0 ? 'col-span-2' : ''
                  } ${images.length > 4 && index === 3 ? 'relative' : ''}`}
                >
                  <img
                    src={getMediaUrl(image) || '/placeholder.svg'}
                    alt={`Preview ${index + 1}`}
                    className={`w-full object-cover h-64`}
                  />
                  {images.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {video && (
            <div className="relative bg-black rounded-lg overflow-hidden mb-3">
              <video
                src={getMediaUrl(video)}
                className="w-full h-64 object-cover"
                controls
                preload="metadata"
                poster={getMediaUrl(video)}
              />
            </div>
          )}

          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" className="flex-1">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Thích
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-1" />
                Bình luận
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Share className="w-4 h-4 mr-1" />
                Chia sẻ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (platform === 'tiktok') {
    return (
      <Card className="max-w-sm mx-auto bg-black text-white">
        <CardContent className="p-0 relative">
          {/* Video Display */}
          {video ? (
            <div className="relative aspect-[9/16] bg-black">
              <video
                src={getMediaUrl(video)}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster={getMediaUrl(video)}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-80" />
              </div>

              {/* TikTok UI Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-end justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>TT</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm">
                        {account || '@username'}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1 h-auto bg-transparent"
                      >
                        Theo dõi
                      </Button>
                    </div>
                    <p className="text-sm mb-2">{formatContent(content)}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span>🎵 Nhạc nền gốc</span>
                    </div>
                  </div>

                  {/* Right side buttons */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-center">
                      <Heart className="w-8 h-8 mx-auto mb-1" />
                      <span className="text-xs">1.2K</span>
                    </div>
                    <div className="text-center">
                      <MessageCircle className="w-8 h-8 mx-auto mb-1" />
                      <span className="text-xs">89</span>
                    </div>
                    <div className="text-center">
                      <Share className="w-8 h-8 mx-auto mb-1" />
                      <span className="text-xs">45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-[9/16] bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Video sẽ hiển thị ở đây</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="text-center py-8 text-gray-500">
      <p>Preview cho {platform} đang được phát triển</p>
    </div>
  );
}
