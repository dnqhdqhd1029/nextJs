/**
 * @file usePostMediaSearch.ts
 * @description Elastic Search 매체 검색
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
import type { BaseResponseCommonObject, ESearchMediaCondDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/elastic/media`

/**
 * Axios API
 * @param {ESearchMediaCondDto} eSearchMediaCondDto - 검색 조건
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMediaSearch = async (
  eSearchMediaCondDto: ESearchMediaCondDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, eSearchMediaCondDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {ESearchMediaCondDto} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetMediaElastickSearchQuery = (
  params: ESearchMediaCondDto,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetMediaElastickSearchQuery'],
    queryFn: () => apiPostMediaSearch(params),
    ...options,
  })
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, ESearchMediaCondDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, ESearchMediaCondDto>} - mutation 결과
 */
export const usePostMediaSearch = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, ESearchMediaCondDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, ESearchMediaCondDto> => {
  return useMutation(apiPostMediaSearch, options)
}
