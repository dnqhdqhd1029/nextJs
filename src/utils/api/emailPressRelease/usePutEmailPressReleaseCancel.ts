/**
 * @file usePutEmailPressReleaseCancel.ts
 * @description 이메일/보도자료배포 발송 취소하기
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutEmailPressReleaseCancelParams {
  id: number
  info: RequestMailingDto
}

export interface UseTestEmailPressReleaseParams {
  id: number
  info: {
    groupId: number
    toEmail: string
  }
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing/sendcancel`
const queryKeyTestSend = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing/sendtest`

/**
 * Axios API
 * @param {UsePutEmailPressReleaseCancelParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutEmailPressReleaseCancel = async ({
  id,
  info,
}: UsePutEmailPressReleaseCancelParams): Promise<BaseResponseCommonObject> => {
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
 * Axios API
 * @param {UseTestEmailPressReleaseParams} params - 테스트 메일
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiTestEmailPressRelease = async ({
  id,
  info,
}: UseTestEmailPressReleaseParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.put(`${queryKeyTestSend}/${id}`, info, {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseTestEmailPressReleaseParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UseTestEmailPressReleaseParams>}
 */
export const useTestEmailPressRelease = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseTestEmailPressReleaseParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseTestEmailPressReleaseParams> => {
  return useMutation(apiTestEmailPressRelease, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseCancelParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseCancelParams>}
 */
export const usePutEmailPressReleaseCancel = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseCancelParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseCancelParams> => {
  return useMutation(apiPutEmailPressReleaseCancel, options)
}
