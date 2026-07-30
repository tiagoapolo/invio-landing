type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, string>>;
};

export function trackMarketingCta(event: string, location: string) {
  const detail = { event, location };
  (window as AnalyticsWindow).dataLayer?.push(detail);
  window.dispatchEvent(new CustomEvent("invio:analytics", { detail }));
}
