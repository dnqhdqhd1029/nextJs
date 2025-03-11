/**
 * @file useUnauthenticatedUser.ts
 * @description 미인증된 유저 삭제
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UserUnauthenticatedDeleteParams {
  id: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users`

/**
 * Axios API
 * @param {UserUnauthenticatedDeleteParams} { id } - 유저 id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiDeleteUnauthenticatedUser = async ({
  id,
}: UserUnauthenticatedDeleteParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.delete<BaseResponseCommonObject>(`${queryKey}/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UserUnauthenticatedDeleteParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UserUnauthenticatedDeleteParams>}
 */
export const useUnauthenticatedUser = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UserUnauthenticatedDeleteParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UserUnauthenticatedDeleteParams> => {
  return useMutation(apiDeleteUnauthenticatedUser, options)
}
