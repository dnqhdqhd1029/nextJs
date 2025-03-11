/**
 * @file useUserInfoRegister.ts
 * @description 인증 메일을 통해 들어온 사용자 정보 최초 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyUserFirstDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

interface UseFirstUserInfoParams {
  id: number
  userInfo: ModifyUserFirstDto
  locale?: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/auth/users`
const internalUrl = `/api/put/register-verified-user-info/`

/**
 * Axios API
 * @param {ModifyUserFirstDto} data - accessToken, locale
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutFirstUserInfo = async ({
  id,
  userInfo,
  locale,
}: UseFirstUserInfoParams): Promise<BaseResponseCommonObject> => {
  const result = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, userInfo, {
    headers: { ['X-Mediabee-Lang']: locale },
  })
  return result.data
}

/**
 * Axios API(Internal)
 * @param id
 * @param userInfo
 * @param locale
 */
export const apiInternalPutFirstUserInfo = async ({ id, userInfo, locale }: UseFirstUserInfoParams) => {
  return await axios.put(`${internalUrl}/${id}`, {
    id,
    userInfo,
    locale,
  })
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseFirstUserInfoParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UseFirstUserInfoParams>}
 */
export const useUserInfoRegister = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseFirstUserInfoParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseFirstUserInfoParams> => {
  return useMutation(apiPutFirstUserInfo, options)
}
