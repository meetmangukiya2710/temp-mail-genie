import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Capacitor } from '@capacitor/core';

export function CookieConsent() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const isMobile = Capacitor.isNativePlatform();

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed left-0 right-0 z-[100] p-4 bg-background/95 backdrop-blur-md border-t shadow-2xl animate-in slide-in-from-bottom duration-500 ${isMobile ? 'bottom-[80px]' : 'bottom-0'}`}
        >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-foreground/90">
                    <p className="font-semibold mb-1">{t('cookie_consent.title')}</p>
                    <p>
                        {t('cookie_consent.message')}
                    </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => setIsVisible(false)}>
                        {t('cookie_consent.button_necessary')}
                    </Button>
                    <Button size="sm" className="w-full sm:w-auto" onClick={acceptCookies}>
                        {t('cookie_consent.button_accept')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
