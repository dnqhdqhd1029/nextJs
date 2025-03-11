/**
 * @file landingpage.tsx
 */

import dynamic from 'next/dynamic'

const LandingPage = dynamic(() => import('~/components/contents/setting/System/LandingPage'), {
  ssr: false,
})

export const LandingPageLayout = () => {
  return <LandingPage />
}

export default LandingPageLayout
LandingPageLayout.Layout = 'LAYOUT1'
