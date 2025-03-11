/**
 * @file index.tsx
 * @description 언론인 회원 로그인
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const JournalistLogin = dynamic(() => import('~/components/contents/member/login'), {
  ssr: false,
})

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const JournalistLoginPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ReporterLayout>
        <HeaderReport menuMain={true} />
        <div className="login-container">
          <JournalistLogin />
        </div>
      </ReporterLayout>
    </ReCaptchaProvider>
  )
}

export default JournalistLoginPage
JournalistLoginPage.Layout = 'BLANK'
