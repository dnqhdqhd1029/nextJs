/**
 * @file useBlockUserAction.ts
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestActionDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/blockeduser`

export interface UnBlockedUserParams {
  blockedUserId: number
  title: string
  content: string
}

/**
 * Axios API
 * @param {string} paramKey - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiBlockUserCheckAction = async (paramKey: string): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  console.log('accessToken', accessToken)

  const { data: responseData } = await axios.post<BaseResponseCommonObject>(
    `${queryKey}/info`,
    { email: paramKey },
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, string>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, string>}
 */
export const useBlockUserCheckAction = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, string>
): UseMutationResult<BaseResponseCommonObject, AxiosError, string> => {
  return useMutation(apiBlockUserCheckAction, options)
}

/**
 * Axios API
 * @param {UnBlockedUserParams} paramKey - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiUnBlockedUserCheckAction = async (paramKey: UnBlockedUserParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  console.log('accessToken', accessToken)

  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}/unblock`, paramKey, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UnBlockedUserParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UnBlockedUserParams>}
 */
export const useUnBlockedUserCheckAction = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UnBlockedUserParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UnBlockedUserParams> => {
  return useMutation(apiUnBlockedUserCheckAction, options)
}
