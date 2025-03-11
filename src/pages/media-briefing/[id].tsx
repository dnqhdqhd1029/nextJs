/**
 * @file briefing.tsx
 * @description 언론/미디어 - 미디어 소식
 */

import dynamic from 'next/dynamic'

const PressBriefingDetail = dynamic(() => import('~/components/contents/pressMedia/MediaBriefing/Detail'), {
  ssr: false,
})

export const PressBriefingDetailPage = () => {
  return <PressBriefingDetail />
}

export default PressBriefingDetailPage
PressBriefingDetailPage.Layout = 'LAYOUT4'
