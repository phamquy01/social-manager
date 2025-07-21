'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Plus,
  Settings,
  Users,
  FileText,
  TrendingUp,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTheme } from '@/lib/contexts/theme-context';

// Define a type for social media account
interface SocialAccount {
  id: string;
  platform:
    | 'facebook'
    | 'instagram'
    | 'twitter'
    | 'linkedin'
    | 'youtube'
    | 'tiktok';
  name: string;
  username?: string;
  type?: string;
  followers: number;
  posts: number;
  engagementRate: number;
  autoPostEnabled: boolean;
  avatarFallback: string;
  avatarBg: string;
}

const ALL_PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'blue-600',
    bgColor: 'bg-blue-100',
    addText: 'Thêm trang Facebook khác',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'pink-600',
    bgColor: 'bg-from-pink-100 to-purple-100',
    addText: 'Thêm tài khoản Instagram khác',
  },
  {
    id: 'twitter',
    name: 'Twitter X',
    icon: () => (
      <svg
        className="w-6 h-6 text-slate-700"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: 'slate-700',
    bgColor: 'bg-slate-900',
    addText: 'Thêm tài khoản Twitter X khác',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'blue-600',
    bgColor: 'bg-blue-100',
    addText: 'Thêm tài khoản LinkedIn khác',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: 'red-600',
    bgColor: 'bg-red-200',
    addText: 'Thêm kênh YouTube khác',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: () => (
      <svg
        className="w-6 h-6 text-black"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C6.48 0 2 4.48 2 10c0 1.5.3 2.9.8 4.2l-1.3 4.7c-.2.7.4 1.3 1.1 1.1l4.7-1.3c1.3.5 2.7.8 4.2.8 5.52 0 10-4.48 10-10S17.52 0 12 0zm-1 16h-2V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
    color: 'black', // TikTok's primary color is black, often combined with red/blue
    bgColor: 'bg-gray-100',
    addText: 'Thêm tài khoản TikTok khác',
  },
];

// Define a map for explicit Tailwind classes to ensure JIT compilation
const platformStyles: Record<
  string,
  {
    text: string;
    border: string;
    hoverBg: string;
    hoverBorder: string;
  }
> = {
  facebook: {
    text: 'text-blue-600',
    border: 'border-blue-200',
    hoverBg: 'hover:bg-blue-50',
    hoverBorder: 'hover:border-blue-400',
  },
  instagram: {
    text: 'text-pink-600',
    border: 'border-pink-200',
    hoverBg: 'hover:bg-pink-50',
    hoverBorder: 'hover:border-pink-400',
  },
  twitter: {
    text: 'text-slate-700',
    border: 'border-slate-200',
    hoverBg: 'hover:bg-slate-50',
    hoverBorder: 'hover:border-slate-400',
  },
  linkedin: {
    text: 'text-blue-600',
    border: 'border-blue-200',
    hoverBg: 'hover:bg-blue-50',
    hoverBorder: 'hover:border-blue-400',
  },
  youtube: {
    text: 'text-red-600',
    border: 'border-red-200',
    hoverBg: 'hover:bg-red-50',
    hoverBorder: 'hover:border-red-400',
  },
  tiktok: {
    text: 'text-black',
    border: 'border-gray-200',
    hoverBg: 'hover:bg-gray-50',
    hoverBorder: 'hover:border-gray-400',
  },
};

export default function AccountsManagement() {
  const { isDarkMode } = useTheme();
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>(
    []
  );

  const fakeAccounts = useMemo(
    () => [
      {
        id: 'fb1',
        platform: 'facebook',
        name: 'ABC Company',
        type: 'Trang doanh nghiệp chính',
        followers: 12500,
        posts: 45,
        engagementRate: 8.2,
        autoPostEnabled: true,
        avatarFallback: 'ABC',
        avatarBg: 'from-blue-500 to-blue-600',
      },
      {
        id: 'fb2',
        platform: 'facebook',
        name: 'ABC Products',
        type: 'Trang sản phẩm',
        followers: 8300,
        posts: 32,
        engagementRate: 6.9,
        autoPostEnabled: true,
        avatarFallback: 'AP',
        avatarBg: 'from-green-500 to-green-600',
      },
      {
        id: 'ig1',
        platform: 'instagram',
        name: 'Fashion Store',
        username: '@fashionstore_vn',
        followers: 24100,
        posts: 156,
        engagementRate: 12.4,
        autoPostEnabled: true,
        avatarFallback: 'FS',
        avatarBg: 'from-pink-500 to-purple-600',
      },
      {
        id: 'ig2',
        platform: 'instagram',
        name: 'Food Blog VN',
        username: '@foodblog_vn',
        followers: 7800,
        posts: 89,
        engagementRate: 9.1,
        autoPostEnabled: false,
        avatarFallback: 'FB',
        avatarBg: 'from-orange-500 to-red-600',
      },
      {
        id: 'tw1',
        platform: 'twitter',
        name: 'My Business VN',
        username: '@mybusiness_vn',
        followers: 3200,
        posts: 23,
        engagementRate: 5.8,
        autoPostEnabled: false,
        avatarFallback: 'MB',
        avatarBg: 'from-slate-700 to-slate-800',
      },
      {
        id: 'li1',
        platform: 'linkedin',
        name: 'Tech Company',
        type: 'Công ty công nghệ',
        followers: 5400,
        posts: 28,
        engagementRate: 7.3,
        autoPostEnabled: true,
        avatarFallback: 'TC',
        avatarBg: 'from-blue-600 to-blue-700',
      },
      {
        id: 'yt1',
        platform: 'youtube',
        name: 'ABC Channel',
        type: 'Kênh chính',
        followers: 25100,
        posts: 67,
        engagementRate: 15.2,
        autoPostEnabled: true,
        avatarFallback: 'AC',
        avatarBg: 'from-red-500 to-red-600',
      },
      {
        id: 'yt2',
        platform: 'youtube',
        name: 'ABC Tech',
        type: 'Kênh công nghệ',
        followers: 8900,
        posts: 34,
        engagementRate: 18.5,
        autoPostEnabled: false,
        avatarFallback: 'AT',
        avatarBg: 'from-orange-500 to-red-600',
      },
      {
        id: 'tk1',
        platform: 'tiktok',
        name: 'TikTok Creator',
        username: '@tiktok_creator',
        followers: 50000,
        posts: 120,
        engagementRate: 20.1,
        autoPostEnabled: true,
        avatarFallback: 'TC',
        avatarBg: 'from-black to-gray-800',
      },
    ],
    []
  );

  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        // Simulate fetching accounts from an API
        setConnectedAccounts(fakeAccounts as SocialAccount[]);
      } catch (e: unknown) {
        console.error('Failed to fetch accounts:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [fakeAccounts]);

  const getAccountStatus = (isAutoPost: boolean) => {
    return isAutoPost
      ? {
          label: 'Hoạt động',
          className:
            'bg-green-100 text-green-700 hover:bg-green-100 border-green-200',
        }
      : {
          label: 'Tạm dừng',
          className:
            'bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200',
        };
  };

  const toggleAutoPost = (accountId: string) => {
    setConnectedAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === accountId
          ? { ...account, autoPostEnabled: !account.autoPostEnabled }
          : account
      )
    );
  };

  const handleConnectAccount = (platformId: string) => {
    // In a real application, this would involve an OAuth flow or API call
    // For this fake API, we'll just simulate adding a new account locally
    const newAccountId = `${platformId}${Date.now()}`;
    const newAccount: SocialAccount = {
      id: newAccountId,
      platform: platformId as SocialAccount['platform'],
      name: `Tài khoản mới ${platformId}`,
      username: `@new_${platformId}`,
      type: 'Tài khoản đã kết nối',
      followers: Math.floor(Math.random() * 10000) + 1000,
      posts: Math.floor(Math.random() * 100) + 10,
      engagementRate: Number.parseFloat(
        (Math.random() * (15 - 5) + 5).toFixed(1)
      ),
      autoPostEnabled: true,
      avatarFallback: platformId.substring(0, 2).toUpperCase(),
      avatarBg: 'from-gray-400 to-gray-500', // Generic color for new accounts
    };
    setConnectedAccounts((prev) => [...prev, newAccount]);
    setDialogOpen('');
  };

  const accountsByPlatform = useMemo(() => {
    return ALL_PLATFORMS.reduce((acc, platform) => {
      acc[platform.id] = connectedAccounts.filter(
        (account) => account.platform === platform.id
      );
      return acc;
    }, {} as Record<string, SocialAccount[]>);
  }, [connectedAccounts]);

  const connectedPlatforms = useMemo(() => {
    return ALL_PLATFORMS.filter(
      (platform) => accountsByPlatform[platform.id]?.length > 0
    );
  }, [accountsByPlatform]);

  const unconnectedPlatforms = useMemo(() => {
    return ALL_PLATFORMS.filter(
      (platform) => accountsByPlatform[platform.id]?.length === 0
    );
  }, [accountsByPlatform]);

  const overviewStats = useMemo(() => {
    const totalFollowers = connectedAccounts.reduce(
      (sum, acc) => sum + acc.followers,
      0
    );
    const totalPosts = connectedAccounts.reduce(
      (sum, acc) => sum + acc.posts,
      0
    );
    const totalEngagementRate = connectedAccounts.reduce(
      (sum, acc) => sum + acc.engagementRate,
      0
    );
    const activeAccountsCount = connectedAccounts.filter(
      (acc) => acc.autoPostEnabled
    ).length;

    return {
      totalFollowers: (totalFollowers / 1000).toFixed(1) + 'K',
      totalPosts: totalPosts,
      avgEngagementRate:
        connectedAccounts.length > 0
          ? (totalEngagementRate / connectedAccounts.length).toFixed(1) + '%'
          : '0%',
      activeAccountsCount: activeAccountsCount,
    };
  }, [connectedAccounts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
          <p className="text-slate-700">Đang tải tài khoản...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Tài khoản mạng xã hội
          </h1>
          <p className="text-slate-600 mt-1">
            Quản lý tất cả tài khoản mạng xã hội của bạn
          </p>
        </div>
        <Dialog
          open={dialogOpen === 'main'}
          onOpenChange={(open) => setDialogOpen(open ? 'main' : '')}
        >
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Thêm tài khoản khác
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chọn nền tảng</DialogTitle>
              <DialogDescription>
                Chọn nền tảng mạng xã hội bạn muốn kết nối.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {ALL_PLATFORMS.map((platform) => (
                <Button
                  key={platform.id}
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                  onClick={() => setDialogOpen(platform.id)}
                >
                  {platform.icon && (
                    <platform.icon
                      className={`w-6 h-6 ${platformStyles[platform.id].text}`}
                    />
                  )}
                  {platform.name}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Connected Platform Sections */}
      {connectedPlatforms.map((platform) => (
        <div key={platform.id} className="space-y-6">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                platform.bgColor.includes('from-')
                  ? `bg-gradient-to-br ${platform.bgColor}`
                  : `${platform.bgColor}`
              }`}
            >
              {platform.icon && (
                <platform.icon
                  className={`w-6 h-6 ${platformStyles[platform.id].text}`}
                />
              )}
            </div>
            <div className="flex justify-start items-center w-full gap-4">
              <h2 className="text-xl font-semibold text-slate-900">
                {platform.name}
              </h2>

              <Badge
                variant="outline"
                className={`${
                  isDarkMode
                    ? 'bg-gray-700 text-green-400 border-green-600'
                    : 'bg-green-50 text-green-700 border-green-200'
                }`}
              >
                {accountsByPlatform[platform.id]?.length || 0} tài khoản
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {accountsByPlatform[platform.id]?.map((account) => (
              <Card
                key={account.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm flex flex-col justify-center"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 ring-2 ring-blue-100">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback
                          className={`bg-gradient-to-br ${account.avatarBg} text-white font-semibold`}
                        >
                          {account.avatarFallback}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {account.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {account.username || account.type}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={
                        getAccountStatus(account.autoPostEnabled).className
                      }
                    >
                      {getAccountStatus(account.autoPostEnabled).label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">
                          {platform.id === 'youtube'
                            ? 'Người đăng ký'
                            : 'Người theo dõi'}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">
                        {(account.followers / 1000).toFixed(1)}K
                      </p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                        <FileText className="w-4 h-4" />
                        <span className="text-xs">
                          {platform.id === 'youtube' ? 'Video' : 'Bài viết'}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-slate-900">
                        {account.posts}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Tương tác</span>
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        {account.engagementRate}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={account.autoPostEnabled}
                        onCheckedChange={() => toggleAutoPost(account.id)}
                        className="data-[state=checked]:bg-violet-600"
                      />
                      <span className="text-sm text-slate-700">
                        Tự động đăng
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
                        <DropdownMenuItem>Lịch sử bài đăng</DropdownMenuItem>
                        <DropdownMenuItem>Thống kê chi tiết</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Account Card for platforms with connected accounts */}
            <Card
              className={`group hover:shadow-xl transition-all duration-300 border-2 border-dashed ${
                platformStyles[platform.id].hoverBorder
              } bg-white/50 backdrop-blur-sm`}
            >
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
                <div
                  className={`p-4 rounded-full mb-4 hover:${
                    platform.color.split('-')[0]
                  }-200 transition-colors ${
                    platform.bgColor.includes('from-')
                      ? `bg-gradient-to-br ${platform.bgColor}`
                      : `${platform.bgColor}`
                  }`}
                >
                  {platform.icon && (
                    <platform.icon
                      className={`w-8 h-8 ${platformStyles[platform.id].text}`}
                    />
                  )}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {platform.addText}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Kết nối thêm tài khoản {platform.name} để quản lý tập trung
                </p>
                <Dialog
                  open={dialogOpen === platform.id}
                  onOpenChange={(open) =>
                    setDialogOpen(open ? platform.id : '')
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className={`${platformStyles[platform.id].border} ${
                        platformStyles[platform.id].text
                      } ${platformStyles[platform.id].hoverBg} bg-transparent`}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Kết nối tài khoản {platform.name}
                      </DialogTitle>
                      <DialogDescription>
                        Nhập thông tin tài khoản {platform.name} của bạn để kết
                        nối.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Tên tài khoản
                        </label>
                        <input
                          className="w-full px-3 py-2 border border-slate-300 rounded-md"
                          placeholder={`Tên ${platform.name} hoặc @username`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">API Key</label>
                        <input
                          className="w-full px-3 py-2 border border-slate-300 rounded-md"
                          placeholder="Nhập API key"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setDialogOpen('')}
                      >
                        Hủy
                      </Button>
                      <Button onClick={() => handleConnectAccount(platform.id)}>
                        Kết nối
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}

      {/* Available Platforms Section (only if there are unconnected platforms) */}
      {unconnectedPlatforms.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Nền tảng khả dụng
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Kết nối thêm các nền tảng mạng xã hội khác
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {unconnectedPlatforms.map((platform) => (
              <Card
                key={platform.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div
                    className={`p-4 rounded-full mb-4 group-hover:bg-${
                      platform.color.split('-')[0]
                    }-200 transition-colors ${
                      platform.bgColor.includes('from-')
                        ? `bg-gradient-to-br ${platform.bgColor}`
                        : `bg-${platform.bgColor}`
                    }`}
                  >
                    {platform.icon && (
                      <platform.icon
                        className={`w-8 h-8 ${
                          platformStyles[platform.id].text
                        }`}
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Kết nối tài khoản {platform.name} để bắt đầu đăng bài
                  </p>
                  <Dialog
                    open={dialogOpen === platform.id}
                    onOpenChange={(open) =>
                      setDialogOpen(open ? platform.id : '')
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        className={`w-full ${
                          platformStyles[platform.id].text
                        } ${
                          platformStyles[platform.id].hoverBg
                        } bg-slate-900 hover:bg-slate-800 text-white`}
                      >
                        Kết nối
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Kết nối tài khoản {platform.name}
                        </DialogTitle>
                        <DialogDescription>
                          Nhập thông tin tài khoản {platform.name} của bạn để
                          kết nối.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Tên tài khoản
                          </label>
                          <input
                            className="w-full px-3 py-2 border border-slate-300 rounded-md"
                            placeholder={`Tên ${platform.name} hoặc @username`}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">API Key</label>
                          <input
                            className="w-full px-3 py-2 border border-slate-300 rounded-md"
                            placeholder="Nhập API key"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setDialogOpen('')}
                        >
                          Hủy
                        </Button>
                        <Button
                          onClick={() => handleConnectAccount(platform.id)}
                        >
                          Kết nối
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Overview Statistics Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Thống kê tổng quan
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Tổng hợp số liệu từ tất cả tài khoản
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Tổng người theo dõi</span>
              </div>
              <p className="text-3xl font-bold text-blue-900">
                {overviewStats.totalFollowers}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">Tổng bài viết</span>
              </div>
              <p className="text-3xl font-bold text-green-900">
                {overviewStats.totalPosts}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-purple-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Tỷ lệ tương tác TB</span>
              </div>
              <p className="text-3xl font-bold text-purple-900">
                {overviewStats.avgEngagementRate}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium">Tài khoản hoạt động</span>
              </div>
              <p className="text-3xl font-bold text-orange-900">
                {overviewStats.activeAccountsCount}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
