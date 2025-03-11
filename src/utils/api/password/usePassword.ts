/**
 * @file usePassword.ts
 */
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import { BaseResponseCommonObject, type ResetPasswordDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/pay/payrequest`
const queryNonUserKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/nouser/send/resetpassword`

type emailKey = string

interface userPasswordCheckType {
  id: number
  passwordInfo: ResetPasswordDto
  locale?: string
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiUserPasswordCheck = async ({
  id,
  passwordInfo,
  locale,
}: userPasswordCheckType): Promise<BaseResponseCommonObject> => {
  const { data } = await axios.put(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/auth/users/${id}/resetpassword`,
    {
      email: passwordInfo.email,
      newPassword: passwordInfo.newPassword,
      newPasswordConfirm: passwordInfo.newPasswordConfirm,
    }
  )
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiNonUserResetPassword = async (params: emailKey): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data: responseData } = await axios.post<BaseResponseCommonObject>(
    `${queryNonUserKey}`,
    { email: params },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ['X-Mediabee-Lang']: locale,
        ['Content-Type']: 'application/json',
      },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, emailKey: string>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, emailKey: string>}
 */
export const useNonUserResetPassword = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, emailKey>
): UseMutationResult<BaseResponseCommonObject, AxiosError, emailKey> => {
  return useMutation(apiNonUserResetPassword, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, emailKey: string>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, emailKey: string>}
 */
export const useUserPasswordCheck = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, userPasswordCheckType>
): UseMutationResult<BaseResponseCommonObject, AxiosError, userPasswordCheckType> => {
  return useMutation(apiUserPasswordCheck, options)
}
