/**
 * @file add-news.tsx
 * @description 뉴스 추가
 */

import dynamic from 'next/dynamic'

const RegisterNews = dynamic(() => import('~/components/contents/monitoring/RegisterNews'), {
  ssr: false,
})

export const AddNewsPage = () => {
  return <RegisterNews />
}

export default AddNewsPage
AddNewsPage.Layout = 'LAYOUT3'
