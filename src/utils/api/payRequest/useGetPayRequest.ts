/**
 * @file useGetPayRequest.ts
 * @description 내구매 목록
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
import { UseGetAllUserParams } from '~/utils/api/user/useGetAllUsers'
import axios from '~/utils/common/axios'

export interface UseGetPayRequestParams {
  page?: number
  size?: number
  sort?: string[] // ['id,desc', 'name,asc', 'regisAt,desc']
  keyword?: string
}

export interface GetPayRequestParams {
  UseGetPayRequestParams: UseGetPayRequestParams
  mId: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/payrequest`

const createApiParams = (params: UseGetPayRequestParams): string => {
  const searchParams = new URLSearchParams()

  Object.keys(params).forEach(key => {
    if (key === 'sort') {
      params.sort?.forEach(item => {
        searchParams.append('sort', item)
      })
    } else if (key === 'keyword' && params[key] !== '') {
      const value = params[key as keyof UseGetPayRequestParams] as string
      const replacedValue = value.replace(SPECIAL_CHARACTERS_PATTERN, '')
      searchParams.append(key, replacedValue)
    } else {
      searchParams.append(key, params[key as keyof UseGetPayRequestParams] as string)
    }
  })

  return searchParams.toString()
}

/**
 * Axios API
 * @param {GetPayRequestParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetPayRequest = async (params: GetPayRequestParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}`, {
    params: params.UseGetPayRequestParams,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

export const apiGetPayRequestDetail = async (params: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${params}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

export const apiGetPayRequestDetailPopup = async (): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/license/info`,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return data
}
/**
 * Query hook
 * @param {UseGetJournalistGroupParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetPayRequest = (
  params: GetPayRequestParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetPayRequest(params),
    enabled: params.mId < 1,
    ...options,
  })
}
export const useGetPayRequestDetail = (
  params: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetPayRequestDetail(params),
    enabled: params > 0,
    ...options,
  })
}
