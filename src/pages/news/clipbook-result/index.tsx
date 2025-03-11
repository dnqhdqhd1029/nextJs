/**
 * @file clipbook.tsx
 * @description 클립북
 */

import dynamic from 'next/dynamic'

const ClipbookResultList = dynamic(() => import('~/components/contents/monitoring/Clipbook/Result'), {
  ssr: false,
})

export const ClipbookListPage = () => {
  return <ClipbookResultList />
}

export default ClipbookListPage
