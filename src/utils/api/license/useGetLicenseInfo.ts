/**
 * @file useNotification.ts
 * @description 사용자 상세 정보
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/license/info`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetLicenseInfo = async (): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  console.log('accessToken', accessToken)
  const locale = Cookie.get('locale') ?? 'ko'
  console.log('Cookie.get(DEMO_LICENSE)', Cookie.get(DEMO_LICENSE))

  const queryKey = `${
    Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
  }${apiVersion}/svc/license/info`

  const { data } = await axios.get(`${queryKey}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetLicenseInfoById = async (id: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  console.log('accessToken', accessToken)
  const locale = Cookie.get('locale') ?? 'ko'
  console.log('Cookie.get(DEMO_LICENSE)', Cookie.get(DEMO_LICENSE))

  const queryKey = `${
    Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
  }${apiVersion}/svc/license/info`

  const { data } = await axios.get(`${queryKey}/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetLicenseInfoByToken = async (token: string): Promise<BaseResponseCommonObject> => {
  const accessToken = token
  const locale = Cookie.get('locale') ?? 'ko'

  const queryKey = `${
    Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
  }${apiVersion}/svc/license/info`

  const { data } = await axios.get(`${queryKey}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetLicenseInfo = (
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetLicenseInfo'],
    queryFn: () => apiGetLicenseInfo(),
    ...options,
  })
}

/**
 * Query hook
 * @param {number} idKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useUpdateLicenseInfo = (
  idKey: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useUpdateLicenseInfo'],
    queryFn: () => apiGetLicenseInfo(),
    enabled: idKey > 0,
    ...options,
  })
}
