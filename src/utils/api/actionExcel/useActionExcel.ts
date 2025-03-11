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

export interface useGetActionEcelParams {
  groupId: number
  actionIdList: number[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/action/excel`

/**
 * Axios API
 * @returns {Promise<Blob>}
 */
export const apiGetActionEcel = async (params: useGetActionEcelParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  const locale = Cookie.get('locale') ?? 'ko'

  console.log('params', params)
  const { data } = await axios.get(`${queryKey}?groupId=${params.groupId}&actionIdList=${params.actionIdList}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
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
export const useGetActionEcel = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, useGetActionEcelParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, useGetActionEcelParams> => {
  return useMutation(apiGetActionEcel, options)
}
