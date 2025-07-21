import type { Metadata } from 'next';

import { Be_Vietnam_Pro } from 'next/font/google';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import Providers from '@/app/providers';
import { Header } from '@/components/layouts/header';
import { Sidebar } from '@/components/layouts/sidebar';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-beVietnam',
});

export const metadata: Metadata = {
  title: 'Code Base FE',
  description:
    'A Next.js application with authentication and user profile features',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('x-locale')?.value || 'vi';
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${beVietnamPro.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {' '}
            <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:bg-gray-900">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto p-6">{children}</main>
              </div>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
