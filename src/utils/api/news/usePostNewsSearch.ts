/**
 * @file usePostNewsSearch.ts
 * @description Elastic Search 뉴스 검색
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
import type { BaseResponseCommonObject, ESearchNewsCondDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/elastic/news`

/**
 * Axios API
 * @param {ESearchNewsCondDto} eSearchNewsCondDto - 검색 조건
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostNewsSearch = async (eSearchNewsCondDto: ESearchNewsCondDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, eSearchNewsCondDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @param {string} link - 검색 조건
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostNewsSearchByUrl = async (link: string): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/api/newsinfo`,
    { link },
    {
      //headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
      //withCredentials: true,
    }
  )
  return data
}

/**
 * Query hook
 * @param {ESearchNewsCondDto} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetNewsSearchByMonitoring = (
  params: ESearchNewsCondDto,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetNewsSearchByMonitoring'],
    queryFn: () => apiPostNewsSearch(params),
    ...options,
  })
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, ESearchNewsCondDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, ESearchNewsCondDto>} - mutation 결과
 */
export const usePostNewsSearch = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, ESearchNewsCondDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, ESearchNewsCondDto> => {
  return useMutation(apiPostNewsSearch, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, string>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, string>} - mutation 결과
 */
export const usePostNewsSearchByUrl = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, string>
): UseMutationResult<BaseResponseCommonObject, AxiosError, string> => {
  return useMutation(apiPostNewsSearchByUrl, options)
}
