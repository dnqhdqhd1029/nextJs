/**
 * @file useDeleteMediaGroup.ts
 * @description 미디어 목록 삭제
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseDeleteMediaGroupParams {
  id: number
}

export interface UseAllDeleteMediaGroupParams {
  mediaListIdList: number[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediagroup`

/**
 * Axios API
 * @param {UseDeleteMediaGroupParams} { id } - 미디어 목록 id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiDeleteMediaGroup = async ({ id }: UseDeleteMediaGroupParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.delete<BaseResponseCommonObject>(`${queryKey}/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteGroupParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteGroupParams>}
 */
export const useDeleteMediaGroup = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteMediaGroupParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteMediaGroupParams> => {
  return useMutation(apiDeleteMediaGroup, options)
}

export const apiAllDeleteMediaGroup = async (
  params: UseAllDeleteMediaGroupParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}/list/del`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

export const useAllDeleteMediaGroup = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseAllDeleteMediaGroupParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseAllDeleteMediaGroupParams> => {
  return useMutation(apiAllDeleteMediaGroup, options)
}
