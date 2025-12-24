import { Capacitor } from '@capacitor/core';
import { AdSenseAd } from './AdSenseAd';

interface AppAdProps {
    type: 'banner' | 'sidebar-left' | 'sidebar-right' | 'inline';
}

const ADSENSE_CLIENT = 'ca-pub-1582358304584144';
const ADSENSE_SLOT = '6428174874';

export function AppAd({ type }: AppAdProps) {
    const isNative = Capacitor.isNativePlatform();

    // Sidebars and bottom banner are only for web (desktop view)
    if (type === 'sidebar-left' || type === 'sidebar-right') {
        return (
            <div className="hidden lg:block w-[160px] min-w-[160px] h-[600px] min-h-[600px] sticky top-20 bg-card/50 border rounded-xl overflow-hidden shadow-soft">
                <AdSenseAd
                    client={ADSENSE_CLIENT}
                    slot={ADSENSE_SLOT}
                    format="vertical"
                    style={{ display: 'block', width: '160px', height: '600px' }}
                />
            </div>
        );
    }

    if (type === 'banner') {
        // Bottom wide ad - visible on both web and native
        return (
            <div className="flex justify-center w-full py-4 mt-auto border-t bg-card/50">
                <div className="max-w-4xl w-full px-4">
                    <AdSenseAd
                        client={ADSENSE_CLIENT}
                        slot={ADSENSE_SLOT}
                        format="horizontal"
                        style={{ display: 'block', width: '100%', height: '90px' }}
                    />
                </div>
            </div>
        );
    }

    // Inline ads - show on both web and mobile
    return (
        <div className="my-6 flex justify-center w-full overflow-hidden rounded-xl border bg-card/50">
            <AdSenseAd
                client={ADSENSE_CLIENT}
                slot={ADSENSE_SLOT}
                format="fluid"
                layoutKey="-ef+6k-30-ac+ty"
            />
        </div>
    );
}
