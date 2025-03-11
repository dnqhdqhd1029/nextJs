/**
 * @file clipbook.tsx
 * @description 클립북
 */

import dynamic from 'next/dynamic'

const ClipbookList = dynamic(() => import('~/components/contents/monitoring/Clipbook/Search'), {
  ssr: false,
})

export const ClipbookListPage = () => {
  return <ClipbookList />
}

export default ClipbookListPage
