/**
 * @file usePostImageUpload.ts
 * @description 이미지 업로드 후에 url 반환받음
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostImageUploadParams {
  attachment: File
}

export interface UsePutImageUploadParams {
  id: number
  req: {
    groupId: number
  }
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/image/upload`

/**
 * Axios API
 * @param {UsePostImageUploadParams} params - 복사할 언론인 그룹 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostImageUpload = async (params: UsePostImageUploadParams): Promise<BaseResponseCommonObject> => {
  const formData = new FormData()
  formData.append('attachment', params.attachment)

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, formData, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API with FormData for PUT method
 * @param {UsePutImageUploadParams} params - 에디터에 미디어 자료실 파일 등록 추가
 * @returns {Promise<BaseResponseCommonObject>}
 */

export const apiPutPressReleaseMediaListUpload = async (
  params: UsePutImageUploadParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.put(`${queryKey}/${params.id}`, params.req, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostImageUploadParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostImageUploadParams>} - mutation 결과
 */
export const usePostImageUpload = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostImageUploadParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostImageUploadParams> => {
  return useMutation(apiPostImageUpload, options)
}
