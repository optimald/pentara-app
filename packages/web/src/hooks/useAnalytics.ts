import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { pageview, trackPageView } from '../lib/analytics';

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
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

  return {
    trackPageView,
    trackEvent: (eventName: string, properties?: Record<string, any>) => {
      // This will be imported from analytics.ts
      const { trackEvent } = require('../lib/analytics');
      trackEvent(eventName, properties);
    },
    identifyUser: (userId: string, properties?: Record<string, any>) => {
      const { identifyUser } = require('../lib/analytics');
      identifyUser(userId, properties);
    },
    trackConversion: (conversionType: string, value?: number, properties?: Record<string, any>) => {
      const { trackConversion } = require('../lib/analytics');
      trackConversion(conversionType, value, properties);
    },
    trackEngagement: (action: string, properties?: Record<string, any>) => {
      const { trackEngagement } = require('../lib/analytics');
      trackEngagement(action, properties);
    },
    trackPlausible: (eventName: string, properties?: Record<string, any>) => {
      const { trackPlausible } = require('../lib/analytics');
      trackPlausible(eventName, properties);
    },
    trackCustomEvent: (eventName: string, properties?: Record<string, any>) => {
      const { trackCustomEvent } = require('../lib/analytics');
      trackCustomEvent(eventName, properties);
    }
  };
};
