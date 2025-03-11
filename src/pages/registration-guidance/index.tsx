/**
 * @file registration-guidance.tsx
 * @description 회원 가입
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const RegistrationGuidance = dynamic(() => import('~/components/contents/userSetting/RegistrationGuidance'), {
  ssr: false,
})

export const RegistrationGuidancePage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <NoAuthLayout>
        <RegistrationGuidance />
      </NoAuthLayout>
    </ReCaptchaProvider>
  )
}

export default RegistrationGuidancePage
RegistrationGuidancePage.Layout = 'SSR'
