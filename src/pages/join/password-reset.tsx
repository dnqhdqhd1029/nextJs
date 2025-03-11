/**
 * @file password-reset.tsx
 * @description 회원가입- 비밀번호 변경
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const PasswordReset = dynamic(() => import('~/components/contents/join/passwordReset'), {
  ssr: false,
})

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const PasswordResetPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ReporterLayout>
        <HeaderReport />
        <PasswordReset />
      </ReporterLayout>
    </ReCaptchaProvider>
  )
}

export default PasswordResetPage
PasswordResetPage.Layout = 'BLANK'
