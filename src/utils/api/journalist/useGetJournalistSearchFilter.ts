/**
 * @file useGetJournalistSearchFilter.ts
 * @description Elasticsearch 언론인 필터
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
import type { BaseResponseCommonObject } from '~/types/api/service'
import { apiGetMediaFieldType, UseGetMediaTypeParams } from '~/utils/api/media/useGetMediaFieldType'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/elastic/journalist/filter`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetJournalistSearchFilter = async (): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Journalistbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetJournalistSearchFilter = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseMutationResult<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject> => {
  return useMutation(apiGetJournalistSearchFilter, options)
}

/**
 * Query hook
 * @param {UseGetMediaTypeParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetJournalistSearchFilterData = (
  params: string,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'apiGetJournalistSearchFilter' + params],
    queryFn: () => apiGetJournalistSearchFilter(),
    ...options,
  })
}
