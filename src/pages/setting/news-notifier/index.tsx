/**
 * @file news-notifier.tsx
 * @description 설정 - 회원 - 뉴스 알리미
 */

import dynamic from 'next/dynamic'

const NewsAlerts = dynamic(() => import('~/components/contents/setting/System/NewsAlerts'), {
  ssr: false,
})

export const NewsAlertsPage = () => {
  return <NewsAlerts />
}

export default NewsAlertsPage
NewsAlertsPage.Layout = 'LAYOUT1'
