/**
 * @file usePutSharePolicy.ts
 * @description 공유설정 기본값 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, SaveSharePolicyDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutSharePolicyParams {
  id: number
  policyInfo: SaveSharePolicyDto
}

export interface UseAllClipbookSharePolicyParams {
  clipBookIdList: number[]
  shareCode: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/sharepolicy/users`

const queryClipbookKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/clipbook/list/share`

/**
 * Axios API
 * @param {UsePutSharePolicyParams} { id, policyInfo } - id, 공유설정 값
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutSharePolicy = async ({
  id,
  policyInfo,
}: UsePutSharePolicyParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, policyInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutSharePolicyParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutSharePolicyParams>}
 */
export const usePutSharePolicy = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutSharePolicyParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutSharePolicyParams> => {
  return useMutation(apiPutSharePolicy, options)
}

export const apiAllClipbookSharePolicy = async (
  params: UseAllClipbookSharePolicyParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryClipbookKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

export const useAllClipbookSharePolicy = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseAllClipbookSharePolicyParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseAllClipbookSharePolicyParams> => {
  return useMutation(apiAllClipbookSharePolicy, options)
}
