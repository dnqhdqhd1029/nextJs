/**
 * @file usePostGroupNameCheck.ts
 * @description 그룹명 중복 확인
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CheckGroupNameDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/groups/checkname`

/**
 * Axios API
 * @param {CheckGroupNameDto} groupNameInfo { oldName, newName } - 그룹명
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostGroupNameCheck = async (groupNameInfo: CheckGroupNameDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, groupNameInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckGroupNameDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CheckGroupNameDto>} - mutation 결과
 */
export const usePostGroupNameCheck = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckGroupNameDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CheckGroupNameDto> => {
  return useMutation(apiPostGroupNameCheck, options)
}
