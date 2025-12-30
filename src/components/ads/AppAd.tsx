import { Capacitor } from '@capacitor/core';
import { AdSenseAd } from './AdSenseAd';
import { useAdPage } from '@/hooks/useAdPage';

interface AppAdProps {
    type: 'banner' | 'sidebar-left' | 'sidebar-right' | 'inline';
}

const ADSENSE_CLIENT = 'ca-pub-1582358304584144';
const ADSENSE_SLOT = '6428174874';

/**
 * AppAd Component - AdSense Policy Compliant
 * 
 * This component implements strict ad placement controls to comply with
 * Google AdSense policies. Ads are ONLY shown on content-rich pages.
 * 
 * Prohibited pages (ads will NOT show):
 * - Homepage (/) - functional tool page
 * - Settings (/settings) - administrative page
 * - Privacy/Terms pages - legal pages
 * 
 * Allowed pages (ads will show):
 * - Article detail pages (/articles/:id)
 * - About Us page (/about)
 * - FAQ page (/faq)
 * - Articles listing (/articles)
 */
export function AppAd({ type }: AppAdProps) {
    const isNative = Capacitor.isNativePlatform();
    const { allowAds } = useAdPage();

    // CRITICAL: Check if ads are allowed on current page
    // This prevents "Google-served ads on screens without publisher-content" violation
    if (!allowAds) {
        return null;
    }

    // On native mobile, we only show ads if you have AdMob set up. 
    // Since we are doing AdSense for web right now:
    if (isNative && type !== 'inline') return null;

    // Sidebar ads are removed - only inline ads for better compliance
    if (type === 'sidebar-left' || type === 'sidebar-right') {
        return null;
    }

    // Banner ads are removed - only inline ads for better compliance
    if (type === 'banner') {
        return null;
    }

    // Inline ads - only ad type we use
    return (
        <div className="my-6 flex justify-center w-full overflow-hidden min-h-[280px] bg-muted/20 rounded-xl">
            <AdSenseAd
                client={ADSENSE_CLIENT}
                slot={ADSENSE_SLOT}
                format="fluid"
                layoutKey="-ff+51-28-ag+ra"
            />
        </div>
    );
}
