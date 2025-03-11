/**
 * @file usePostSendEmailWithFile.ts
 * @description 이메일 발송(테스트)
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostSendEmailWithFileParams {
  request: {
    userIdList?: number[]
    emailList?: string[]
    title: string
    content: string
  }
  fileList: File[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/email/send`

/**
 * Axios API
 * @param {UsePostSendEmailWithFileParams} emailInfo - 보낼 사람 이메일, 제목, 내용, 파일
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostSendEmailWithFile = async (
  emailInfo: UsePostSendEmailWithFileParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  // FormData 객체 생성
  const formData = new FormData()

  // request 객체를 JSON 문자열로 변환하여 FormData에 추가
  const requestJsonString = JSON.stringify(emailInfo.request)
  formData.append('request', new Blob([requestJsonString], { type: 'application/json' }))

  // 파일 추가
  emailInfo.fileList.forEach(file => formData.append('fileList', file))

  // Axios 요청
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ['X-Mediabee-Lang']: locale,
      // 'Content-Type': 'multipart/form-data', 이 헤더는 자동으로 설정됩니다.
    },
    withCredentials: true,
  })

  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostSendEmailWithFileParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostSendEmailWithFileParams>} - mutation 결과
 */
export const usePostSendEmailWithFile = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostSendEmailWithFileParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostSendEmailWithFileParams> => {
  return useMutation(apiPostSendEmailWithFile, options)
}
