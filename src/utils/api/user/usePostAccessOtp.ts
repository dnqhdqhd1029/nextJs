/**
 * @file usePostAccessOtp.ts
 * @description OTP 코드 메일 발송
 */
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import { createAxiosAPI, createQueryHook } from '~/utils/common/helper'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/auth/users/send/otp`

export const apiPostAccessOtp = createAxiosAPI<string>(email => ({
  url: queryKey,
  data: { email: email },
  method: 'post',
}))

export const usePostAccessOtp = createQueryHook(() => [queryKey], apiPostAccessOtp)
