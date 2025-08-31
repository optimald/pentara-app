'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { pageview, trackPageView } from '../lib/analytics';

export default function Analytics() {
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleRouteChange = (url: string) => {
      // Google Analytics page view
      pageview(url);
      
      // Mixpanel page view
      const pageName = url === '/' ? 'Home' : url.split('/').pop() || 'Unknown';
      trackPageView(pageName, {
        url: url,
        referrer: document.referrer
      });
    };

    // Track initial page load
    handleRouteChange(router.asPath);

    // Track route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.asPath]);

  // This component doesn't render anything
  return null;
}
