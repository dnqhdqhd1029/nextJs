/**
 * @file usePutNewswireReleaseLock.ts
 * @description 뉴스와이어 배포 수정 전 Lock 요청
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutNewswireReleaseLockParams {
  id: number
  info: RequestMailingDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newswirerelease/lock`

/**
 * Axios API with FormData for File Upload using PUT method
 * @param {UsePutNewswireReleaseLockParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutNewswireReleaseLock = async ({
  id,
  info,
}: UsePutNewswireReleaseLockParams): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseLockParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseLockParams>}
 */
export const usePutNewswireReleaseLock = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseLockParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseLockParams> => {
  return useMutation(apiPutNewswireReleaseLock, options)
}
