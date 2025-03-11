/**
 * @file usePostJournalistContactCreateUpdate.ts
 * @description 언론인 개인적 연락처 추가/수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestContactUserAddedDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/contact/journalist`

/**
 * Axios API
 * @param {RequestContactUserAddedDto} contactInfo - 저장정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistContactCreateUpdate = async (
  contactInfo: RequestContactUserAddedDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, contactInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestContactUserAddedDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, RequestContactUserAddedDto>} - mutation 결과
 */
export const usePostJournalistContactCreateUpdate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestContactUserAddedDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, RequestContactUserAddedDto> => {
  return useMutation(apiPostJournalistContactCreateUpdate, options)
}
