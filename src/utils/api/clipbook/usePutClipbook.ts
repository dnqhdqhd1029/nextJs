/**
 * @file usePutClipbook.ts
 * @description 클립북 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyClipBookDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutClipbookParams {
  id: number
  info: {
    type?: string
    title?: string
    prIdList?: number[]
    projectId?: number
    shareCode?: string
    ownerId?: number
  }
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/clipbook`

/**
 * Axios API
 * @param {UsePutClipbookParams} { id, journalistInfo } - id, 사용자 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutClipbook = async ({ id, info }: UsePutClipbookParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, info, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutClipbookParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutClipbookParams>}
 */
export const usePutClipbook = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutClipbookParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutClipbookParams> => {
  return useMutation(apiPutClipbook, options)
}
