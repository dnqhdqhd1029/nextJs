/**
 * @file pw-out-of-time.tsx
 * @description 기간이 만료된 비밀번호 재설정 페이지
 */

import dynamic from 'next/dynamic'

const ResetPasswordOutOfTime = dynamic(
  () => import('~/components/contents/user/ResetPassword/ResetPasswordOutOfTime'),
  {
    ssr: false,
  }
)

export const ResetPasswordOutOfTimePage = () => {
  return <ResetPasswordOutOfTime />
}

export default ResetPasswordOutOfTimePage
ResetPasswordOutOfTimePage.Layout = 'LOGOONLY'
