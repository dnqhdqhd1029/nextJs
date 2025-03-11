/**
 * @file register-user-info.tsx
 * @description 이메일 인증한 사용자 정보 등록
 */
import { FormEvent, FormEventHandler, useCallback, useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Cookie from 'js-cookie'
import { set } from 'lodash'
import dynamic from 'next/dynamic'
import { useReCaptcha } from 'next-recaptcha-v3'

import axios from '~/utils/common/axios'

const Layout = dynamic(() => import('~/components/common/layouts/templates/Layout'), { ssr: false })

export const RegisterUserInfoPage = () => {
  const [name, setName] = useState('')
  const { executeRecaptcha } = useReCaptcha()
  const [v2Token, setV2Token] = useState<string | null>(null)
  const [isV3Failed, setIsV3Failed] = useState(false)

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const token = await executeRecaptcha('form_submit')

      const { data: recaptchaResponse } = await axios.post('/api/post/verify-recaptcha', {
        token,
        type: 'v3',
      })
      const { success, score } = recaptchaResponse

      console.log('>> recaptchaResponse', recaptchaResponse)

      if (success) {
        // 리캡챠 테스트 성공
        if (score < 1) {
          console.log('1점 이하입니다.')
          setIsV3Failed(true)
        }
      } else {
        // 리캡챠 테스트 실패
        console.log('>> v3 failed')
        setIsV3Failed(true)
      }
    },
    [executeRecaptcha, name]
  )

  const testRecaptchaV2 = async (token: string) => {
    if (!token) return

    const { data: recaptchaResponse } = await axios.post('/api/post/verify-recaptcha', {
      token,
      type: 'v2',
    })
    const { success } = recaptchaResponse

    console.log('>> v2 recaptchaResponse', recaptchaResponse)

    if (success) {
      console.log('>> v2 success')
    } else {
      console.log('>> v2 failed')
    }
  }

  useEffect(() => {
    if (v2Token) {
      setTimeout(() => {
        setIsV3Failed(false)
        testRecaptchaV2(v2Token)
      }, 650)
    }
  }, [v2Token])

  return (
    <Layout noLoginHeader>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          type="submit"
          style={{ border: '1px solid red' }}
        >
          Submit
        </button>
      </form>

      {isV3Failed && (
        <div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <ReCAPTCHA
            size="normal"
            sitekey="6LfUteUpAAAAAGSG8S7Mgdi3RUcYlThALm3Pe66m"
            onChange={token => setV2Token(token)}
          />
        </div>
      )}
    </Layout>
  )
}

export default RegisterUserInfoPage
RegisterUserInfoPage.Layout = 'SSR'
