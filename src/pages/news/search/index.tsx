/**
 * @file search-news.tsx
 * @description 뉴스 검색
 */

import dynamic from 'next/dynamic'

const SearchNews = dynamic(() => import('~/components/contents/monitoring/Search'), {
  ssr: false,
})

export const SearchNewsPage = () => {
  return <SearchNews />
}

export default SearchNewsPage
SearchNewsPage.Layout = 'LAYOUT1'
