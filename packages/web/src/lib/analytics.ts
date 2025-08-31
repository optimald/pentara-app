import mixpanel from 'mixpanel-browser';

// Google Analytics configuration
export const GA_TRACKING_ID = 'G-67S63E3C14';

// Mixpanel configuration
export const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '';

// Initialize Mixpanel
if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage'
  });
}

// Google Analytics page view tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Google Analytics event tracking
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Mixpanel event tracking
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.track(eventName, properties);
  }
};

// Mixpanel user identification
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.identify(userId);
    if (properties) {
      mixpanel.people.set(properties);
    }
  }
};

// Mixpanel page view tracking
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.track('Page Viewed', {
      page_name: pageName,
      ...properties
    });
  }
};

// Track conversion events
export const trackConversion = (conversionType: string, value?: number, properties?: Record<string, any>) => {
  // Google Analytics
  event({
    action: 'conversion',
    category: 'engagement',
    label: conversionType,
    value: value
  });

  // Mixpanel
  trackEvent('Conversion', {
    conversion_type: conversionType,
    value: value,
    ...properties
  });
};

// Track user engagement
export const trackEngagement = (action: string, properties?: Record<string, any>) => {
  // Google Analytics
  event({
    action: action,
    category: 'engagement',
    label: properties?.label
  });

  // Mixpanel
  trackEvent('User Engagement', {
    action: action,
    ...properties
  });

  // Plausible
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('User Engagement', {
      props: {
        action: action,
        ...properties
      }
    });
  }
};

// Plausible Analytics tracking
export const trackPlausible = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, {
      props: properties
    });
  }
};

// Track custom events across all platforms
export const trackCustomEvent = (eventName: string, properties?: Record<string, any>) => {
  // Google Analytics
  event({
    action: eventName,
    category: 'custom',
    label: properties?.label
  });

  // Mixpanel
  trackEvent(eventName, properties);

  // Plausible
  trackPlausible(eventName, properties);
};
