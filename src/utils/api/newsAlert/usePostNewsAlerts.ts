/**
 * @file usePostNewsAlerts.ts
 * @description 뉴스알리미 설정 저장
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, NewsAlertDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostNewsAlertsParams {
  request: NewsAlertDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/news-alerts`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostNewsAlerts = async (params: UsePostNewsAlertsParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.post(queryKey, params.request, {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostNewsAlertsParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostNewsAlertsParams>}
 */
export const usePostNewsAlertsCreate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostNewsAlertsParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostNewsAlertsParams> => {
  return useMutation(apiPostNewsAlerts, options)
}
