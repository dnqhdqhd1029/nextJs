/**
 * @file usePostEmailPressReleaseEdit.ts
 * @description 이메일/보도자료배포 수정
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CreateMailingDto, ModifyMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostEmailPressReleaseEditParams {
  request: ModifyMailingDto
  fileList: File[]
  id: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing`

/**
 * Axios API with FormData for File Upload
 * @param {UsePostEmailPressReleaseEditParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostEmailPressReleaseEdit = async (
  params: UsePostEmailPressReleaseEditParams
): Promise<BaseResponseCommonObject> => {
  console.log('apiPostEmailPressReleaseEdit', params)
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
  console.log('formData', formData)
  const response = await axios.put(`${queryKey}/${params.id}`, formData, {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostEmailPressReleaseEditParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostEmailPressReleaseEditParams>}
 */
export const usePostEmailPressReleaseEdit = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostEmailPressReleaseEditParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostEmailPressReleaseEditParams> => {
  return useMutation(apiPostEmailPressReleaseEdit, options)
}
