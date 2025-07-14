'use client';

import { Toaster } from 'sonner';
import { createContext, useContext } from 'react';
import { toast } from 'sonner';

type NotificationContextType = {
  notify: (message: string, type?: 'success' | 'error' | 'info') => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const notify = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    toast[type](message);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      <Toaster richColors position="top-right" closeButton />
      {children}
    </NotificationContext.Provider>
  );
}
