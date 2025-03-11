/**
 * @file usePostUserRegisterEmail.ts
 * @description 프로필 등록 (최초 이메일 등록)
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

interface UsePostUserRegisterEmailParams {
  email: string
  invitationLifeSpan?: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${API_BASE_URL}${apiVersion}/user/register/email`

/**
 * Axios API
 * @param {UsePostUserRegisterEmailParams} emailInfo - 보낼 사람 이메일
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostUserRegisterEmail = async (
  emailInfo: UsePostUserRegisterEmailParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, emailInfo, {
    // headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    // withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostUserRegisterEmailParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostUserRegisterEmailParams>} - mutation 결과
 */
export const usePostUserRegisterEmail = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostUserRegisterEmailParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostUserRegisterEmailParams> => {
  return useMutation(apiPostUserRegisterEmail, options)
}
