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
        // Article detail pages - allow ads if substantial content
        if (pathname.startsWith('/articles/')) {
            return {
                allowAds: true,
                recommendedPositions: ['inline'],
                maxAdsPerPage: 2,
            };
        }

        // Articles listing page - allow one ad
        if (pathname === '/articles') {
            return {
                allowAds: true,
                recommendedPositions: ['inline'],
                maxAdsPerPage: 1,
            };
        }

        // About Us page - allow ads
        if (pathname === '/about') {
            return {
                allowAds: true,
                recommendedPositions: ['inline'],
                maxAdsPerPage: 1,
            };
        }

        // FAQ page - allow ads
        if (pathname === '/faq') {
            return {
                allowAds: true,
                recommendedPositions: ['inline'],
                maxAdsPerPage: 1,
            };
        }

        // All other pages - NO ADS (homepage, settings, privacy, terms, etc.)
        return {
            allowAds: false,
            recommendedPositions: [],
            maxAdsPerPage: 0,
        };
    }, [pathname]);

    return config;
}
