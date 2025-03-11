/**
 * @file usePutMediaLogo.ts
 * @description 사용자 추가 미디어 로고 변경
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutMediaPhotoParams {
  id: number
  file: File
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/media/logo`

/**
 * Axios API
 * @param {UsePutMediaPhotoParams} { id, file } - 수정 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutMediaLogo = async ({ id, file }: UsePutMediaPhotoParams): Promise<BaseResponseCommonObject> => {
  const formData = new FormData()
  formData.append('file', file)

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ['X-Mediabee-Lang']: locale,
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })

  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMediaPhotoParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMediaPhotoParams>}
 */
export const usePutMediaLogo = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMediaPhotoParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMediaPhotoParams> => {
  return useMutation(apiPutMediaLogo, options)
}
