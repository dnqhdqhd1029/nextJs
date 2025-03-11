/**
 * @file usePostNewsAlertsSchedules.ts
 * @description 뉴스알리미 스케줄 저장
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, NewsAlertScheduleDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostNewsAlertsSchedulesParams {
  request: NewsAlertScheduleDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/news-alerts/schedules`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostNewsAlertsSchedulesCreate = async (
  params: UsePostNewsAlertsSchedulesParams
): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostNewsAlertsSchedulesParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostNewsAlertsSchedulesParams>}
 */
export const usePostNewsAlertsSchedulesCreate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostNewsAlertsSchedulesParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostNewsAlertsSchedulesParams> => {
  return useMutation(apiPostNewsAlertsSchedulesCreate, options)
}
