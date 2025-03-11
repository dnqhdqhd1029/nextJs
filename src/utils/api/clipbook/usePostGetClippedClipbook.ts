/**
 * @file usePostGetClippedClipbook.ts
 * @description 클리핑된 클립북 가져오기
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, SearchClippingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostGetClippedClipbookParams {
  type: 'news' | 'pr'
  info: SearchClippingDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/clipping`

/**
 * Axios API
 * @param {UsePostGetClippedClipbookParams} params - 검색 조건
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostGetClippedClipbook = async ({
  type,
  info,
}: UsePostGetClippedClipbookParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}/${type}`, info, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, SearchClippingDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, SearchClippingDto>} - mutation 결과
 */
export const usePostGetClippedClipbook = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostGetClippedClipbookParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostGetClippedClipbookParams> => {
  return useMutation(apiPostGetClippedClipbook, options)
}
