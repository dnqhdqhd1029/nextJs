/**
 * @file first-register-user.tsx
 * @description 회원정보
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const AddRegisterUser = dynamic(() => import('~/components/contents/userSetting/AddRegisterUser'), {
  ssr: false,
})

export const FirstRegisterUserPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <NoAuthLayout>
        <AddRegisterUser />
      </NoAuthLayout>
    </ReCaptchaProvider>
  )
}

export default FirstRegisterUserPage
FirstRegisterUserPage.Layout = 'SSR'
