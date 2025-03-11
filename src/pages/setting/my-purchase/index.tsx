/**
 * @file my-purchase.tsx
 * @description 설정 - 사용권 - 내 구매
 */

import dynamic from 'next/dynamic'

const MyLicense = dynamic(() => import('~/components/contents/setting/MyPurchase'), {
  ssr: false,
})

export const MyLicensePage = () => {
  return <MyLicense />
}

export default MyLicensePage
MyLicensePage.Layout = 'LAYOUT1'
