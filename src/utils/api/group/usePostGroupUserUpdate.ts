/**
 * @file usePostGroupUserUpdate.ts
 * @description 기존 그룹에 전체 사용자 갱신
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, GroupUsersDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/groups/users/updateall`

/**
 * Axios API
 * @param {GroupUsersDto} groupInfo { groupId, users } - 그룹 id, 사용자 id 배열
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostGroupUserUpdate = async (groupInfo: GroupUsersDto): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, GroupUsersDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, GroupUsersDto>} - mutation 결과
 */
export const usePostGroupUserUpdate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, GroupUsersDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, GroupUsersDto> => {
  return useMutation(apiPostGroupUserUpdate, options)
}
