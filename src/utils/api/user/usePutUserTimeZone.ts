/**
 * @file usePutUserTimeZone.ts
 * @description 사용자 표준 시간대 설정
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
import type { BaseResponseCommonObject, ModifyUserTimezoneDto } from '~/types/api/service'
import { apiGetCommonCode, UseGetCommonCodeParams } from '~/utils/api/common/useGetCommonCode'
import axios from '~/utils/common/axios'

export interface UsePutUserTimeZoneParams {
  id: number
  info: ModifyUserTimezoneDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users/timezone`

/**
 * Axios API
 * @param {UsePutUserTimeZoneParams} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutUserTimeZone = async ({ id, info }: UsePutUserTimeZoneParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, info, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @param {number} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetUserTimeZone = async (params: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.get<BaseResponseCommonObject>(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/users/${params}`,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserTimeZoneParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserTimeZoneParams>}
 */
export const usePutUserTimeZone = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserTimeZoneParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserTimeZoneParams> => {
  return useMutation(apiPutUserTimeZone, options)
}

/**
 * Query hook
 * @param {number} param - 코드명
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetUserTimeZone = (
  param: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'usePutUserTimeZone' + param],
    queryFn: () => apiGetUserTimeZone(param),
    enabled: param > 0,
    ...options,
  })
}
