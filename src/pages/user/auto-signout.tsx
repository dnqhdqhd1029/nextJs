/**
 * @file auto-logout.tsx
 * @description 자동 로그아웃
 */

import dynamic from 'next/dynamic'

const AutoSignOut = dynamic(() => import('~/components/contents/user/AutoSignOut'), {
  ssr: false,
})

export const AutoSignOutPage = () => {
  return <AutoSignOut />
}

export default AutoSignOutPage
AutoSignOutPage.Layout = 'LOGOONLY'
