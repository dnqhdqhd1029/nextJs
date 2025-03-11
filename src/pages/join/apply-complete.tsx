/**
 * @file apply-complete.tsx
 * @description 회원가입- 가입신청 완료
 */

import dynamic from 'next/dynamic'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const ApplyComplete = dynamic(() => import('~/components/contents/join/applyComplete'), {
  ssr: false,
})

export const ApplyCompletePage = () => {
  return (
    <>
      <ReporterLayout>
        <HeaderReport />
        <ApplyComplete />
      </ReporterLayout>
    </>
  )
}

export default ApplyCompletePage
ApplyCompletePage.Layout = 'BLANK'
