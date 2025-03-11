/**
 * @file useGetOneUser.ts
 * @description 사용자 상세 정보
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users`

/**
 * Axios API
 * @param {number} id - 사용자 id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetOneUser = async (id: number): Promise<BaseResponseCommonObject> => {
  if (!id || id < 0) {
    return Promise.resolve({
      data: [],
      status: 'F',
      message: {
        message: '잘못된 요청입니다.',
        code: '400',
      },
    })
  }
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @param {string} token - 사용자 id
 * @param {number} id - 사용자 id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetOneUserByToken = async (id: number, token: string): Promise<BaseResponseCommonObject> => {
  if (!id || id < 0) {
    return Promise.resolve({
      data: [],
      status: 'F',
      message: {
        message: '잘못된 요청입니다.',
        code: '400',
      },
    })
  }

  const accessToken = token
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
export const useGetOneUser = (
  id: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => apiGetOneUser(id),
    ...options,
  })
}

/**
 * Query hook
 * @param id
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetOneUserOption = (
  id: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetOneUserOption' + id],
    queryFn: () => apiGetOneUser(id),
    enabled: id > 0,
    ...options,
  })
}

/**
 * Query hook
 * @param id
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetOneUserOptionByData = (
  id: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetOneUserOptionByData' + id],
    queryFn: () => apiGetOneUser(id),
    enabled: id > 0,
    ...options,
  })
}
