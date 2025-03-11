/**
 * @file usePutJournalistImageDelete.ts
 * @description 사용자 추가 언론인 사진 삭제
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalists/photo/delete`

/**
 * Axios API
 * @param {Number} id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutJournalistImageDelete = async (id: Number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, undefined, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, Number>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, Number>}
 */
export const usePutJournalistImageDelete = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, Number>
): UseMutationResult<BaseResponseCommonObject, AxiosError, Number> => {
  return useMutation(apiPutJournalistImageDelete, options)
}
