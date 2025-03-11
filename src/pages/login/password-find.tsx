/**
 * @file password-find.tsx
 * @description 비밀번호 찾기
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const PasswordFind = dynamic(() => import('~/components/contents/member/ResetPassword'), {
  ssr: false,
})

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const PasswordFindPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ReporterLayout>
        <HeaderReport menuMain={true} />

        <div className="login-container">
          <PasswordFind />
        </div>
      </ReporterLayout>
    </ReCaptchaProvider>
  )
}

export default PasswordFindPage
PasswordFindPage.Layout = 'BLANK'
