/**
 * @file usePutUser.ts
 * @description 사용자 정보 수정(관리자만 가능)
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyUserDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutUserParams {
  id: number
  userInfo: ModifyUserDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users`

/**
 * Axios API
 * @param {UsePutUserParams} { id, userInfo } - id, 사용자 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutUser = async ({ id, userInfo }: UsePutUserParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, userInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutDashboardUser = async (params: {
  id: number
  dashboard: string
}): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/dashboard/users/${params.id}`,
    { dashboard: params.dashboard },
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Mutation hook
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, {id: number, dashboard: string}>}
 */
export const usePutDashboardUser = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, { id: number; dashboard: string }>
): UseMutationResult<BaseResponseCommonObject, AxiosError, { id: number; dashboard: string }> => {
  return useMutation(apiPutDashboardUser, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserParams>}
 */
export const usePutUser = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserParams> => {
  return useMutation(apiPutUser, options)
}
