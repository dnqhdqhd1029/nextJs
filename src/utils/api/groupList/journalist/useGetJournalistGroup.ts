/**
 * @file useGetJournalistGroup.ts
 * @description 언론인 목록 리스트
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
import type { BaseResponseCommonObject, SearchJrnlstListDto } from '~/types/api/service'
import { apiGetAutoCompleteMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import axios from '~/utils/common/axios'

export interface UseGetJournalistGroupParams extends SearchJrnlstListDto {
  page?: number
  size?: number
  sort?: string[] // ['id,desc', 'name,asc', 'regisAt,desc']
  keyword?: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalistgroup`

/**
 * Axios API
 * @param {UseGetJournalistGroupParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetAutoCompleteJournalistGroup = async (
  params: UseGetJournalistGroupParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}`, {
    params,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @param {UseGetJournalistGroupParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetJournalistGroup = async (params: UseGetJournalistGroupParams): Promise<BaseResponseCommonObject> => {
  if (params.groupId < 0) {
    return Promise.resolve({
      status: 'S',
      data: [],
      message: {
        code: '200',
        message: '',
      },
    } as BaseResponseCommonObject)
  }

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
 * @param {UseGetJournalistGroupParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetJournalistGroup = (
  params: UseGetJournalistGroupParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetJournalistGroup(params),
    ...options,
  })
}
