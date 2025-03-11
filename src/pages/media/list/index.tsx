/**
 * @file search.tsx
 * @description 언론/미디어 - 목록
 */

import dynamic from 'next/dynamic'

const MediaList = dynamic(() => import('~/components/contents/pressMedia/List/Search/Media'), {
  ssr: false,
})

export const MediaListPage = () => {
  return <MediaList />
}

export default MediaListPage
