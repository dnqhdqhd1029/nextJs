/**
 * @file usePutNoticePolicy.ts
 * @description 시스템알림 설정 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyNoticePolicyDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutNoticePolicyParams {
  policyInfo: ModifyNoticePolicyDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/noticepolicy/users`

/**
 * Axios API
 * @param {UsePutNoticePolicyParams} { policyInfo } - 시스템알림 설정 값
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutNoticePolicy = async ({
  policyInfo,
}: UsePutNoticePolicyParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}`, policyInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNoticePolicyParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNoticePolicyParams>}
 */
export const usePutNoticePolicy = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNoticePolicyParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNoticePolicyParams> => {
  return useMutation(apiPutNoticePolicy, options)
}
