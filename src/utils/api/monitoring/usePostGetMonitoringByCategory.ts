/**
 * @file usePostGetMonitoringByCategory.ts
 * @description 모니터링 Title 중복 확인
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
import type { BaseResponseCommonObject, SearchNewsSrchCategoryListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newssrch/category`

/**
 * Axios API
 * @param {SearchNewsSrchCategoryListDto} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostGetMonitoringByCategory = async (
  params: SearchNewsSrchCategoryListDto
): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, SearchNewsSrchCategoryListDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, SearchNewsSrchCategoryListDto>} - mutation 결과
 */
export const usePostGetMonitoringByCategory = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, SearchNewsSrchCategoryListDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, SearchNewsSrchCategoryListDto> => {
  return useMutation(apiPostGetMonitoringByCategory, options)
}

/**
 * Query hook
 * @param {SearchNewsSrchCategoryListDto} param
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetMonitoringByCategory = (
  param: SearchNewsSrchCategoryListDto,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetCommonCodeParams' + param.groupId],
    queryFn: () => apiPostGetMonitoringByCategory(param),
    ...options,
  })
}
