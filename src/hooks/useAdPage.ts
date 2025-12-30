import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface AdPageConfig {
    allowAds: boolean;
    recommendedPositions: ('inline' | 'banner')[];
    maxAdsPerPage: number;
}

/**
 * Custom hook to determine if ads are allowed on the current page
 * Based on AdSense policy compliance requirements
 * 
 * Ads are ONLY allowed on:
 * - Article detail pages (/articles/:id)
 * - About Us page (/about)
 * - FAQ page (/faq)
 * - Articles listing page (/articles)
 * 
 * Ads are PROHIBITED on:
 * - Homepage (/) - functional tool page
 * - Settings (/settings) - administrative page
 * - Privacy/Terms pages - legal pages
 * - Any empty states or loading screens
 */
export function useAdPage(): AdPageConfig {
    const location = useLocation();
    const pathname = location.pathname;

    const config = useMemo((): AdPageConfig => {
        // Administrative pages - NO ADS
        if (pathname === '/settings') {
            return {
                allowAds: false,
                recommendedPositions: [],
                maxAdsPerPage: 0,
            };
        }

        // Content pages and Home page - ALLOW ADS
        // This includes: /, /about, /faq, /articles, /articles/:id, /privacy-policy, /terms-of-service
        const contentPaths = ['/', '/about', '/faq', '/articles', '/privacy-policy', '/terms-of-service'];
        const isContentPage = contentPaths.includes(pathname) || pathname.startsWith('/articles/');

        if (isContentPage) {
            return {
                allowAds: true,
                recommendedPositions: ['inline'],
                maxAdsPerPage: 2,
            };
        }

        // Default: No ads for unknown pages or specific utility states
        return {
            allowAds: false,
            recommendedPositions: [],
            maxAdsPerPage: 0,
        };
    }, [pathname]);

    return config;
}
