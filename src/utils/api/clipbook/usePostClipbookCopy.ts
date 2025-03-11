/**
 * @file usePostClipbookCopy.ts
 * @description 클립북 추가
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CopyClipBookDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/clipbook/copy`

/**
 * Axios API
 * @param {CopyClipBookDto} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostClipbookCopy = async (params: CopyClipBookDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CopyClipBookDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CopyClipBookDto>} - mutation 결과
 */
export const usePostClipbookCopy = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CopyClipBookDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CopyClipBookDto> => {
  return useMutation(apiPostClipbookCopy, options)
}
