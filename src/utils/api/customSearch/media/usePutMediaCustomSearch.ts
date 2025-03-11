/**
 * @file usePutMediaCustomSearch.ts
 * @description 미디어 맞춤 검색 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyMediaSrchDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutMediaCustomSearchParams {
  id: number
  mediaInfo: ModifyMediaSrchDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediasrch`

/**
 * Axios API
 * @param {UsePutMediaCustomSearchParams} { id, journalistInfo } - id, 미디어 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutMediaCustomSearch = async ({
  id,
  mediaInfo,
}: UsePutMediaCustomSearchParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, mediaInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMediaCustomSearchParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMediaCustomSearchParams>}
 */
export const usePutMediaCustomSearch = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMediaCustomSearchParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMediaCustomSearchParams> => {
  return useMutation(apiPutMediaCustomSearch, options)
}
