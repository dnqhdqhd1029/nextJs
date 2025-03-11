/**
 * @file news-tag.tsx
 * @description 뉴스 태그 관리
 */

import dynamic from 'next/dynamic'

const NewsTag = dynamic(() => import('~/components/contents/monitoring/tag'), {
  ssr: false,
})

export const NewsTagPage = () => {
  return <NewsTag />
}

export default NewsTagPage
