/**
 * @file user-certification.tsx
 * @description 로그인 차단 해제용 인증 코드
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const UserCertification = dynamic(() => import('~/components/contents/member/UserCertification'), {
  ssr: false,
})

export const UserCertificationPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <UserCertification />
    </ReCaptchaProvider>
  )
}

export default UserCertificationPage
UserCertificationPage.Layout = 'BLANK'
