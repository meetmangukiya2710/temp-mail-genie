import { Mail, Settings, Moon, Sun, Menu, Home, Shield, FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Capacitor } from '@capacitor/core';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();

  const isMobile = Capacitor.isNativePlatform();
  const isWeb = !isMobile;

  const navLinks = [
    { label: t('nav.home'), path: '/', icon: Home },
    { label: t('nav.settings'), path: '/settings', icon: Settings },
    { label: t('nav.privacy'), path: '/privacy-policy', icon: Shield },
    { label: t('nav.terms'), path: '/terms-of-service', icon: FileText },
  ];

  if (!isWeb) {
    return null; // Don't render header on mobile
  }

  return (
    <header 
      className="web-sticky-header glass border-b pt-2 sm:pt-0"
      style={{
        paddingTop: `max(0.5rem, env(safe-area-inset-top, 0px))`,
      }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-soft transition-transform group-hover:scale-105">
            <Mail className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Temp Mail OneTap</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-lg"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant={location.pathname === '/settings' ? 'secondary' : 'ghost'}
            size="icon"
            asChild
            className="rounded-lg"
            aria-label="Settings"
          >
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation (now removed from Header component) */}
        {/* The mobile navigation will be handled by the new bottom tab bar and side menu */}
      </div>
    </header>
  );
}
