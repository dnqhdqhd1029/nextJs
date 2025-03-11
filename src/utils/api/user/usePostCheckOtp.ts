/**
 * @file usePostCheckOtp.ts
 * @description OTP 코드 확인
 */
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import { RequestConfirmUserOtpDto } from '~/types/api/service'
import { createAxiosAPI, createMutationHook } from '~/utils/common/helper'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/auth/users/check/otp`

export const apiPostCheckOtp = createAxiosAPI<RequestConfirmUserOtpDto>(request_otp_dto => ({
  url: queryKey,
  data: request_otp_dto,
  method: 'post',
}))

export const usePostCheckOtp = createMutationHook<RequestConfirmUserOtpDto>(apiPostCheckOtp)
