/**
 * @file useContactInfo.ts
 * @description 연락처 정보 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ChangeContactInfoDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users/contact`

/**
 * Axios API
 * @param {ChangeContactInfoDto} { contactInfo } - 연락처 정보 수정 값
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiContactInfo = async (contactInfo: ChangeContactInfoDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}`, contactInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, ChangeContactInfoDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, ChangeContactInfoDto>}
 */
export const usePutContactInfo = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, ChangeContactInfoDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, ChangeContactInfoDto> => {
  return useMutation(apiContactInfo, options)
}
