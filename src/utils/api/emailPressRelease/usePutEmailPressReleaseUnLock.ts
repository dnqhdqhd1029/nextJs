/**
 * @file usePutEmailPressReleaseUnLock.ts
 * @description 이메일/보도자료배포 수정 후 unLock 설정
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutEmailPressReleaseUnLockParams {
  id: number
  info: RequestMailingDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing/unlock`

/**
 * Axios API with FormData for File Upload using PUT method
 * @param {UsePutEmailPressReleaseUnLockParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutEmailPressReleaseUnLock = async ({
  id,
  info,
}: UsePutEmailPressReleaseUnLockParams): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseUnLockParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseUnLockParams>}
 */
export const usePutEmailPressReleaseUnLock = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseUnLockParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseUnLockParams> => {
  return useMutation(apiPutEmailPressReleaseUnLock, options)
}
