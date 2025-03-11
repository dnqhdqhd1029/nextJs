/**
 * @file search.tsx
 * @description 언론/미디어 - 목록
 */

import dynamic from 'next/dynamic'

const PressList = dynamic(() => import('~/components/contents/pressMedia/List/Search/Press'), {
  ssr: false,
})

export const PressListPage = () => {
  return <PressList />
}

export default PressListPage
