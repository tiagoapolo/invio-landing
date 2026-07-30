type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  invioLastPageView?: string;
};

const measurementId = "G-K6BXVEHZKV";

export type AnalyticsParameters = Record<string, string | number | boolean>;

export function initializeAnalytics() {
  const analyticsWindow = window as AnalyticsWindow;

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = analyticsWindow.gtag || ((...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args);
  });

  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", measurementId, { send_page_view: false });

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
  }
}

export function trackPageView(title: string) {
  const analyticsWindow = window as AnalyticsWindow;
  const pagePath = `${window.location.pathname}${window.location.search}`;

  if (analyticsWindow.invioLastPageView === pagePath) return;
  analyticsWindow.invioLastPageView = pagePath;

  analyticsWindow.gtag?.("event", "page_view", {
    page_title: title,
    page_location: window.location.href,
    page_path: pagePath,
  });
}

export function trackEvent(event: string, parameters: AnalyticsParameters = {}) {
  (window as AnalyticsWindow).gtag?.("event", event, parameters);
}

export function trackMarketingCta(event: string, location: string) {
  const detail = { event, location };
  trackEvent(event, { cta_location: location });
  window.dispatchEvent(new CustomEvent("invio:analytics", { detail }));
}
