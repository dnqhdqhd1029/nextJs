/**
 * @file usePutUserResetPassword.ts
 * @description 사용자 비밀번호 재설정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject, ResetPasswordDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutUserResetPasswordParams {
  id: number
  passwordInfo: ResetPasswordDto
  locale?: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/auth/users`
const afterQuery = '/resetpassword'

/**
 * Axios API
 * @param {UsePutUserResetPasswordParams} { id, userInfo } - id, 사용자 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutUserResetPassword = async ({
  id,
  passwordInfo,
  locale,
}: UsePutUserResetPasswordParams): Promise<BaseResponseCommonObject> => {
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(
    `${queryKey}/${id}${afterQuery}`,
    passwordInfo,
    {
      headers: { ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Axios API(Internal)
 * @param {UsePutUserResetPasswordParams} { id, userInfo } - id, 사용자 정보
 */
export const apiInternalPutUserResetPassword = async ({ id, passwordInfo, locale }: UsePutUserResetPasswordParams) => {
  return await axios.put(`/api/put/reset-user-password/${id}`, { id, passwordInfo, locale })
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserResetPasswordParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserResetPasswordParams>}
 */
export const usePutUserResetPassword = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserResetPasswordParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserResetPasswordParams> => {
  return useMutation(apiPutUserResetPassword, options)
}
