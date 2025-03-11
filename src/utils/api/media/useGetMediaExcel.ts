import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface useGetMediaExcelParams {
  mediaIdList: number[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/elastic/media/download`

/**
 * Axios API
 * @param {useGetMediaExcelParams} params - 파라미터
 * @returns {Promise<Blob>}
 */
export const apiGetMediaExcel = async (params: useGetMediaExcelParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
    responseType: 'blob',
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, useGetActionEcelParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, useGetActionEcelParams>}
 */
export const useGetMediaExcel = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, useGetMediaExcelParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, useGetMediaExcelParams> => {
  return useMutation(apiGetMediaExcel, options)
}
