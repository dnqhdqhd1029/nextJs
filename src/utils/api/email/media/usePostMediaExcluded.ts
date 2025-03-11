/**
 * @file usePostMediaExcluded.ts
 * @description 미디어 차단
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestExcludedTargetDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/excluded/media`

/**
 * Axios API
 * @param {RequestExcludedTargetDto} mediaInfo - 미디어 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMediaExcluded = async (mediaInfo: RequestExcludedTargetDto): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestExcludedTargetDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, RequestExcludedTargetDto>} - mutation 결과
 */
export const usePostMediaExcluded = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestExcludedTargetDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, RequestExcludedTargetDto> => {
  return useMutation(apiPostMediaExcluded, options)
}
