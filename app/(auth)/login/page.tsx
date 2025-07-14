'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import z from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const t = useTranslations();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitLoginForm = (data: LoginForm) => {
    console.log('Login data:', data);
    // Handle login logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
        {t('login-title')}
      </h2>
      <form
        onSubmit={form.handleSubmit(onSubmitLoginForm)}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Nhập email"
            {...form.register('email')}
            className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {form.formState.errors.email && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nhập mật khẩu"
            {...form.register('password')}
            className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {form.formState.errors.password && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition-colors mt-2"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
