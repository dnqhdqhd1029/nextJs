/**
 * @file useGetOneMonitoring.ts
 * @description 모니터링 정보 확인
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetOneMonitoringParams {
  id: number
  groupId: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newssrch`

/**
 * Axios API
 * @param {UseGetOneMonitoringParams} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetOneMonitoring = async ({
  id,
  groupId,
}: UseGetOneMonitoringParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${id}`, {
    params: {
      groupId,
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Clipbookbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {UseGetOneMonitoringParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetOneMonitoring = (
  params: UseGetOneMonitoringParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetOneMonitoring(params),
    ...options,
  })
}
