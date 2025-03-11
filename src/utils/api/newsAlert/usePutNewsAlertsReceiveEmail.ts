/**
 * @file usePutNewsAlertsReceiveEmail.ts
 * @description 뉴스알리미 이메일 수신 설정 수정
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, NewsAlertReceiveActiveDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutNewsAlertsReceiveEmailParams {
  request: NewsAlertReceiveActiveDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/news-alerts/receive-email`

/**
 * Axios API with FormData for File Upload using PUT method
 * @param {UsePutNewsAlertsReceiveEmailParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutNewsAlertsReceiveEmail = async (
  params: UsePutNewsAlertsReceiveEmailParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.put(`${queryKey}`, params.request, {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewsAlertsReceiveEmailParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewsAlertsReceiveEmailParams>}
 */
export const usePutNewsAlertsReceiveEmail = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewsAlertsReceiveEmailParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewsAlertsReceiveEmailParams> => {
  return useMutation(apiPutNewsAlertsReceiveEmail, options)
}
