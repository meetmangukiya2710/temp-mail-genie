import { useEffect, useRef, useState } from 'react';
import { DummyAd } from './DummyAd';

interface AdSenseAdProps {
    client: string;
    slot: string;
    className?: string;
    style?: React.CSSProperties;
    format?: string;
    layoutKey?: string;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export function AdSenseAd({
    client,
    slot,
    className = '',
    style = { display: 'block' },
    format = 'auto',
    layoutKey
}: AdSenseAdProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [failed, setFailed] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [availableWidth, setAvailableWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const width = entry.contentRect.width;
                if (width > 0) {
                    setAvailableWidth(width);
                }
            }
        });

        observer.observe(containerRef.current);

        // Initial check
        const initialWidth = containerRef.current.offsetWidth;
        if (initialWidth > 0) {
            setAvailableWidth(initialWidth);
        } else {
            // Fallback for some mobile webviews
            const windowWidth = window.innerWidth;
            if (windowWidth > 0) {
                setAvailableWidth(windowWidth - 40);
            }
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Only initialize if we have width and haven't initialized yet
        if (availableWidth > 0 && !initialized) {
            console.log(`[AdSense] Initializing unit ${slot} with width ${availableWidth}`);
            const timer = setTimeout(() => {
                try {
                    // Check if AdSense script is actually loaded
                    if (window.adsbygoogle) {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        setInitialized(true);
                    }
                } catch (e: any) {
                    console.error('[AdSense] Initialization error:', e);
                    setFailed(true);
                }
            }, 800); // 800ms delay for deeper layout settling
            return () => clearTimeout(timer);
        }
    }, [availableWidth, initialized, slot]);

    // Timeout to detect failed load (if height remains 0 after initialization)
    useEffect(() => {
        if (!initialized) return;

        const timer = setTimeout(() => {
            if (containerRef.current) {
                const ins = containerRef.current.querySelector('ins.adsbygoogle');
                const height = ins ? (ins as HTMLElement).offsetHeight : 0;
                if (height === 0) {
                    console.warn(`[AdSense] Unit ${slot} failed to render (height 0)`);
                    setFailed(true);
                }
            }
        }, 5000); // 5s for mobile network latency

        return () => clearTimeout(timer);
    }, [initialized, slot]);

    if (failed) {
        return <DummyAd className={className} />;
    }

    return (
        <div
            ref={containerRef}
            className={`ad-container overflow-hidden min-h-[100px] bg-primary/5 transition-all ${className}`}
            style={{ width: '100%', minHeight: '100px' }}
        >
            {availableWidth > 0 ? (
                <>
                    <ins
                        className="adsbygoogle"
                        style={{ ...style, minHeight: '100px' }}
                        data-ad-client={client}
                        data-ad-slot={slot}
                        data-ad-format={format}
                        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
                    />
                    {!initialized && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                            <DummyAd text="Loading..." className="border-none bg-transparent" />
                        </div>
                    )}
                </>
            ) : (
                <DummyAd className={className} text="Detecting space..." />
            )}
        </div>
    );
}
