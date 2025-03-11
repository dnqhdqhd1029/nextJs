/**
 * @file usePutUserSelectGroup.ts
 * @description 서비스 화면에서 선택한 그룹 ID를 사용자 정보에 설정
 */
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

export interface UsePutUserSelectGroupParams {
  id: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users/groups`

/**
 * Axios API
 * @param {UsePutUserSelectGroupParams} { id } - 그룹 ID
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutUserSelectGroup = async ({ id }: UsePutUserSelectGroupParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, undefined, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiAllGroupByUser = async (): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.get<BaseResponseCommonObject>(`${queryKey}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserSelectGroupParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserSelectGroupParams>}
 */
export const usePutUserSelectGroup = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserSelectGroupParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserSelectGroupParams> => {
  return useMutation(apiPutUserSelectGroup, options)
}

/**
 * Query hook
 * @param {number} idKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useAllGroupByUser = (
  idKey: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => apiAllGroupByUser(),
    enabled: idKey > 0,
    ...options,
  })
}
