/**
 * @file usePostGetMediaValues.ts
 * @description 매체 지수 정보 가져오기
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, SearchMediaIdListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/media/value`

/**
 * Axios API
 * @param {SearchMediaIdListDto} params - 검색 조건
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostGetMediaValues = async (params: SearchMediaIdListDto): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, SearchMediaIdListDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, SearchMediaIdListDto>} - mutation 결과
 */
export const usePostGetMediaValues = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, SearchMediaIdListDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, SearchMediaIdListDto> => {
  return useMutation(apiPostGetMediaValues, options)
}
