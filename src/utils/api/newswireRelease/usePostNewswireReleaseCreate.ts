/**
 * @file usePostNewswireReleaseCreate.ts
 * @description 뉴스와이어 추가
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CreateNewswireReleaseDto, ModifyMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostNewswireReleaseCreateParams {
  request: CreateNewswireReleaseDto
  fileList: File[]
}

export interface UsePostNewswireReleaseModifyParams {
  request: ModifyMailingDto
  fileList: File[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newswirerelease`

/**
 * Axios API with FormData for File Upload
 * @param {UsePostNewswireReleaseCreateParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostNewswireReleaseCreate = async (
  params: UsePostNewswireReleaseCreateParams
): Promise<BaseResponseCommonObject> => {
  const formData = new FormData()

  const blob = new Blob([JSON.stringify(params.request)], {
    type: 'application/json',
  })

  formData.append('request', blob)

  // FileList를 FormData에 추가
  params.fileList.forEach(file => {
    formData.append('fileList', file)
  })

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.post(queryKey, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return response.data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostNewswireReleaseCreateParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostNewswireReleaseCreateParams>}
 */
export const usePostNewswireReleaseCreate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostNewswireReleaseCreateParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostNewswireReleaseCreateParams> => {
  return useMutation(apiPostNewswireReleaseCreate, options)
}
