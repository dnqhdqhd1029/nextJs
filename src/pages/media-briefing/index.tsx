/**
 * @file briefing.tsx
 * @description 언론/미디어 - 미디어 소식
 */

import dynamic from 'next/dynamic'

const PressBriefing = dynamic(() => import('~/components/contents/pressMedia/MediaBriefing/List'), {
  ssr: false,
})

export const PressBriefingPage = () => {
  return <PressBriefing />
}

export default PressBriefingPage
PressBriefingPage.Layout = 'LAYOUT4'
