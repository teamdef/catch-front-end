export const GA_TRACKING_ID = 'G-8WXK1EYMN1'; // 측정ID 설정: .env 파일로 관리해도된다.

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
    action,
    category,
    label,
    value
}) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};