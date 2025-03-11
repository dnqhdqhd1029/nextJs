/**
 * @file withdrawal.tsx
 * @description 회원정보 - 회원탈퇴
 */

import dynamic from 'next/dynamic'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const MemberWithdrawal = dynamic(() => import('~/components/contents/member/withdrawal'), {
  ssr: false,
})

export const MemberWithdrawalPage = () => {
  return (
    <>
      <ReporterLayout>
        <HeaderReport menuReporter={true} />
        <MemberWithdrawal />
      </ReporterLayout>
    </>
  )
}

export default MemberWithdrawalPage
MemberWithdrawalPage.Layout = 'BLANK'
