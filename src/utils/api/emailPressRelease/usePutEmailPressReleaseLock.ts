/**
 * @file usePutEmailPressReleaseLock.ts
 * @description 이메일/보도자료배포 수정 전 Lock 요청
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutEmailPressReleaseLockParams {
  id: number
  info: RequestMailingDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing/lock`

/**
 * Axios API with FormData for File Upload using PUT method
 * @param {UsePutEmailPressReleaseLockParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutEmailPressReleaseLock = async ({
  id,
  info,
}: UsePutEmailPressReleaseLockParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.put(`${queryKey}/${id}`, info, {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseLockParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseLockParams>}
 */
export const usePutEmailPressReleaseLock = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseLockParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseLockParams> => {
  return useMutation(apiPutEmailPressReleaseLock, options)
}
