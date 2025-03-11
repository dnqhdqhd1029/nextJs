/**
 * @file register.tsx
 * @description 회원가입- 등록
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const Register = dynamic(() => import('~/components/contents/join/register'), {
  ssr: false,
})

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const RegisterPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ReporterLayout>
        <HeaderReport />
        <Register />
      </ReporterLayout>
    </ReCaptchaProvider>
  )
}

export default RegisterPage
RegisterPage.Layout = 'BLANK'
