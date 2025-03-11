/**
 * @file member.tsx
 * @description 회원정보
 */

import dynamic from 'next/dynamic'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const MemberInfo = dynamic(() => import('~/components/contents/member'), {
  ssr: false,
})

export const MemberInfoPage = () => {
  return (
    <>
      <ReporterLayout>
        <HeaderReport menuReporter={true} />
        <MemberInfo />
      </ReporterLayout>
    </>
  )
}

export default MemberInfoPage
MemberInfoPage.Layout = 'BLANK'
