/**
 * @file search-news/[id].tsx
 * @description 뉴스 검색 결과
 */

import dynamic from 'next/dynamic'

const SearchNewsResult = dynamic(() => import('~/components/contents/monitoring/SearchResult'), {
  ssr: false,
})

export const SearchNewsResultPage = () => {
  return <SearchNewsResult />
}

export default SearchNewsResultPage
