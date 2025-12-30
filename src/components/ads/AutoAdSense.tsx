import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAdPage } from '@/hooks/useAdPage';
import { Capacitor } from '@capacitor/core';

const ADSENSE_CLIENT = 'ca-pub-1582358304584144';

/**
 * AutoAdSense Component
 * 
 * Dynamically injects the Google AdSense Auto Ads script into the <head>
 * based on page-level allowance and platform.
 */
export function AutoAdSense() {
    const location = useLocation();
    const { allowAds } = useAdPage();
    const isNative = Capacitor.isNativePlatform();

    useEffect(() => {
        // Only run on web platform and when ads are allowed for the current page
        if (isNative || !allowAds) return;

        // Check if script already exists to avoid duplicates
        const existingScript = document.querySelector(`script[src*="adsbygoogle.js"]`);

        if (!existingScript) {
            const script = document.createElement('script');
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);

            // Also add the account meta tag if it doesn't exist
            if (!document.querySelector('meta[name="google-adsense-account"]')) {
                const meta = document.createElement('meta');
                meta.name = 'google-adsense-account';
                meta.content = ADSENSE_CLIENT;
                document.head.appendChild(meta);
            }
        }
    }, [allowAds, isNative, location.pathname]);

    return null;
}
