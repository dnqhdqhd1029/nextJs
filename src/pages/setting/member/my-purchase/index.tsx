/**
 * @file profile.tsx
 */

import dynamic from 'next/dynamic'

const MemberPurchase = dynamic(() => import('~/components/contents/setting/Member/MyPurchase'), {
  ssr: false,
})

export const MemberPurchasePage = () => {
  return <MemberPurchase />
}

export default MemberPurchasePage
MemberPurchasePage.Layout = 'LAYOUT1'
