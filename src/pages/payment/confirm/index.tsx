/**
 * @file Confirm.tsx
 * @description 결제 정보 확인
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import PaymentLayout from '~/components/common/layouts/templates/PaymentLayout'
const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const PaymentConfirm = dynamic(() => import('~/components/contents/payment/PaymentConfirm/PaymentConfirm'), {
  ssr: false,
})

export const PaymentConfirmPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <PaymentLayout downloadButton={true}>
        <PaymentConfirm />
      </PaymentLayout>
    </ReCaptchaProvider>
  )
}

export default PaymentConfirmPage
PaymentConfirmPage.Layout = 'SSR'
