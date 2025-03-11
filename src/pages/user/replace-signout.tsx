/**
 * @file replace-logout.tsx
 * @description 동시접속 자동 로그아웃
 */

import dynamic from 'next/dynamic'

const ReplaceSignOut = dynamic(() => import('~/components/contents/user/ReplaceSignOut'), {
  ssr: false,
})

export const ReplaceSignOutPage = () => {
  return <ReplaceSignOut />
}

export default ReplaceSignOutPage
ReplaceSignOutPage.Layout = 'LOGOONLY'
