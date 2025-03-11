/**
 * @file useGetGroupUserDeleteCheck.ts
 * @description 그룹에 사용자 제거 가능 확인
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGroupUserDeleteCheckParams {
  groupId: number
  userId: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/groups/users/check/delete`

/**
 * Axios API
 * @param {UseGroupUserDeleteCheckParams} groupInfo - 그룹 id, 사용자 id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetGroupUserDeleteCheck = async (
  groupInfo: UseGroupUserDeleteCheckParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}`, {
    params: groupInfo,
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param groupInfo
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetGroupUserDeleteCheck = (
  groupInfo: UseGroupUserDeleteCheckParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, groupInfo],
    queryFn: () => apiGetGroupUserDeleteCheck(groupInfo),
    enabled: groupInfo.groupId > 0 && groupInfo.userId > 0,
    ...options,
  })
}
