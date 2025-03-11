/**
 * @file login-blocked.tsx
 * @description 로그인 차단
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const LoginBlocked = dynamic(() => import('~/components/contents/member/LoginBlocked'), {
  ssr: false,
})

export const LoginBlockedPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <LoginBlocked />
    </ReCaptchaProvider>
  )
}

export default LoginBlockedPage
LoginBlockedPage.Layout = 'BLANK'
