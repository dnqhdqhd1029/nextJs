/**
 * @file useGetActionList.ts
 * @description 활동목록 리스트
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

export interface UseGetActionListParams {
  title?: string
  shareCode?: string
  groupId?: number
  categoryList?: string[]
  state_filter?: string[]
  state?: string[]
  ownerIdList?: string[]
  tagIdList?: string[]
  journalistIdList?: string[]
  mediaIdList?: string[]
  timezone?: string
  periodStartYear?: string
  periodStartMonth?: string
  periodStartDay?: string
  periodEndYear?: string
  periodEndMonth?: string
  periodEndDay?: string
  projectIdList?: string[]
  page?: number
  size?: number
  sort?: string[]
}

export interface UseGetActionListParamsTotalProps {
  listParam: UseGetActionListParams
  keyValue: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/action`
const createApiParams = (params: UseGetActionListParams): string => {
  const searchParams = new URLSearchParams()
  try {
    // console.log('searchParams', params)
    if (params.shareCode && params.shareCode !== '') {
      const value = params.shareCode as string
      const replacedValue = value.replace(SPECIAL_CHARACTERS_PATTERN, '')
      searchParams.append('shareCode', replacedValue)
    }
    if (params.categoryList && params.categoryList.length > 0) {
      searchParams.append('categoryList', params.categoryList.toString())
    }
    if (params.state_filter && params.state_filter.length > 0) {
      searchParams.append('state_filter', params.state_filter.toString())
    }
    if (params.ownerIdList && params.ownerIdList.length > 0) {
      searchParams.append('ownerIdList', params.ownerIdList.toString())
    }
    if (params.tagIdList && params.tagIdList.length > 0) {
      searchParams.append('tagIdList', params.tagIdList.toString())
    }
    if (params.journalistIdList && params.journalistIdList.length > 0) {
      searchParams.append('journalistIdList', params.journalistIdList.toString())
    }
    if (params.mediaIdList && params.mediaIdList.length > 0) {
      searchParams.append('mediaIdList', params.mediaIdList.toString())
    }
    if (params.projectIdList && params.projectIdList.length > 0) {
      searchParams.append('projectIdList', params.projectIdList.toString())
    }
    if (params.periodStartYear && params.periodStartYear !== '') {
      searchParams.append('periodStartYear', params.periodStartYear as string)
    }
    if (params.periodStartMonth && params.periodStartMonth !== '') {
      searchParams.append('periodStartMonth', params.periodStartMonth as string)
    }
    if (params.periodStartDay && params.periodStartDay !== '') {
      searchParams.append('periodStartDay', params.periodStartDay as string)
    }
    if (params.periodEndYear && params.periodEndYear !== '') {
      searchParams.append('periodEndYear', params.periodEndYear as string)
    }
    if (params.periodEndMonth && params.periodEndMonth !== '') {
      searchParams.append('periodEndMonth', params.periodEndMonth as string)
    }
    if (params.periodEndDay && params.periodEndDay !== '') {
      searchParams.append('periodEndDay', params.periodEndDay as string)
    }
    if (params.title && params.title !== '') {
      const value = params.title as string
      const replacedValue = value.replace(SPECIAL_CHARACTERS_PATTERN, '')
      searchParams.append('title', replacedValue)
    }
    if (params.page && params.page > 0) {
      searchParams.append('page', params.page.toString() as string)
    }
    if (params.size && params.size > 0) {
      searchParams.append('size', params.size.toString() as string)
    }
    if (params.sort && params.sort.length > 0) {
      params.sort?.forEach(item => {
        searchParams.append('sort', item)
      })
    }
    if (params.groupId && params.groupId > 0) {
      searchParams.append('groupId', params.groupId.toString() as string)
    }
  } catch (e) {
    console.log('searchParams err', e)
  }

  // console.log('searchParams.toString()', searchParams.toString())
  return searchParams.toString()
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetActionList = async (params: UseGetActionListParams): Promise<BaseResponseCommonObject> => {
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
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetActionListByConfition = async (
  params: UseGetActionListParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const apiParams = createApiParams(params)
  const url = new URL(queryKey)
  url.search = apiParams
  // console.log('(url.toString()', url.toString())
  const { data } = await axios.get(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}
/**
 * Query hook
 * @param {UseGetActionListParams} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetActionList = (
  params: UseGetActionListParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetActionList(params),
    ...options,
  })
}

/**
 * Query hook
 * @param {UseGetActionListParamsTotalProps} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetActionListByConfition = (
  params: UseGetActionListParamsTotalProps,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetActionListByConfition'],
    queryFn: () => apiGetActionListByConfition(params.listParam),
    enabled: params.keyValue > 0,
    ...options,
  })
}
