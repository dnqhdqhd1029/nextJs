/**
 * @file sent-password-email.tsx
 * @description 비밀번호 재설정 이메일 보냄
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const SentPasswordEmail = dynamic(() => import('~/components/contents/member/SentPasswordEmail'), {
  ssr: false,
})

export const SentPasswordEmaildPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <SentPasswordEmail />
    </ReCaptchaProvider>
  )
}

export default SentPasswordEmaildPage
SentPasswordEmaildPage.Layout = 'BLANK'
