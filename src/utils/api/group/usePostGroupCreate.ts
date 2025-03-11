/**
 * @file usePostGroupCreate.ts
 * @description 그룹 추가
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CreateGroupUsersDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/groups/create/add/users`

/**
 * Axios API
 * @param {CreateGroupUsersDto} groupInfo - 그룹명, isDefault
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostGroupCreate = async (groupInfo: CreateGroupUsersDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, groupInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateGroupUsersDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateGroupUsersDto>} - mutation 결과
 */
export const usePostGroupCreate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateGroupUsersDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateGroupUsersDto> => {
  return useMutation(apiPostGroupCreate, options)
}
