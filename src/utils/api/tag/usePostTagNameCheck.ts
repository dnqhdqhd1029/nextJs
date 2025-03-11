/**
 * @file usePostTagNameCheck.ts
 * @description 태그 이름 중복 체크
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CheckTagNameDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/tag/checkname`

/**
 * Axios API
 * @param {CheckTagNameDto} params { oldName, newName } - 기존 이름, 새로운 이름
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostTagNameCheck = async (params: CheckTagNameDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckTagNameDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CheckTagNameDto>} - mutation 결과
 */
export const usePostTagNameCheck = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckTagNameDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CheckTagNameDto> => {
  return useMutation(apiPostTagNameCheck, options)
}
