/**
 * @file useGetCommonCode.ts
 * @description 공통 코드 목록 조회
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetCommonCodeParams {
  parentCode: string
  parentCommonCodeId?: number
  groupId?: number
}

export interface CommonCode {
  commonCodeId: number
  parentId: number
  parentCode: string
  code: string
  language: string
  name: string
  def: boolean
  weight: number
  count?: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/commoncode`
const queryKeyNonUser = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/nouser/commoncode`

/**
 * Axios API
 * @param {string} token
 * @param {UseGetCommonCodeParams} useGetCommonCodeParams - 코드명
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetCommonCodeByToken = async (
  token: string,
  useGetCommonCodeParams: UseGetCommonCodeParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = token
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${accessToken === '' ? queryKeyNonUser : queryKey}`, {
    params: useGetCommonCodeParams,
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetCommonCodePreload = async (
  commonList: string[],
  queryParam: number
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const params = {
    parentCodeList: commonList,
    groupId: queryParam,
  }
  const { data } = await axios.get(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/commoncode/preload`,
    {
      params,
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      },
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return data
}

/**
 * Axios API
 * @param {UseGetCommonCodeParams} useGetCommonCodeParams - 코드명
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetCommonCode = async (
  useGetCommonCodeParams: UseGetCommonCodeParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${accessToken === '' ? queryKeyNonUser : queryKey}`, {
    params: useGetCommonCodeParams,
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {UseGetCommonCodeParams} useGetCommonCodeParams - 코드명
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetCommonCode = (
  useGetCommonCodeParams: UseGetCommonCodeParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetCommonCodeParams' + useGetCommonCodeParams.parentCode],
    queryFn: () => apiGetCommonCode(useGetCommonCodeParams),
    enabled: useGetCommonCodeParams.parentCode !== '',
    ...options,
  })
}

/**
 * Query hook
 * @param {UseGetCommonCodeParams} useGetCommonCodeParams - 코드명
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetCommonCodeParentCommonCodeId = (
  useGetCommonCodeParams: UseGetCommonCodeParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetCommonCodeParentCommonCodeId' + useGetCommonCodeParams.parentCommonCodeId],
    queryFn: () => apiGetCommonCode(useGetCommonCodeParams),
    ...options,
  })
}
