/**
 * @file search.tsx
 * @description 언론 - 목록
 */

import dynamic from 'next/dynamic'

const PressMediaListResultList = dynamic(() => import('~/components/contents/pressMedia/List/Result'), {
  ssr: false,
})

export const PressMediaListPage = () => {
  return <PressMediaListResultList />
}

export default PressMediaListPage
