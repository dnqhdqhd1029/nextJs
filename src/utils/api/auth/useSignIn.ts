/**
 * @file useSignIn.ts
 * @description 로그인 API
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

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject, LoginDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/auth/signin`

/**
 * 로그인
 * @param {LoginDto} data - 로그인 데이터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiSignIn = async (data: LoginDto): Promise<BaseResponseCommonObject> => {
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, data, {
    headers: { ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiSignOut = async (): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.get<BaseResponseCommonObject>(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/auth/signout`,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * 로그인 mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, LoginDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, LoginDto>}
 */
export const useSignIn = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, LoginDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, LoginDto> => {
  return useMutation(apiSignIn, options)
}

/**
 * Query hook
 * @param {number} id - 미디어 id
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useUserSignOut = (
  id: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'apiSignOut' + id],
    queryFn: () => apiSignOut(),
    ...options,
  })
}
