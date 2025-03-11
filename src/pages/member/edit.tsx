/**
 * @file edit.tsx
 * @description 회원정보 - 회원정보 수정
 */

import dynamic from 'next/dynamic'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const MemberEdit = dynamic(() => import('~/components/contents/member/edit'), {
  ssr: false,
})

export const MemberEditPage = () => {
  return (
    <>
      <ReporterLayout>
        <HeaderReport menuReporter={true} />
        <MemberEdit />
      </ReporterLayout>
    </>
  )
}

export default MemberEditPage
MemberEditPage.Layout = 'BLANK'
