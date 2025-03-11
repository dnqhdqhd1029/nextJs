/**
 * @file usePostJournalistCreate.ts
 * @description 언론인 사용자 추가
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CreateJournalistDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalists`

export interface CreateJournalistDtoList {
  createJournalistDtoList: CreateJournalistDto[]
}

/**
 * Axios API
 * @param {CreateJournalistDto} journalistInfo - 언론인 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistCreate = async (
  journalistInfo: CreateJournalistDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, journalistInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateJournalistDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateJournalistDto>} - mutation 결과
 */
export const usePostJournalistCreate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateJournalistDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateJournalistDto> => {
  return useMutation(apiPostJournalistCreate, options)
}

/**
 * Axios API
 * @param {CreateJournalistDtoList} journalistInfo - 언론인 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistCreateArray = async (
  journalistInfo: CreateJournalistDtoList
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}/array`, journalistInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @param {CreateJournalistDto} journalistInfo - 언론인 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistCreateId = async (
  journalistInfo: CreateJournalistDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, journalistInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateJournalistDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateJournalistDto>} - mutation 결과
 */
export const usePostJournalistCreateId = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateJournalistDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateJournalistDto> => {
  return useMutation(apiPostJournalistCreateId, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateJournalistDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateJournalistDto>} - mutation 결과
 */
export const usePostJournalistCreateArray = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateJournalistDtoList>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateJournalistDtoList> => {
  return useMutation(apiPostJournalistCreateArray, options)
}
