/**
 * @file additional-services.tsx
 * @description 부가 서비스 구매
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import PaymentLayout from '~/components/common/layouts/templates/PaymentLayout'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const AdditionalServices = dynamic(() => import('~/components/contents/additionalServices'), {
  ssr: false,
})

export const AdditionalServicesPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <PaymentLayout>
        <AdditionalServices />
      </PaymentLayout>
    </ReCaptchaProvider>
  )
}

export default AdditionalServicesPage
AdditionalServicesPage.Layout = 'PAYMENT'
