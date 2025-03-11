/**
 * @file purchaseRequest.tsx
 * @description 구매 신청
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import PaymentLayout from '~/components/common/layouts/templates/PaymentLayout'
const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const PurchaseRequest = dynamic(() => import('~/components/contents/purchaseRequest'), {
  ssr: false,
})

export const PurchaseRequestPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <PaymentLayout>
        <PurchaseRequest />
      </PaymentLayout>
    </ReCaptchaProvider>
  )
}

export default PurchaseRequestPage
PurchaseRequestPage.Layout = 'PAYMENT'
