import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Shield,
  FileText,
  Moon,
  Bell,
  ExternalLink,
  Info,
  Heart,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { AppAd } from '@/components/ads/AppAd';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    console.log('[Settings] Page mounted');
  }, []);

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container py-6 sm:py-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6 animate-fade-in">Settings</h1>


          <AppAd type="inline" />

          <div className="space-y-4 stagger-children">
            {/* Appearance */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                </div>
              </CardContent>
            </Card>

            <AppAd type="inline" />

            {/* Notifications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new email arrives
                    </p>
                  </div>
                  <Switch disabled />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Coming soon in premium version
                </p>
              </CardContent>
            </Card>

            <AppAd type="inline" />

            {/* Legal */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Legal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Button variant="ghost" className="w-full justify-between h-auto py-4 px-6 rounded-none border-b group" asChild>
                  <Link to="/privacy-policy">
                    <span className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      Privacy Policy
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-between h-auto py-4 px-6 rounded-none group" asChild>
                  <Link to="/terms-of-service">
                    <span className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      Terms of Service
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <AppAd type="inline" />

            {/* Privacy Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Your Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    No personal data collected
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    Emails auto-delete after 30 minutes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    No registration required
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-0.5">✓</span>
                    No tracking or analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <AppAd type="inline" />

            {/* About */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  About
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

          <AppAd type="inline" />
        </div>
      </main>

      <AppAd type="banner" />

    </div>
  );
}
