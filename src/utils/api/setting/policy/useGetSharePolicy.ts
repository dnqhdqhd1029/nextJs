/**
 * @file useGetSharePolicy.ts
 * @description 공유설정 기본값 가져오기
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import { UserPrevillege } from '~/types/contents/api'
import axios from '~/utils/common/axios'

export interface SharePolicyDto {
  list: UserPrevillege
  jrnlstMediaSrch: UserPrevillege
  clipbook: UserPrevillege
  news_search: UserPrevillege
  project: UserPrevillege
  action: UserPrevillege
  distribute: UserPrevillege
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/sharepolicy/users`

/**
 * Axios API
 * @param {number} id - 공유설정 기본값 ID
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetSharePolicy = async (id: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param id
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetSharePolicy = (
  id: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => apiGetSharePolicy(id),
    enabled: id > 0,
    ...options,
  })
}
