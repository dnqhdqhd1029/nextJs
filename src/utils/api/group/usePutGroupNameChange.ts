/**
 * @file usePutGroupNameChange.ts
 * @description 그룹명 변경
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CreateGroupDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutGroupNameChangeParams {
  id: number
  groupInfo: CreateGroupDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/groups`

/**
 * Axios API
 * @param {UsePutGroupNameChangeParams} { id, userInfo } - id, 그룹 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutGroupNameChange = async ({
  id,
  groupInfo,
}: UsePutGroupNameChangeParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, groupInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutGroupNameChangeParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutGroupNameChangeParams>}
 */
export const usePutGroupNameChange = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutGroupNameChangeParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutGroupNameChangeParams> => {
  return useMutation(apiPutGroupNameChange, options)
}
