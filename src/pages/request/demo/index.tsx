/**
 * @file demo.tsx
 * @description 데모 신청
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const NoAuthLayout = dynamic(() => import('~/components/common/layouts/templates/NonAuthLayout'), { ssr: false })
const DemoApply = dynamic(() => import('~/components/contents/demo'), {
  ssr: false,
})

export const DemoApplyPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <NoAuthLayout>
        <DemoApply />
      </NoAuthLayout>
    </ReCaptchaProvider>
  )
}

export default DemoApplyPage
DemoApplyPage.Layout = 'SSR'
