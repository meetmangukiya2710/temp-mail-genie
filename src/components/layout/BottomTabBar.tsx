import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Settings } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export function BottomTabBar() {
  const { t } = useTranslation();
  const location = useLocation();
  const isMobile = Capacitor.isNativePlatform();

  if (!isMobile) {
    return null; // Only render on mobile platforms
  }

  const tabs = [
    { name: t('nav.mail'), href: '/', icon: Mail },
    { name: t('nav.settings'), href: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-background/80 backdrop-blur-md border-t shadow-soft rounded-t-[32px] mx-4 mb-2" style={{
      paddingBottom: 'env(safe-area-inset-bottom)',
      width: 'calc(100% - 2rem)',
    }}>
      <div className="flex justify-around h-11 items-center">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              to={tab.href}
              className={cn(
                "relative flex items-center justify-center w-16 h-10 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-sm" />
              )}
              <Icon className="h-6 w-6 relative z-10" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
