/**
 * @file usePutJournalist.ts
 * @description 사용자 추가 언론인 수정하기
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyJournalistDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutJournalistParams {
  id: number
  info: ModifyJournalistDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalists`

/**
 * Axios API
 * @param {UsePutJournalistParams} { id, info } - 수정 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutJournalist = async ({ id, info }: UsePutJournalistParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, info, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutJournalistParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutJournalistParams>}
 */
export const usePutJournalist = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutJournalistParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutJournalistParams> => {
  return useMutation(apiPutJournalist, options)
}
