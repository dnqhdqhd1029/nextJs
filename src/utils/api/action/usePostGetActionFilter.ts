/**
 * @file usePostGetActionFilter.ts
 * @description 활동 조회 필터 가져오기
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
import type { BaseResponseCommonObject, RequestActionDto } from '~/types/api/service'
import { apiGetOneUser } from '~/utils/api/user/useGetOneUser'
import axios from '~/utils/common/axios'

export type FilterType = {
  groupId: number
  timezone?: string
  periodStartYear?: string
  periodStartMonth?: string
  periodStartDay?: string
  periodEndYear?: string
  periodEndMonth?: string
  periodEndDay?: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/action/filter`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostGetActionFilter = async (params: FilterType): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, FilterType>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, FilterType>}
 */
export const usePostGetActionFilter = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, FilterType>
): UseMutationResult<BaseResponseCommonObject, AxiosError, FilterType> => {
  return useMutation(apiPostGetActionFilter, options)
}

/**
 * Query hook
 * @param {FilterType} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetActionFilter = (
  params: FilterType,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, '' + params.groupId],
    queryFn: () => apiPostGetActionFilter(params),
    ...options,
  })
}
