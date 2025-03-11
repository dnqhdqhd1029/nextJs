/**
 * @file usePutMedia.ts
 * @description 사용자 추가 미디어 수정하기
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyMediaDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutMediaParams {
  id: number
  info: ModifyMediaDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/media`

/**
 * Axios API
 * @param {UsePutMediaParams} { id, info } - 수정 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutMedia = async ({ id, info }: UsePutMediaParams): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMediaParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMediaParams>}
 */
export const usePutMedia = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMediaParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMediaParams> => {
  return useMutation(apiPutMedia, options)
}
