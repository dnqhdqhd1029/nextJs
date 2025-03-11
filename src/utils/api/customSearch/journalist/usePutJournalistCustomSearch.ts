/**
 * @file usePutJournalistCustomSearch.ts
 * @description 언론인 맞춤 검색 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyJournalistSrchDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutJournalistCustomSearchParams {
  id: number
  journalistInfo: ModifyJournalistSrchDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalistsrch`

/**
 * Axios API
 * @param {UsePutJournalistCustomSearchParams} { id, journalistInfo } - id, 언론인 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutJournalistCustomSearch = async ({
  id,
  journalistInfo,
}: UsePutJournalistCustomSearchParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, journalistInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutJournalistCustomSearchParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutJournalistCustomSearchParams>}
 */
export const usePutJournalistCustomSearch = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutJournalistCustomSearchParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutJournalistCustomSearchParams> => {
  return useMutation(apiPutJournalistCustomSearch, options)
}
