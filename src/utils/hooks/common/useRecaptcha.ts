import { useState } from 'react'
import { useReCaptcha } from 'next-recaptcha-v3'

import axios from '~/utils/common/axios'

interface Props {
  minScore?: number
}

export const useRecaptcha = ({ minScore = 0.3 }: Props) => {
  const { executeRecaptcha } = useReCaptcha()
  const [v2Token, setV2Token] = useState<string | null>(null)
  const [isV3Failed, setIsV3Failed] = useState(false)

  const textRecaptchaV3 = async (action?: string) => {
    const token = await executeRecaptcha(action ?? 'submit')
    // console.log('token', token)
    const { data: recaptchaResponse } = await axios.post('/api/post/verify-recaptcha', {
      token,
      type: 'v3',
    })
    const { success, score } = recaptchaResponse

    // console.log('>> recaptchaResponse', recaptchaResponse, minScore, score >= minScore)

    if (success) {
      // 리캡챠 테스트 성공
      return score >= minScore
    } else {
      return false
    }
  }

  const testRecaptchaV2 = async (token: string) => {
    if (!token) {
      return
    }

    const { data: recaptchaResponse } = await axios.post('/api/post/verify-recaptcha', {
      token,
      type: 'v2',
    })
    const { success } = recaptchaResponse

    // console.log('>> v2 recaptchaResponse', recaptchaResponse)

    return !!success
  }

  return {
    isV3Failed,
    setIsV3Failed,
    v2Token,
    setV2Token,
    textRecaptchaV3,
    testRecaptchaV2,
  }
}
