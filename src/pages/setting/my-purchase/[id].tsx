/**
 * @file my-purchase.tsx
 * @description 설정 - 사용권 - 내 구매 상세
 */

import dynamic from 'next/dynamic'

const MyLicenseDetail = dynamic(() => import('~/components/contents/setting/MyPurchaseDetail'), {
  ssr: false,
})

export const MyLicensePage = () => {
  return <MyLicenseDetail />
}

export default MyLicensePage
MyLicensePage.Layout = 'LAYOUT1'
