/**
 * @file send-email.tsx
 * @description 비밀번호 찾기 이메일
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const SendEmail = dynamic(() => import('~/components/contents/member/SentPasswordEmail'), {
  ssr: false,
})

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const SendEmailPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ReporterLayout>
        <HeaderReport menuMain={true} />

        <div className="login-container">
          <SendEmail />
        </div>
      </ReporterLayout>
    </ReCaptchaProvider>
  )
}

export default SendEmailPage
SendEmailPage.Layout = 'BLANK'
