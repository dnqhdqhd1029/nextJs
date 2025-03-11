/**
 * @file usePutNewswireRelease.ts
 * @description 뉴스와이어 배포하기
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutNewswireReleaseParams {
  id: number
  info: RequestMailingDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newswirerelease/reserve`

/**
 * Axios API with FormData for File Upload using PUT method
 * @param {UsePutNewswireReleaseParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutNewswireRelease = async ({
  id,
  info,
}: UsePutNewswireReleaseParams): Promise<BaseResponseCommonObject> => {
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
 * @param {UsePutNewswireReleaseParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutNewswireReleaseCancel = async ({
  id,
  info,
}: UsePutNewswireReleaseParams): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseParams>}
 */
export const usePutNewswireRelease = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseParams> => {
  return useMutation(apiPutNewswireRelease, options)
}
/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseParams>}
 */
export const usePutNewswireReleaseCancel = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutNewswireReleaseParams> => {
  return useMutation(apiPutNewswireReleaseCancel, options)
}
