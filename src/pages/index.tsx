/**
 * @file home.tsx
 * @description 홈 페이지
 */
import { useLayoutEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

const HomePage = () => {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  return (
    <ReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <h1>외부 페이지</h1>
        <br />
        <br />
        <br />
        <Link href={'/publishing/guide'}>
          <a
            style={{
              color: '#0094a8',
              textDecoration: 'underline',
              display: 'inline-block',
            }}
          >
            가이드
          </a>
        </Link>
        <br />
        <br />
        <br />

      </div>
    </ReCaptchaProvider>
  )
}

export default HomePage
HomePage.Layout = 'LAYOUT4'
