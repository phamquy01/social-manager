import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Facebook,
  ChromeIcon as Google,
  Twitter,
  Instagram,
} from 'lucide-react'; // Import icons

export default function RegisterForm() {
  return (
    <Card className="mx-auto max-w-sm bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Đăng ký</CardTitle>
        <CardDescription>
          Nhập thông tin của bạn hoặc đăng ký bằng mạng xã hội.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full bg-social-google text-white hover:bg-social-google/90"
          >
            <Google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button
            variant="outline"
            className="w-full bg-social-facebook text-white hover:bg-social-facebook/90"
          >
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full bg-social-twitter text-white hover:bg-social-twitter/90"
          >
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            className="w-full bg-social-instagram text-white hover:bg-social-instagram/90"
          >
            <Instagram className="mr-2 h-4 w-4" />
            Instagram
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Hoặc tiếp tục với
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Tên của bạn</Label>
          <Input id="name" type="text" placeholder="Nguyễn Văn A" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          className="w-full bg-social-primary-500 hover:bg-social-primary-600 text-white"
        >
          Đăng ký
        </Button>
        <div className="text-center text-sm text-social-gray-600">
          Đã có tài khoản?{' '}
          <Link
            href="/login"
            className="underline text-social-accent-500 hover:text-social-accent-600"
            prefetch={false}
          >
            Đăng nhập
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
