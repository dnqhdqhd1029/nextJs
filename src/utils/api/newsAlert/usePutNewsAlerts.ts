/**
 * @file usePutNewsAlerts.ts
 * @description 뉴스알리미 수정
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, NewsAlertDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutNewsAlertsParams {
  request: NewsAlertDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/news-alerts`

/**
 * Axios API with FormData for File Upload using PUT method
 * @param {UsePutNewsAlertsParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutNewsAlerts = async (params: UsePutNewsAlertsParams): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewsAlertsParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewsAlertsParams>}
 */
export const usePutNewsAlerts = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewsAlertsParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewsAlertsParams> => {
  return useMutation(apiPutNewsAlerts, options)
}
