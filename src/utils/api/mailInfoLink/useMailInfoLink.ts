/**
 * @file usMailInfoLink.ts
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import { BaseResponseCommonObject, PayRequestForPayDto, RequestActionDto } from '~/types/api/service'
import * as runtime from '~/types/api/service/runtime'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}/verification/email`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetOriginalUrlRaw = async (param: string): Promise<BaseResponseCommonObject> => {
  const headerParameters: runtime.HTTPHeaders = {}

  const { data } = await axios.get(`${queryKey}/${param}`, {
    headers: headerParameters,
  })
  return data
}

/**
 * Query hook
 * @param {string} idKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetOriginalUrlRaw = (
  idKey: string,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'apiGetOriginalUrlRaw'],
    queryFn: () => apiGetOriginalUrlRaw(idKey),
    enabled: idKey !== '',
    ...options,
  })
}
