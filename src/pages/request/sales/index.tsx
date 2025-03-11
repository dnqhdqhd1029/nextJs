/**
 * @file sales.tsx
 * @description 구매 상담
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const SalesConsult = dynamic(() => import('~/components/contents/sales'), {
  ssr: false,
})

export const SalesConsultPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <NoAuthLayout>
        <SalesConsult />
      </NoAuthLayout>
    </ReCaptchaProvider>
  )
}

export default SalesConsultPage
SalesConsultPage.Layout = 'SSR'
