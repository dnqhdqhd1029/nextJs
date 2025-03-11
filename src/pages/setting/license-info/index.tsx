/**
 * @file license-info.tsx
 * @description 설정 - 사용권 - 사용권 정보
 */

import dynamic from 'next/dynamic'

const LicenseInfo = dynamic(() => import('~/components/contents/setting/MyLicense'), {
  ssr: false,
})

export const LicenseInfoPage = () => {
  return <LicenseInfo />
}

export default LicenseInfoPage
LicenseInfoPage.Layout = 'LAYOUT1'
