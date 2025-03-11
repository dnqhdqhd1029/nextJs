/**
 * @file usePostUserPasswordCheck.ts
 * @description 사용자 비밀번호 확인
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CheckPasswordDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users/checkpasswd`

/**
 * Axios API
 * @param {CheckPasswordDto} password - 사용자 비밀번호
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostUserPassowordCheck = async ({ password }: CheckPasswordDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(
    `${queryKey}`,
    { password },
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckPasswordDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CheckPasswordDto>}
 */
export const usePostUserPasswordCheck = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckPasswordDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CheckPasswordDto> => {
  return useMutation(apiPostUserPassowordCheck, options)
}
