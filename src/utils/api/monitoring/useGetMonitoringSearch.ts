/**
 * @file useGetMonitoringSearch.ts
 * @description 클립북 리스트
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetMonitoringSearchParams {
  title?: string
  shareCode?: string
  category?: string
  type?: string
  groupId: number
  ownerId?: number
  page: number
  size: number
  sort: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newssrch`

/**
 * Axios API
 * @param {UseGetMonitoringSearchParams} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetMonitoringSearch = async (
  params: UseGetMonitoringSearchParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const newParams: UseGetMonitoringSearchParams = {
    ...params,
  }
  if (newParams.category === 'ALL' || newParams.category === '') {
    delete newParams.category
  }
  if (newParams.title === '') {
    delete newParams.title
  }
  if (newParams.shareCode === '') {
    delete newParams.shareCode
  }
  if ((newParams.ownerId && newParams.ownerId < 1) || newParams.ownerId === undefined) {
    delete newParams.ownerId
  }

  const { data } = await axios.get(`${queryKey}`, {
    params: newParams,
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Clipbookbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {UseGetMonitoringSearchParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetMonitoringSearch = (
  params: UseGetMonitoringSearchParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetMonitoringSearch(params),
    ...options,
  })
}
