/**
 * @file usePutUserPasswordChange.ts
 * @description 사용자 비밀번호 변경
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ChangePasswordDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutUserPasswordChangeParams {
  id: number
  passwordInfo: ChangePasswordDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users`

/**
 * Axios API
 * @param {UsePutUserPasswordChangeParams} { id, passwordInfo } - id, 사용자 비밀번호 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutUserPasswordChange = async ({
  id,
  passwordInfo,
}: UsePutUserPasswordChangeParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}/passwd`, passwordInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserPasswordChangeParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserPasswordChangeParams>}
 */
export const usePutUserPasswordChange = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutUserPasswordChangeParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutUserPasswordChangeParams> => {
  return useMutation(apiPutUserPasswordChange, options)
}
