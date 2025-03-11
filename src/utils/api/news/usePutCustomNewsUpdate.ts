/**
 * @file usePutCustomNewsUpdate.ts
 * @description 그룹명 변경
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestNewsUserDocDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutCustomNewsModifyParams {
  id: number
  info: RequestNewsUserDocDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/elastic/news`

/**
 * Axios API
 * @param {UsePutCustomNewsModifyParams} { id, info } - id, 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutCustomNewsUpdate = async ({
  id,
  info,
}: UsePutCustomNewsModifyParams): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutCustomNewsModifyParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutCustomNewsModifyParams>}
 */
export const usePutCustomNewsUpdate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutCustomNewsModifyParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutCustomNewsModifyParams> => {
  return useMutation(apiPutCustomNewsUpdate, options)
}
