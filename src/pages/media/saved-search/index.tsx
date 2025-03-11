/**
 * @file management.tsx
 * @description 맞춤 검색 - 결과 목록
 */

import dynamic from 'next/dynamic'

const PressMediaCustomSearch = dynamic(() => import('~/components/contents/pressMedia/SavedSearch'), {
  ssr: false,
})

export const PressMediaCustomSearchPage = () => {
  return <PressMediaCustomSearch />
}

export default PressMediaCustomSearchPage
