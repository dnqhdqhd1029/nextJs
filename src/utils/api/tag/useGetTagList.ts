/**
 * @file useGetTagList.ts
 * @description 태그 리스트. category: NEWS / ACTION
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetTagListParams {
  name?: string
  category: 'NEWS' | 'ACTION'
  groupId: number
  page: number
  size: number
  sort: string
  userId?: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/tag`

/**
 * Axios API
 * @param {UseGetTagListParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetTagList = async (params: UseGetTagListParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  let apiParams = { ...params }
  if (params.userId && params.userId > 0) {
    apiParams.userId = params.userId
  } else {
    delete apiParams.userId
  }

  const { data } = await axios.get(`${queryKey}`, {
    params: apiParams,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Tagbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {UseGetTagListParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetTagList = (
  params: UseGetTagListParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetTagList(params),
    ...options,
  })
}
