/**
 * @file usePostNewsAlertsList.ts
 * @description 뉴스알리미 목록 조회
 */

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, NewsAlertDto, NewsAlertListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostNewsAlertsListParams {
  keyword: string
  page: number
  size: number
  sort: string[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/news-alerts/list`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostNewsAlertsList = async (params: UsePostNewsAlertsListParams): Promise<BaseResponseCommonObject> => {
  // @ts-ignore
  const qs = new URLSearchParams(params).toString()
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const response = await axios.post(
    `${queryKey}?${qs}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Mediabee-Lang': locale,
      },
      withCredentials: true,
    }
  )
  return response.data
}
/**
 * Query hook
 * @param {UsePostNewsAlertsListParams} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const usePostNewsAlertsList = (
  params: UsePostNewsAlertsListParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiPostNewsAlertsList(params),
    ...options,
  })
}
