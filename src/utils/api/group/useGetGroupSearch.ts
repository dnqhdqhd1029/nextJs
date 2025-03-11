/**
 * @file useGetGroupSearch.ts
 * @description 로그인 사용자의 회사내 그룹 목록
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

import {
  ACCESS_TOKEN_NAME,
  API_BASE_URL,
  API_DEMO_BASE_URL,
  API_VERSION,
  DEMO_LICENSE,
  SPECIAL_CHARACTERS_PATTERN,
} from '~/constants/common'
import type { BaseResponseCommonObject, SearchGroupDto, UserDto } from '~/types/api/service'
import { UseGetJournalistGroupParams } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { UseGetAllUserParams } from '~/utils/api/user/useGetAllUsers'
import axios from '~/utils/common/axios'

export interface GroupDto {
  groupId: number
  count: number
  isDefault: boolean | null
  name: string
  regisAt: string | null
  regisBy: number | null
  regisName: string | null
  users: UserDto[]
  register: UserDto | null
  lastLoginAt: string | null
}

export interface UseGetGroupSearchParams extends SearchGroupDto {
  page?: number
  size?: number
  sort?: string[] // ['id,desc', 'name,asc', 'regisAt,desc']
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/groups/search`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetActiveGroupInfo = async (id: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/groups/${id}/active`,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return data
}

/**
 * Axios API
 * @param {UseGetGroupSearchParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetGroupSearch = async (params: UseGetGroupSearchParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  let apiParams = { ...params }
  if (params.userId && params.userId > 0) {
    apiParams.userId = params.userId
  } else {
    delete apiParams.userId
  }

  const { data } = await axios.get(`${queryKey}`, {
    params: apiParams,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {UseGetGroupSearchParams} params - 목록 조회 시 필요한 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetGroupSearch = (
  params: { param: UseGetGroupSearchParams; enable: boolean },
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params.param],
    queryFn: () => apiGetGroupSearch(params.param),
    enabled: params.enable,
    ...options,
  })
}
