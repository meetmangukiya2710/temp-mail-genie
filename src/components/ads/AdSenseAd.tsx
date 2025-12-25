import { useEffect, useRef, useState } from 'react';

interface AdSenseAdProps {
    client: string;
    slot: string;
    format?: string;
    layoutKey?: string;
    style?: React.CSSProperties;
    className?: string;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export function AdSenseAd({
    client,
    slot,
    format = 'auto',
    layoutKey,
    style = { display: 'block' },
    className = '',
}: AdSenseAdProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [initialized, setInitialized] = useState(false);
    const [availableWidth, setAvailableWidth] = useState(0);

    // Initial width detection
    useEffect(() => {
        if (containerRef.current) {
            setAvailableWidth(containerRef.current.offsetWidth);
        }

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentRect.width > 0) {
                    setAvailableWidth(entry.contentRect.width);
                }
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Load AdSense once width is ready
    useEffect(() => {
        if (availableWidth > 0 && !initialized) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                setInitialized(true);
                console.log(`[AdSense] Initialized unit ${slot} with width ${availableWidth}px`);
            } catch (e) {
                console.error('[AdSense] Initialization error:', e);
            }
        }
    }, [availableWidth, initialized, slot]);

    return (
        <div
            ref={containerRef}
            className={`ad-container relative overflow-hidden transition-all ${className}`}
            style={{ width: '100%', minHeight: '1px' }}
        >
            {availableWidth > 0 && (
                <ins
                    className="adsbygoogle"
                    style={{
                        ...style,
                        display: 'block',
                        width: '100%'
                    }}
                    data-ad-client={client}
                    data-ad-slot={slot}
                    data-ad-format={format}
                    {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
                />
            )}
        </div>
    );
}
