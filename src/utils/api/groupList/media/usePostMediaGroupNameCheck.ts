/**
 * @file usePostMediaGroupNameCheck.ts
 * @description 미디어 목록 Title 중복 확인
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CheckMediaListNameDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediagroup/checkname`

/**
 * Axios API
 * @param {CheckMediaListNameDto} mediaGroupNameInfo { oldName, newName } - 미디어 목록 Title
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMediaGroupNameCheck = async (
  mediaGroupNameInfo: CheckMediaListNameDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, mediaGroupNameInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckMediaListNameDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CheckMediaListNameDto>} - mutation 결과
 */
export const usePostMediaGroupNameCheck = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckMediaListNameDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CheckMediaListNameDto> => {
  return useMutation(apiPostMediaGroupNameCheck, options)
}
