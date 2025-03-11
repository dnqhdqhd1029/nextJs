/**
 * @file profile.tsx
 */

import dynamic from 'next/dynamic'

const MemberInformation = dynamic(() => import('~/components/contents/setting/Member/Main'), {
  ssr: false,
})

export const MemberInformationPage = () => {
  return <MemberInformation />
}

export default MemberInformationPage
MemberInformationPage.Layout = 'LAYOUT1'
