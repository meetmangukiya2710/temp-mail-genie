import { Mail, Settings, Moon, Sun, Menu, Home, Shield, FileText, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

  const navLinks = [
    { label: t('nav.home'), path: '/', icon: Home },
    { label: t('nav.settings'), path: '/settings', icon: Settings },
    { label: t('nav.privacy'), path: '/privacy-policy', icon: Shield },
    { label: t('nav.terms'), path: '/terms-of-service', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b pt-2 sm:pt-0">
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

        {/* Mobile Navigation */}
        <div className="flex sm:hidden items-center gap-2">
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

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <SheetHeader className="p-6 text-left border-b">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary shadow-soft">
                    <Mail className="h-4 w-4 text-primary-foreground" />
                  </div>
                  Temp Mail OneTap
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col py-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button
                      key={link.path}
                      variant="ghost"
                      className={`w-full justify-between h-auto py-4 px-6 rounded-none group ${location.pathname === link.path ? 'bg-secondary text-primary' : ''
                        }`}
                      asChild
                    >
                      <Link to={link.path}>
                        <span className="flex items-center gap-3">
                          <Icon className={`h-5 w-5 ${location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          {link.label}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  );
                })}
              </div>

              <div className="absolute bottom-0 w-full p-6 border-t bg-card/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {theme === 'dark' ? (
                        <Moon className="h-5 w-5 text-primary" />
                      ) : (
                        <Sun className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{t('settings.theme')}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {theme} {t('settings.theme')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={toggleTheme}
                    className="rounded-lg"
                  >
                    Switch
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
