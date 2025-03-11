/**
 * @file usePostRefreshToken.ts
 * @description 리프레쉬 토큰 발급 API
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

type tokenProps = string
const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/auth/refreshtoken`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostRefreshToken = async (): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  console.log('accessToken', accessToken)
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, undefined, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostRefreshTokenByToken = async (tokenProps: string): Promise<BaseResponseCommonObject> => {
  console.log('tokenProps', tokenProps)
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, undefined, {
    headers: { Authorization: `Bearer ${tokenProps}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, void>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, void>}
 */
export const usePostRefreshToken = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, void>
): UseMutationResult<BaseResponseCommonObject, AxiosError, void> => {
  return useMutation(apiPostRefreshToken, options)
}
/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, void, token: string>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, void>}
 */
export const usePostRefreshTokenByToken = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, tokenProps>
): UseMutationResult<BaseResponseCommonObject, AxiosError, tokenProps> => {
  return useMutation(apiPostRefreshTokenByToken, options)
}
