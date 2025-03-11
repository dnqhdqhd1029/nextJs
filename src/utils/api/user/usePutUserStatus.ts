/**
 * @file usePutUserStatus.ts
 * @description 사용자 활성화/비활성화
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

interface UsePutUserStatusParams {
  id: number
  status: boolean
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users`

/**
 * Axios API
 * @param {UsePutUserStatusParams} { id, status } - id, 활성화 여부
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutUserStatus = async ({ id, status }: UsePutUserStatusParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(
    `${queryKey}/${id}/status?status=${status}`,
    undefined,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserStatusParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserStatusParams>}
 */
export const usePutUserStatus = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserStatusParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserStatusParams> => {
  return useMutation(apiPutUserStatus, options)
}
