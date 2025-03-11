/**
 * @file send-auth-email.tsx
 * @description 인증 메일 발송 안내
 */

import dynamic from 'next/dynamic'

const SendAuthEmail = dynamic(() => import('~/components/contents/user/SendAuthEmail'), {
  ssr: false,
})

export const SendAuthEmailPage = () => {
  return <SendAuthEmail />
}

export default SendAuthEmailPage
SendAuthEmailPage.Layout = 'LOGOONLY'
