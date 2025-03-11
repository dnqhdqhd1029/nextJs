/**
 * @file monitoring/news-profile.tsx
 * @description 뉴스 프로필 페이지
 */

import dynamic from 'next/dynamic'

const NewsProfile = dynamic(() => import('~/components/contents/monitoring/News'), {
  ssr: false,
})

export const NewsProfilePage = () => {
  return <NewsProfile />
}

export default NewsProfilePage
NewsProfilePage.Layout = 'LAYOUT4'
