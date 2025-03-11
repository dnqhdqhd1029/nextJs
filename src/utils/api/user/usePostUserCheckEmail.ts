/**
 * @file usePostUserCheckEmail.ts
 * @description 동일한 이메일 사용자 존재 여부 확인
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CheckEmailDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users/checkemail`

/**
 * Axios API
 * @param {CheckEmailDto} { emails } - 이메일 리스트
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostUserCheckEmail = async ({ emails }: CheckEmailDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(
    `${queryKey}`,
    { emails },
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckEmailDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CheckEmailDto>}
 */
export const usePostUserCheckEmail = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckEmailDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CheckEmailDto> => {
  return useMutation(apiPostUserCheckEmail, options)
}
