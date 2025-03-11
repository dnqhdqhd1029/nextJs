/**
 * @file usePostJournalistInfoByIds.ts
 * @description Elastic Search 언론인 검색
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, SearchJournalistIdListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalists/infos`

/**
 * Axios API
 * @param {SearchJournalistIdListDto} params - 검색 조건
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistInfoByIds = async (
  params: SearchJournalistIdListDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, SearchJournalistIdListDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, SearchJournalistIdListDto>} - mutation 결과
 */
export const usePostJournalistInfoByIds = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, SearchJournalistIdListDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, SearchJournalistIdListDto> => {
  return useMutation(apiPostJournalistInfoByIds, options)
}
