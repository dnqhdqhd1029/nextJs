/**
 * @file usePutEmailPressRelease.ts
 * @description 이메일/보도자료배포 배포하기
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutEmailPressReleaseParams {
  id: number
  info: RequestMailingDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing/reserve`

/**
 * Axios API with FormData for File Upload using PUT method
 * @param {UsePutEmailPressReleaseParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutEmailPressRelease = async ({
  id,
  info,
}: UsePutEmailPressReleaseParams): Promise<BaseResponseCommonObject> => {
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
 * Axios API with FormData for File Upload using PUT method
 * @param {UsePutEmailPressReleaseParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutEmailPressReleaseCancel = async ({
  id,
  info,
}: UsePutEmailPressReleaseParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.put(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/mailing/sendcancel/${id}`,
    info,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Mediabee-Lang': locale,
      },
      withCredentials: true,
    }
  )

  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseParams>}
 */
export const usePutEmailPressRelease = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseParams> => {
  return useMutation(apiPutEmailPressRelease, options)
}
/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseParams>}
 */
export const usePutEmailPressReleaseCancel = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutEmailPressReleaseParams> => {
  return useMutation(apiPutEmailPressReleaseCancel, options)
}
