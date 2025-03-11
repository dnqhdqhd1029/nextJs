/**
 * @file usePostCustomNewsAdd.ts
 * @description 사용자 추가 뉴스 등록하기
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestNewsUserDocDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

type RequestNewsUserExcelDocDtoType = {
  newsUserExcelList: RequestNewsUserDocDto[]
  clipbookIdList: number[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/elastic/news/add`

/**
 * Axios API
 * @param {RequestNewsUserDocDto} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostCustomNewsAdd = async (params: RequestNewsUserDocDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @param {RequestNewsUserExcelDocDtoType} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostCustomNewsAddList = async (
  params: RequestNewsUserExcelDocDtoType
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}/excel`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestNewsUserDocDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, RequestNewsUserDocDto>} - mutation 결과
 */
export const usePostCustomNewsAdd = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestNewsUserDocDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, RequestNewsUserDocDto> => {
  return useMutation(apiPostCustomNewsAdd, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestNewsUserDocDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, RequestNewsUserDocDto>} - mutation 결과
 */
export const usePostCustomNewsAddList = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestNewsUserExcelDocDtoType>
): UseMutationResult<BaseResponseCommonObject, AxiosError, RequestNewsUserExcelDocDtoType> => {
  return useMutation(apiPostCustomNewsAddList, options)
}
