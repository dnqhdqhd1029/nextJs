/**
 * @file usePutMonitoringUpdate.ts
 * @description 그룹명 변경
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyNewsSrchDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutMonitoringUpdateParams {
  id: number
  info: ModifyNewsSrchDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newssrch`

/**
 * Axios API
 * @param {UsePutMonitoringUpdateParams} { id, info } - id, 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutMonitoringUpdate = async ({
  id,
  info,
}: UsePutMonitoringUpdateParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, info, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMonitoringUpdateParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMonitoringUpdateParams>}
 */
export const usePutMonitoringUpdate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMonitoringUpdateParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMonitoringUpdateParams> => {
  return useMutation(apiPutMonitoringUpdate, options)
}
