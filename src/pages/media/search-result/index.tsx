/**
 * @file search-[id].tsx
 * @description 검색 결과 페이지
 */

import dynamic from 'next/dynamic'

const PressMediaSearchResult = dynamic(() => import('~/components/contents/pressMedia/SearchResult'), {
  ssr: false,
})

export const SearchResultPage = () => {
  return <PressMediaSearchResult />
}

export default SearchResultPage
