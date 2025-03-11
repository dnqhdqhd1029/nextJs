/**
 * @file useGetMediaCustomSearchList.ts
 * @description 미디어 맞춤 검색 리스트
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

import {
  ACCESS_TOKEN_NAME,
  API_BASE_URL,
  API_DEMO_BASE_URL,
  API_VERSION,
  DEMO_LICENSE,
  SPECIAL_CHARACTERS_PATTERN,
} from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetMediaCustomSearchListParams {
  title?: string
  shareCode?: string
  groupId: number
  ownerId?: number
  page: number
  size: number
  sort: string[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediasrch`

/**
 * Axios API
 * @param {UseGetMediaCustomSearchListParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetMediaCustomSearchList = async (
  params: UseGetMediaCustomSearchListParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const apiParams = {
    ...params,
  }
  if (params.title !== '') {
    apiParams.title = params.title
  } else {
    delete apiParams.title
  }
  if (params.shareCode !== '') {
    apiParams.shareCode = params.shareCode
  } else {
    delete apiParams.shareCode
  }
  if (params.ownerId && params.ownerId > 0) {
    apiParams.ownerId = params.ownerId
  } else {
    delete apiParams.ownerId
  }

  const { data } = await axios.get(`${queryKey}`, {
    params: apiParams,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {UseGetMediaCustomSearchListParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetMediaCustomSearchList = (
  params: UseGetMediaCustomSearchListParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetMediaCustomSearchList(params),
    cacheTime: 0.1,
    ...options,
  })
}
