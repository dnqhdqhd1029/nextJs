/**
 * @file usePostJournalistSearch.ts
 * @description Elastic Search 언론인 검색
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
import type { BaseResponseCommonObject, ESearchJournalistCondDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/elastic/journalist`

/**
 * Axios API
 * @param {ESearchJournalistCondDto} eSearchJournalistContDto - 검색 조건
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistSearch = async (
  eSearchJournalistContDto: ESearchJournalistCondDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, eSearchJournalistContDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistNewsSearch = async (eSearchJournalistContDto: {
  journalistIdList: number[]
  news: string
}): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/elastic/journalist/news`,
    eSearchJournalistContDto,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return data
}

/**
 * Query hook
 * @param {ESearchJournalistCondDto} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetPressElastickSearchQuery = (
  params: ESearchJournalistCondDto,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetPressElastickSearchQuery'],
    queryFn: () => apiPostJournalistSearch(params),
    ...options,
  })
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, {
 *   journalistIdList: number[]
 *   news: string
 * }>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, {
 *   journalistIdList: number[]
 *   news: string
 * }>} - mutation 결과
 */
export const usePostJournalistNewsSearch = (
  options?: UseMutationOptions<
    BaseResponseCommonObject,
    AxiosError,
    {
      journalistIdList: number[]
      news: string
    }
  >
): UseMutationResult<
  BaseResponseCommonObject,
  AxiosError,
  {
    journalistIdList: number[]
    news: string
  }
> => {
  return useMutation(apiPostJournalistNewsSearch, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, ESearchJournalistCondDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, ESearchJournalistCondDto>} - mutation 결과
 */
export const usePostJournalistSearch = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, ESearchJournalistCondDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, ESearchJournalistCondDto> => {
  return useMutation(apiPostJournalistSearch, options)
}
