import NotificationProvider from '@/lib/contexts/notification-context';
import { ThemeProvider } from '@/lib/contexts/theme-context';
import NextTopLoader from 'nextjs-toploader';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <NotificationProvider>
          <NextTopLoader color="red" />
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </>
  );
}
