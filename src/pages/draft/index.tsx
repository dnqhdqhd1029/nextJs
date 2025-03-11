/**
 * @file press-release.tsx
 * @description 보도자료 배포
 */

import dynamic from 'next/dynamic'

const Draft = dynamic(() => import('~/components/contents/distribution/Draft'), {
  ssr: false,
})

export const DraftPage = () => {
  return <Draft />
}

export default DraftPage
DraftPage.Layout = 'LAYOUT1'
