/**
 * @file useDeleteMediaExcluded.ts
 * @description 미디어 발송 차단 해제
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, SearchExcludedTargetDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

interface UseDeleteMediaExcludedParams {
  id: number
  info: SearchExcludedTargetDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/excluded/media`

/**
 * Axios API
 * @param {UseDeleteMediaExcludedParams} params - 차단 해제 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiDeleteMediaExcluded = async ({
  id,
  info,
}: UseDeleteMediaExcludedParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.delete<BaseResponseCommonObject>(`${queryKey}/${id}`, {
    data: info,
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteMediaExcludedParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteMediaExcludedParams>}
 */
export const useDeleteMediaExcluded = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteMediaExcludedParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteMediaExcludedParams> => {
  return useMutation(apiDeleteMediaExcluded, options)
}
