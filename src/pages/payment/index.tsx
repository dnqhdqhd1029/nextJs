/**
 * @file register-payment-info.tsx
 * @description 결제 정보 입력
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import PaymentLayout from '~/components/common/layouts/templates/PaymentLayout'
const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const Payment = dynamic(() => import('~/components/contents/payment'), {
  ssr: false,
})

export const PaymentPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <PaymentLayout downloadButton={true}>
        <Payment />
      </PaymentLayout>
    </ReCaptchaProvider>
  )
}

export default PaymentPage
PaymentPage.Layout = 'SSR'
