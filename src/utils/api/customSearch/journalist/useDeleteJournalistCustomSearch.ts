/**
 * @file useDeleteJournalistCustomSearch.ts
 * @description 언론인 맞춤 검색 삭제
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalistsrch`

/**
 * Axios API
 * @param {number} id - 맞춤 검색 ID
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiDeleteJournalistCustomSearch = async (id: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.delete<BaseResponseCommonObject>(`${queryKey}/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateJournalistSrchDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateJournalistSrchDto>} - mutation 결과
 */
export const useDeleteJournalistCustomSearch = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, number>
): UseMutationResult<BaseResponseCommonObject, AxiosError, number> => {
  return useMutation(apiDeleteJournalistCustomSearch, options)
}
