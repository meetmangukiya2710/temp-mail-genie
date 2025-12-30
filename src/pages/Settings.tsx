import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  FileText,
  Moon,
  Bell,
  Info,
  Heart,
  ChevronRight,
  Languages
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'hi', name: 'हिन्दी' },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container py-6 sm:py-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6 animate-fade-in">{t('settings.title')}</h1>



          <div className="space-y-4 stagger-children">
            {/* Appearance */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  {t('settings.appearance')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('settings.theme')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('settings.theme_desc')}
                    </p>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Languages className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{t('settings.language')}</p>
                        <p className="text-sm text-muted-foreground">
                          {t('settings.language_desc')}
                        </p>
                      </div>
                    </div>
                    <Select value={i18n.language.split('-')[0]} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>



            {/* Notifications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  {t('settings.notifications')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t('settings.email_notifications')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('settings.email_notifications_desc')}
                    </p>
                  </div>
                  <Switch disabled />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {t('settings.coming_soon')}
                </p>
              </CardContent>
            </Card>



            {/* Legal */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {t('settings.legal')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Button variant="ghost" className="w-full justify-between h-auto py-4 px-6 rounded-none border-b group" asChild>
                  <Link to="/privacy-policy">
                    <span className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      {t('nav.privacy')}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-between h-auto py-4 px-6 rounded-none group" asChild>
                  <Link to="/terms-of-service">
                    <span className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      {t('nav.terms')}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-between h-auto py-4 px-6 rounded-none group" asChild>
                  <Link to="/articles">
                    <span className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      {t('settings.articles')}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>



            {/* Privacy Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {t('about.why_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    {t('about.why_item1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    {t('about.why_item2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    {t('about.why_item3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    {t('about.why_item4')}
                  </li>
                </ul>
              </CardContent>
            </Card>



            {/* About */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  {t('common.app_name')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-4 pt-4 border-t text-center">
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    Made with <Heart className="h-4 w-4 text-destructive" /> for privacy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>



    </div>
  );
}
