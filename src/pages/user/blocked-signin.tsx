/**
 * @file blocked-signin.tsx
 * @description 로그인 차단됨
 */

import dynamic from 'next/dynamic'

const BlockedSignIn = dynamic(() => import('~/components/contents/user/BlockedSignIn'), {
  ssr: false,
})

export const BlockedSignInPage = () => {
  return <BlockedSignIn />
}

export default BlockedSignInPage
BlockedSignInPage.Layout = 'BLANK'
