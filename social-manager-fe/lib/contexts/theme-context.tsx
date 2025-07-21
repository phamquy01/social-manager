'use client';

import { useTranslations } from 'next-intl';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

type ThemeColor = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  gradient: string;
  hover: string;
};

type Language = 'vi' | 'en';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  themes: ThemeColor[];
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const themeColors: ThemeColor[] = [
  {
    id: 'blue',
    name: 'Xanh dương',
    primary: 'bg-blue-500',
    secondary: 'bg-blue-600',
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
    hover: 'hover:from-blue-600 hover:to-blue-700',
  },
  {
    id: 'purple',
    name: 'Tím',
    primary: 'bg-purple-500',
    secondary: 'bg-purple-600',
    gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
    hover: 'hover:from-purple-600 hover:to-purple-700',
  },
  {
    id: 'green',
    name: 'Xanh lá',
    primary: 'bg-green-500',
    secondary: 'bg-green-600',
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-500',
    hover: 'hover:from-green-600 hover:to-emerald-600',
  },
  {
    id: 'pink',
    name: 'Hồng',
    primary: 'bg-pink-500',
    secondary: 'bg-pink-600',
    gradient: 'bg-gradient-to-r from-pink-500 to-rose-500',
    hover: 'hover:from-pink-600 hover:to-rose-600',
  },
  {
    id: 'orange',
    name: 'Cam',
    primary: 'bg-orange-500',
    secondary: 'bg-orange-600',
    gradient: 'bg-gradient-to-r from-orange-500 to-amber-500',
    hover: 'hover:from-orange-600 hover:to-amber-600',
  },
  {
    id: 'teal',
    name: 'Xanh ngọc',
    primary: 'bg-teal-500',
    secondary: 'bg-teal-600',
    gradient: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    hover: 'hover:from-teal-600 hover:to-cyan-600',
  },
  {
    id: 'indigo',
    name: 'Chàm',
    primary: 'bg-indigo-500',
    secondary: 'bg-indigo-600',
    gradient: 'bg-gradient-to-r from-indigo-500 to-blue-500',
    hover: 'hover:from-indigo-600 hover:to-blue-600',
  },
  {
    id: 'red',
    name: 'Đỏ',
    primary: 'bg-red-500',
    secondary: 'bg-red-600',
    gradient: 'bg-gradient-to-r from-red-500 to-pink-500',
    hover: 'hover:from-red-600 hover:to-pink-600',
  },
  {
    id: 'yellow',
    name: 'Vàng',
    primary: 'bg-yellow-500',
    secondary: 'bg-yellow-600',
    gradient: 'bg-gradient-to-r from-yellow-400 to-orange-400',
    hover: 'hover:from-yellow-500 hover:to-orange-500',
  },
  {
    id: 'violet',
    name: 'Tím nhạt',
    primary: 'bg-violet-500',
    secondary: 'bg-violet-600',
    gradient: 'bg-gradient-to-r from-violet-500 to-purple-500',
    hover: 'hover:from-violet-600 hover:to-purple-600',
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themeColors[0]);
  const [language, setLanguage] = useState<Language>('vi');
  const t = useTranslations();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');

    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
    if (savedTheme) {
      const theme = themeColors.find((t) => t.id === savedTheme);
      if (theme) setCurrentTheme(theme);
    }
    if (savedLanguage) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  const setTheme = (theme: ThemeColor) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme.id);
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        currentTheme,
        setTheme,
        themes: themeColors,
        language,
        setLanguage: handleSetLanguage,
        t,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
