/**
 * @file usePutEmailPressReleaseUpdate.ts
 * @description 이메일/보도자료배포 수정
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutEmailPressReleaseUpdateParams {
  id: number
  request: ModifyMailingDto
  fileList?: File[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing`

/**
 * Axios API with FormData for File Upload using PUT method
 * @param {UsePutEmailPressReleaseUpdateParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutEmailPressReleaseUpdate = async (
  params: UsePutEmailPressReleaseUpdateParams
): Promise<BaseResponseCommonObject> => {
  const formData = new FormData()

  console.log('>> [usePutEmailPressReleaseUpdate] params:', params)

  const blob = new Blob([JSON.stringify(params.request)], {
    type: 'application/json',
  })

  formData.append('request', blob)

  // FileList를 FormData에 추가
  if (params.fileList && params.fileList.length > 0) {
    params.fileList.forEach(file => {
      formData.append('fileList', file)
    })
  }

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.put(`${queryKey}/${params.id}`, formData, {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseUpdateParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseUpdateParams>}
 */
export const usePutEmailPressReleaseUpdate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseUpdateParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseUpdateParams> => {
  return useMutation(apiPutEmailPressReleaseUpdate, options)
}
