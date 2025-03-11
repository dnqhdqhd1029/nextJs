/**
 * @file index.tsx
 * @description 회원가입- 신청
 */

import dynamic from 'next/dynamic'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import HeaderReport from '~/components/common/layouts/HeaderReporter'
import ReporterLayout from '~/components/common/layouts/templates/ReporterLayout'

const Apply = dynamic(() => import('~/components/contents/join/apply'), {
  ssr: false,
})

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const ApplyPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ReporterLayout>
        <HeaderReport />
        <Apply />
      </ReporterLayout>
    </ReCaptchaProvider>
  )
}

export default ApplyPage
ApplyPage.Layout = 'BLANK'
