/**
 * @file [code].tsx
 * @description 데모 로그인
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const Code = dynamic(() => import('~/components/contents/user/DemoSignIn/DemoSignIn'), { ssr: false })

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const DemoSignInPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <Code />
    </ReCaptchaProvider>
  )
}

export default DemoSignInPage
DemoSignInPage.Layout = 'SSR'
