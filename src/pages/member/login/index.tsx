/**
 * @file SignInPage.tsx
 * @description 페이지 설명
 */

import { useLayoutEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import LoginLayout from '~/components/common/layouts/templates/LoginLayout'

// Add type definition for LoginLayout
type LoginLayoutProps = {
  children: React.ReactNode
}

const SignIn = dynamic(() => import('~/components/contents/member/login'), { ssr: false })

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

export const SignInPage = () => {
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <h1>외부 페이지</h1>
        <br />
        <br />
        <br />
        <Link href={'/demo'}>
          <a
            style={{
              color: '#0094a8',
              textDecoration: 'underline',
              display: 'inline-block',
            }}
          >
            데모 신청
          </a>
        </Link>
      </div>
    </ReCaptchaProvider>
  )
}

export default SignInPage
SignInPage.Layout = 'BLANK'
