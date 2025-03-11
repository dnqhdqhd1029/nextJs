/**
 * @file usePostMediaCreate.ts
 * @description 미디어 사용자 추가
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CreateMediaDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/media`

/**
 * Axios API
 * @param {CreateMediaDto} mediaInfo - 미디어 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMediaCreate = async (mediaInfo: CreateMediaDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, mediaInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateMediaDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateMediaDto>} - mutation 결과
 */
export const usePostMediaCreate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateMediaDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateMediaDto> => {
  return useMutation(apiPostMediaCreate, options)
}
/**
 * Axios API
 * @param {CreateMediaDto} mediaInfo - 미디어 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMediaCreateId = async (mediaInfo: CreateMediaDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, mediaInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateMediaDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateMediaDto>} - mutation 결과
 */
export const usePostMediaCreateId = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateMediaDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateMediaDto> => {
  return useMutation(apiPostMediaCreateId, options)
}
