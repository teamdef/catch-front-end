export const GA_TRACKING_ID = 'G-8WXK1EYMN1'; // 측정ID 설정: .env 파일로 관리해도된다.
export const GTM_ID = 'GTM-M5PGN9B';
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
interface EventType {
  action: string;
  category: string;
  label: string;
  value: number;
}
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: EventType) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
