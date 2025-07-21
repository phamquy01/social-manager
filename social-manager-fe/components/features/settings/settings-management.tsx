'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, Sun, Palette, CheckCircle } from 'lucide-react';
import { useTheme } from '@/lib/contexts/theme-context';

export function SettingsManagement() {
  const {
    isDarkMode,
    toggleDarkMode,
    currentTheme,
    setTheme,
    themes,
    language,
    setLanguage,
    t,
  } = useTheme();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList
          className={`grid w-full grid-cols-4 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white/50 border-white/20'
          }`}
        >
          <TabsTrigger
            value="general"
            className={isDarkMode ? 'data-[state=active]:bg-gray-700' : ''}
          >
            {t('general-settings').split(' ')[0]}
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className={isDarkMode ? 'data-[state=active]:bg-gray-700' : ''}
          >
            {t('notification-settings').split(' ')[0]}
          </TabsTrigger>
          <TabsTrigger
            value="posting"
            className={isDarkMode ? 'data-[state=active]:bg-gray-700' : ''}
          >
            {t('posting-settings').split(' ')[0]}
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className={isDarkMode ? 'data-[state=active]:bg-gray-700' : ''}
          >
            {t('account-settings').split(' ')[0]}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card
            className={`${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white/80 backdrop-blur-sm border-white/20'
            } shadow-xl`}
          >
            <CardHeader>
              <CardTitle className={isDarkMode ? 'text-white' : ''}>
                {t('general-settings')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`flex items-center justify-between p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100'
                } rounded-xl`}
              >
                <div className="flex items-center space-x-3">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                  <div>
                    <Label
                      className={`font-medium ${
                        isDarkMode ? 'text-white' : ''
                      }`}
                    >
                      {t('dark-mode')}
                    </Label>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {t('dark-mode-desc')}
                    </p>
                  </div>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              </div>

              <div
                className={`flex items-center justify-between p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100'
                } rounded-xl`}
              >
                <div>
                  <Label
                    className={`font-medium ${isDarkMode ? 'text-white' : ''}`}
                  >
                    {t('language')}
                  </Label>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t('language-desc')}
                  </p>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger
                    className={`w-32 ${
                      isDarkMode
                        ? 'bg-gray-600 border-gray-500'
                        : 'bg-white border-white/20'
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div
                className={`p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100'
                } rounded-xl`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Palette className="w-5 h-5" />
                  <div>
                    <Label
                      className={`font-medium ${
                        isDarkMode ? 'text-white' : ''
                      }`}
                    >
                      {t('theme-color')}
                    </Label>
                    <p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {t('theme-color-desc')}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme)}
                      className={`w-12 h-12 rounded-xl ${
                        theme.gradient
                      } flex items-center justify-center transition-all duration-200 ${
                        currentTheme.id === theme.id
                          ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                          : 'hover:scale-105'
                      }`}
                      title={theme.name}
                    >
                      {currentTheme.id === theme.id && (
                        <CheckCircle className="w-6 h-6 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card
            className={`${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white/80 backdrop-blur-sm border-white/20'
            } shadow-xl`}
          >
            <CardHeader>
              <CardTitle className={isDarkMode ? 'text-white' : ''}>
                {t('notification-settings')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`flex items-center justify-between p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-blue-50 to-purple-50'
                } rounded-xl`}
              >
                <div>
                  <Label
                    className={`font-medium ${isDarkMode ? 'text-white' : ''}`}
                  >
                    {t('email-notifications')}
                  </Label>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t('email-notifications-desc')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div
                className={`flex items-center justify-between p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-green-50 to-blue-50'
                } rounded-xl`}
              >
                <div>
                  <Label
                    className={`font-medium ${isDarkMode ? 'text-white' : ''}`}
                  >
                    {t('comment-notifications')}
                  </Label>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t('comment-notifications-desc')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div
                className={`flex items-center justify-between p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-purple-50 to-pink-50'
                } rounded-xl`}
              >
                <div>
                  <Label
                    className={`font-medium ${isDarkMode ? 'text-white' : ''}`}
                  >
                    {t('weekly-reports')}
                  </Label>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t('weekly-reports-desc')}
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posting" className="space-y-4">
          <Card
            className={`${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white/80 backdrop-blur-sm border-white/20'
            } shadow-xl`}
          >
            <CardHeader>
              <CardTitle className={isDarkMode ? 'text-white' : ''}>
                {t('posting-settings')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-orange-50 to-yellow-50'
                } rounded-xl`}
              >
                <Label
                  className={`font-medium ${isDarkMode ? 'text-white' : ''}`}
                >
                  {t('default-timezone')}
                </Label>
                <Select defaultValue="Asia/Ho_Chi_Minh">
                  <SelectTrigger
                    className={`mt-2 ${
                      isDarkMode
                        ? 'bg-gray-600 border-gray-500'
                        : 'bg-white border-white/20'
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Ho_Chi_Minh">
                      Việt Nam (GMT+7)
                    </SelectItem>
                    <SelectItem value="America/New_York">
                      New York (GMT-5)
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      London (GMT+0)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div
                className={`flex items-center justify-between p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-green-50 to-teal-50'
                } rounded-xl`}
              >
                <div>
                  <Label
                    className={`font-medium ${isDarkMode ? 'text-white' : ''}`}
                  >
                    {t('auto-save-drafts')}
                  </Label>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {t('auto-save-drafts-desc')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card
            className={`${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white/80 backdrop-blur-sm border-white/20'
            } shadow-xl`}
          >
            <CardHeader>
              <CardTitle className={isDarkMode ? 'text-white' : ''}>
                {t('account-settings')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className={`p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                } rounded-xl`}
              >
                <Label
                  htmlFor="name"
                  className={`font-medium ${isDarkMode ? 'text-white' : ''}`}
                >
                  {t('display-name')}
                </Label>
                <Input
                  id="name"
                  defaultValue="Nguyễn Văn A"
                  className={`mt-2 ${
                    isDarkMode
                      ? 'bg-gray-600 border-gray-500'
                      : 'bg-white border-white/20'
                  }`}
                />
              </div>
              <div
                className={`p-4 ${
                  isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gradient-to-r from-purple-50 to-pink-50'
                } rounded-xl`}
              >
                <Label
                  htmlFor="email"
                  className={`font-medium ${isDarkMode ? 'text-white' : ''}`}
                >
                  {t('email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="user@example.com"
                  className={`mt-2 ${
                    isDarkMode
                      ? 'bg-gray-600 border-gray-500'
                      : 'bg-white border-white/20'
                  }`}
                />
              </div>
              <Button
                className={`${currentTheme.gradient} ${currentTheme.hover} shadow-lg`}
              >
                {t('update-info')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
