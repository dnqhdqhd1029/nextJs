/**
 * @file useGetTagginList.ts
 * @description 태깅한 태그 리스트. category: NEWS / ACTION
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetTagginListParams {
  targetIdList: number[]
  category: string
  groupId: number
  sort: string
}

export interface UseGetUsedTagginListParams {
  name: string
  category: string
  targetIdList: number[]
  groupId: number
  page: number
  size: number
  sort: string[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/tagging`

/**
 * Axios API
 * @param {UseGetTagginListParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiuseGetTaggingList = async (params: UseGetTagginListParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  console.log('apiuseGetTaggingList', {
    targetIdList: params.targetIdList,
    category: params.category,
    groupId: params.groupId,
    sort: params.sort,
  })
  const { data } = await axios.get(`${queryKey}`, {
    params: {
      targetIdList: params.targetIdList,
      category: params.category,
      groupId: params.groupId,
      sort: params.sort,
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Tagbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @param {UseGetUsedTagginListParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiUsedGetTaggingList = async (params: UseGetUsedTagginListParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/tag/autocomplete/tagging`,
    {
      params,
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      },
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Tagbee-Lang']: locale },
      withCredentials: true,
    }
  )
  return data
}
/**
 * Query hook
 * @param {UseGetTagginListParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetTaggingList = (
  params: UseGetTagginListParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiuseGetTaggingList(params),
    ...options,
  })
}

/**
 * Query hook
 * @param {UseGetUsedTagginListParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useUsedGetTaggingList = (
  params: UseGetUsedTagginListParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiUsedGetTaggingList(params),
    ...options,
  })
}
