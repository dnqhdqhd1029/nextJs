/**
 * @file usePostSendTestEmail.ts
 * @description 이메일 발송(테스트)
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

interface UsePostSendTestEmailParams {
  to: string
  title: string
  context: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/test/email`

/**
 * Axios API
 * @param {UsePostSendTestEmailParams} emailInfo - 보낼 사람 이메일, 제목, 내용
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostSendTestEmail = async (
  emailInfo: UsePostSendTestEmailParams
): Promise<BaseResponseCommonObject> => {
  console.log('>> apiPostSendTestEmail', emailInfo)
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, emailInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostSendTestEmailParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostSendTestEmailParams>} - mutation 결과
 */
export const usePostSendTestEmail = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostSendTestEmailParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostSendTestEmailParams> => {
  return useMutation(apiPostSendTestEmail, options)
}
