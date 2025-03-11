/**
 * @file useGetAllUsers.ts
 * @description 로그인 사용자 회사에 속한 사용자 목록 API
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
  SPECIAL_CHARACTERS_PATTERN_EXIST_EMAIL,
} from '~/constants/common'
import type { BaseResponseCommonObject, SearchUserDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetAllUserParams extends SearchUserDto {
  page?: number
  size?: number
  sort?: string[] // ['id,desc', 'name,asc', 'regisAt,desc']
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users`

/**
 * Axios API
 * @param {UseGetAllUserParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
// 쿼리 파라미터를 생성하는 함수
const createApiParams = (params: UseGetAllUserParams): string => {
  const searchParams = new URLSearchParams()

  Object.keys(params).forEach(key => {
    if (key === 'sort') {
      params.sort?.forEach(item => {
        searchParams.append('sort', item)
      })
    } else if (key === 'keyword' && params[key] !== '') {
      const value = params[key as keyof UseGetAllUserParams] as string
      const replacedValue = value.replace(SPECIAL_CHARACTERS_PATTERN_EXIST_EMAIL, '')
      searchParams.append(key, replacedValue)
    } else {
      searchParams.append(key, params[key as keyof UseGetAllUserParams] as string)
    }
  })

  return searchParams.toString()
}

export const apiGetUsers = async (params: UseGetAllUserParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const apiParams = createApiParams(params)

  const url = new URL(queryKey)
  url.search = apiParams

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'X-Mediabee-Lang': locale,
  }

  // const { data } = await axios.get(url.toString(), {
  //   headers,
  //   withCredentials: true,
  // })

  const { data } = await axios.get(`${queryKey}`, {
    params,
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
 * @param {UseGetAllUserParams} params - 목록 조회 시 필요한 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetAllUsers = (
  params: { param: UseGetAllUserParams; enable: boolean },
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params.param],
    queryFn: () => apiGetUsers(params.param),
    enabled: params.enable,
    ...options,
  })
}
