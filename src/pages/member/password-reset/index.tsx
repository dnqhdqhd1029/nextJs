/**
 * @file reset-password.tsx
 * @description 비밀번호 찾기
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const ResetPassword = dynamic(() => import('~/components/contents/member/ResetPassword'), {
  ssr: false,
})

export const ResetPasswordPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ResetPassword />
    </ReCaptchaProvider>
  )
}

export default ResetPasswordPage
ResetPasswordPage.Layout = 'BLANK'
