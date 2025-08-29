'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  Star,
  Rocket,
  Heart,
  Zap,
  Cloud,
  Settings,
  Bell,
  Gift,
  Camera,
  Smartphone,
  Monitor,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
  Share2,
  Users,
  TrendingUp,
  Hash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LoginProps {
  data?: {
    homePagePath?: string;
    dashboardPath?: string;
  };
}

const LoginPage = ({ data }: LoginProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'password') {
        router.push(data?.dashboardPath || '/dashboard');
      } else {
        setErrors({
          username: 'Invalid username or password',
          password: 'Invalid username or password',
        });
      }
      setProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side: Logo/Info */}
      <div className="flex-1 bg-gradient-to-br from-purple-700 via-blue-600 to-blue-500 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="max-w-lg w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12 text-center relative z-10">
          <div className="relative mb-6">
            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
                Social
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Manager
              </span>
            </div>
            <div className="text-sm text-blue-200 opacity-80 font-medium tracking-wider">
              QUẢN LÝ MẠNG XÃ HỘI THÔNG MINH
            </div>
          </div>

          <h1 className="text-xl lg:text-2xl font-bold mb-4 text-shadow-lg">
            Nền tảng quản trị nội dung hiện đại
          </h1>

          <p className="text-blue-100 text-base lg:text-lg mb-6 leading-relaxed">
            Dành cho doanh nghiệp, tổ chức, cá nhân muốn quản lý website{' '}
            <strong>chuyên nghiệp</strong> và <strong>an toàn</strong>.
          </p>

          <div className="space-y-4 text-left">
            {[
              'Quản lý đa nền tảng mạng xã hội',
              'Lên lịch đăng bài tự động',
              'Phân tích hiệu suất chi tiết',
              'Hỗ trợ kỹ thuật 24/7',
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/20 border border-cyan-300 rounded-2xl p-4 backdrop-blur-sm shadow-lg"
              >
                <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                <span className="font-medium text-blue-100">{feature}</span>
              </div>
            ))}
          </div>

          <p className="text-blue-200 text-sm mt-6 opacity-95">
            <strong>Đăng nhập</strong> để bắt đầu quản lý mạng xã hội hoặc{' '}
            <span className="text-white">liên hệ</span> để được tư vấn giải
            pháp!
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>

        {/* Floating social media icons for form side */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            {
              Icon: Facebook,
              className: 'top-[15%] left-[10%] text-blue-500/60',
              size: 'w-7 h-7',
            },
            {
              Icon: Instagram,
              className: 'top-[25%] right-[20%] text-pink-400/60',
              size: 'w-6 h-6',
            },
            {
              Icon: Twitter,
              className: 'bottom-[30%] left-[15%] text-blue-400/60',
              size: 'w-7 h-7',
            },
            {
              Icon: Youtube,
              className: 'top-[60%] right-[10%] text-red-500/60',
              size: 'w-6 h-6',
            },
            {
              Icon: Linkedin,
              className: 'bottom-[15%] right-[25%] text-blue-600/60',
              size: 'w-6 h-6',
            },
            {
              Icon: MessageCircle,
              className: 'top-[40%] left-[5%] text-cyan-400/60',
              size: 'w-6 h-6',
            },
            {
              Icon: Share2,
              className: 'bottom-[50%] right-[5%] text-purple-400/60',
              size: 'w-5 h-5',
            },
            {
              Icon: Hash,
              className: 'top-[80%] left-[25%] text-orange-400/60',
              size: 'w-6 h-6',
            },
            {
              Icon: TrendingUp,
              className: 'bottom-[70%] left-[35%] text-green-400/60',
              size: 'w-6 h-6',
            },
            {
              Icon: Users,
              className: 'top-[35%] right-[35%] text-yellow-400/60',
              size: 'w-6 h-6',
            },
            {
              Icon: Heart,
              className: 'top-[10%] right-[5%] text-pink-500/60',
              size: 'w-5 h-5',
            },
            {
              Icon: Star,
              className: 'bottom-[40%] left-[40%] text-yellow-500/60',
              size: 'w-5 h-5',
            },
            {
              Icon: Bell,
              className: 'top-[70%] right-[40%] text-indigo-400/60',
              size: 'w-5 h-5',
            },
            {
              Icon: Gift,
              className: 'bottom-[60%] left-[8%] text-purple-500/60',
              size: 'w-5 h-5',
            },
            {
              Icon: Camera,
              className: 'top-[50%] right-[15%] text-cyan-500/60',
              size: 'w-5 h-5',
            },
          ].map((item, index) => (
            <item.Icon
              key={`form-${index}`}
              className={`absolute ${item.className} ${item.size} opacity-40`}
              style={{
                animationDelay: `${index * 0.4}s`,
                animation: `float-gentle-${index % 4} ${
                  3.5 + (index % 2)
                }s ease-in-out infinite`,
                filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))',
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Social
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Manager
              </span>
            </div>
            <div className="text-xs text-gray-500 font-medium tracking-wider">
              QUẢN LÝ MẠNG XÃ HỘI THÔNG MINH
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-blue-600 mb-2">
                Tên đăng nhập hoặc Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('username', e.target.value)
                  }
                  placeholder="Nhập email hoặc tên đăng nhập"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  autoFocus
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-blue-600 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('password', e.target.value)
                  }
                  placeholder="Nhập mật khẩu"
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={formData.remember}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange('remember', e.target.checked)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-sm uppercase tracking-wider hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              {processing ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <Link
              href="/auth/forgot-password"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Quên mật khẩu?
            </Link>
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Đăng ký
              </Link>
            </p>
          </div>

          {/* Home Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => router.push(data?.homePagePath || '/')}
              className="w-full bg-gradient-to-r from-green-400 to-cyan-400 text-white py-3 px-4 rounded-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105 hover:from-green-500 hover:to-cyan-500"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          // Social Media Icons - Row 1
          {
            Icon: Facebook,
            className: 'top-[8%] left-[5%] text-blue-500',
            size: 'w-9 h-9',
          },
          {
            Icon: Instagram,
            className: 'top-[20%] right-[12%] text-pink-400',
            size: 'w-8 h-8',
          },
          {
            Icon: Twitter,
            className: 'bottom-[40%] right-[20%] text-blue-400',
            size: 'w-9 h-9',
          },
          {
            Icon: Youtube,
            className: 'bottom-[20%] left-[10%] text-red-500',
            size: 'w-8 h-8',
          },
          {
            Icon: Linkedin,
            className: 'top-[50%] right-[5%] text-blue-600',
            size: 'w-8 h-8',
          },
          // Social Media Icons - Row 2
          {
            Icon: TrendingUp,
            className: 'bottom-[60%] left-[40%] text-green-400',
            size: 'w-7 h-7',
          },
          {
            Icon: MessageCircle,
            className: 'top-[35%] left-[15%] text-cyan-400',
            size: 'w-8 h-8',
          },
          {
            Icon: Share2,
            className: 'top-[75%] right-[40%] text-purple-400',
            size: 'w-7 h-7',
          },
          {
            Icon: Users,
            className: 'top-[15%] left-[60%] text-yellow-400',
            size: 'w-8 h-8',
          },
          {
            Icon: Hash,
            className: 'bottom-[15%] left-[30%] text-orange-400',
            size: 'w-7 h-7',
          },
          // Additional Social Icons
          {
            Icon: Heart,
            className: 'top-[85%] right-[15%] text-pink-500',
            size: 'w-7 h-7',
          },
          {
            Icon: Star,
            className: 'bottom-[80%] right-[70%] text-yellow-500',
            size: 'w-7 h-7',
          },
          {
            Icon: Bell,
            className: 'bottom-[70%] right-[25%] text-indigo-400',
            size: 'w-6 h-6',
          },
          {
            Icon: Gift,
            className: 'top-[55%] left-[75%] text-purple-500',
            size: 'w-7 h-7',
          },
          {
            Icon: Camera,
            className: 'top-[80%] left-[25%] text-cyan-500',
            size: 'w-7 h-7',
          },
          // Tech Icons
          {
            Icon: Monitor,
            className: 'top-[65%] left-[8%] text-slate-400',
            size: 'w-7 h-7',
          },
          {
            Icon: Cloud,
            className: 'bottom-[35%] right-[8%] text-white/80',
            size: 'w-7 h-7',
          },
          {
            Icon: Rocket,
            className: 'top-[40%] right-[35%] text-orange-400',
            size: 'w-7 h-7',
          },
          {
            Icon: Smartphone,
            className: 'bottom-[50%] left-[65%] text-green-400',
            size: 'w-6 h-6',
          },
          {
            Icon: Settings,
            className: 'top-[25%] right-[60%] text-gray-500',
            size: 'w-7 h-7',
          },
          {
            Icon: Zap,
            className: 'bottom-[25%] right-[45%] text-yellow-400',
            size: 'w-6 h-6',
          },
        ].map((item, index) => (
          <item.Icon
            key={index}
            className={`absolute ${item.className} ${item.size} opacity-60`}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: `${2.5 + index * 0.15}s`,
              filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.4))',
              animation: `float-${index % 6} ${
                2.5 + (index % 3)
              }s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Custom CSS for floating animations */}
      <style jsx>{`
        @keyframes float-0 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg)
              scale(1.1);
          }
          50% {
            transform: translateY(-10px) translateX(-15px) rotate(-3deg)
              scale(0.9);
          }
          75% {
            transform: translateY(-25px) translateX(5px) rotate(8deg)
              scale(1.05);
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-15px) translateX(-20px) rotate(-8deg)
              scale(1.15);
          }
          66% {
            transform: translateY(-30px) translateX(10px) rotate(5deg)
              scale(0.85);
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-25px) translateX(20px) rotate(10deg)
              scale(1.2);
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          30% {
            transform: translateY(-18px) translateX(-10px) rotate(-6deg)
              scale(1.1);
          }
          70% {
            transform: translateY(-8px) translateX(25px) rotate(12deg)
              scale(0.9);
          }
        }

        @keyframes float-4 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          40% {
            transform: translateY(-22px) translateX(15px) rotate(7deg)
              scale(1.05);
          }
          80% {
            transform: translateY(-12px) translateX(-18px) rotate(-5deg)
              scale(1.15);
          }
        }

        @keyframes float-5 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          60% {
            transform: translateY(-35px) translateX(-12px) rotate(-10deg)
              scale(0.95);
          }
        }

        @keyframes float-gentle-0 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) translateX(8px) rotate(3deg);
          }
        }

        @keyframes float-gentle-1 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) translateX(-10px) rotate(-4deg);
          }
        }

        @keyframes float-gentle-2 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) translateX(12px) rotate(5deg);
          }
        }

        @keyframes float-gentle-3 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) translateX(-8px) rotate(-2deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
