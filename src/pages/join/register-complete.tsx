/**
 * @file register-complete.tsx
 * @description 회원가입- 프로필등록 완료
 */

import dynamic from 'next/dynamic'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const RegisterComplete = dynamic(() => import('~/components/contents/join/registerComplete'), {
  ssr: false,
})

export const RegisterCompletePage = () => {
  return (
    <>
      <ReporterLayout>
        <HeaderReport />
        <RegisterComplete />
      </ReporterLayout>
    </>
  )
}

export default RegisterCompletePage
RegisterCompletePage.Layout = 'BLANK'
