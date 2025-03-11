/**
 * @file useDeleteTag.ts
 * @description 태그 삭제
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestActionDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseDeleteActionParams {
  id: number
  group: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing`

/**
 * Axios API
 * @param {UseDeleteActionParams} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiDelete = async ({ id, group }: UseDeleteActionParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.delete<BaseResponseCommonObject>(`${queryKey}/${id}`, {
    data: { groupId: group },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @param {UseDeleteActionParams} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiLock = async ({ id, group }: UseDeleteActionParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(
    `${queryKey}/lock/${id}`,
    { groupId: group },
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Axios API
 * @param {UseDeleteActionParams} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiUnLock = async ({ id, group }: UseDeleteActionParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(
    `${queryKey}/unlock/${id}`,
    { groupId: group },
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteActionParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteActionParams>}
 */
export const useDeleteRelease = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteActionParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteActionParams> => {
  return useMutation(apiDelete, options)
}
export const useLockRelease = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteActionParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteActionParams> => {
  return useMutation(apiLock, options)
}
export const useUnLockRelease = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteActionParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteActionParams> => {
  return useMutation(apiUnLock, options)
}
