/**
 * @file reset-password.tsx
 * @description 비밀번호 재설정
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const ResetPassword = dynamic(() => import('~/components/contents/userSetting/ResetPassword'), {
  ssr: false,
})
export const ResetPasswordPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <NoAuthLayout>
        <ResetPassword />
      </NoAuthLayout>
    </ReCaptchaProvider>
  )
}

export default ResetPasswordPage
ResetPasswordPage.Layout = 'SSR'
