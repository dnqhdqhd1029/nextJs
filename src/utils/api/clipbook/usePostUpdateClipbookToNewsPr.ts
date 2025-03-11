/**
 * @file usePostUpdateClipbookToNewsPr.ts
 * @description 클립북에 뉴스/보도자료 추가
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { AddDelNewsAndPrDto, BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostUpdateClipbookToNewsPrParams {
  type: 'add' | 'del' | 'addone'
  info: AddDelNewsAndPrDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/clipbook/newspr`

/**
 * Axios API
 * @param {UsePostUpdateClipbookToNewsPrParams} params - 검색 조건
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostUpdateClipbookToNewsPr = async ({
  type,
  info,
}: UsePostUpdateClipbookToNewsPrParams): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostUpdateClipbookToNewsPrParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostUpdateClipbookToNewsPrParams>} - mutation 결과
 */
export const usePostUpdateClipbookToNewsPr = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostUpdateClipbookToNewsPrParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostUpdateClipbookToNewsPrParams> => {
  return useMutation(apiPostUpdateClipbookToNewsPr, options)
}
