/**
 * @file useGetClipbooks.ts
 * @description 클립북 리스트
 */
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetClipbooksParams {
  title?: string
  shareCode?: string
  type?: string
  groupId: number
  ownerId?: number
  page: number
  size: number
  sort: string
}

export interface UseGetClipbooksPrjListParams {
  groupId: number
  keyword: string
}

export interface getClipbooksPrjListParams {
  mailingId: number
  companyId: number
  groupId: number
  title: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/clipbook`

/**
 * Axios API
 * @param {UseGetClipbooksParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetClipbooks = async (params: UseGetClipbooksParams): Promise<BaseResponseCommonObject> => {
  if (params.groupId < 0) {
    return Promise.resolve({
      status: 'S',
      data: [],
      message: {
        code: '200',
        message: '',
      },
    } as BaseResponseCommonObject)
  }

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const newParams: UseGetClipbooksParams = {
    ...params,
  }
  if (newParams.title === '') {
    delete newParams.title
  }
  if (newParams.type === '') {
    delete newParams.type
  }
  if (newParams.shareCode === '') {
    delete newParams.shareCode
  }
  if (newParams.ownerId && newParams.ownerId < 1) {
    delete newParams.ownerId
  }

  const { data } = await axios.get(`${queryKey}`, {
    params: newParams,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Clipbookbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @param {UseGetClipbooksPrjListParams} params - 사용자 id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetClipbooksPrjList = async (
  params: UseGetClipbooksPrjListParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/mailing/pr`,
    {
      params,
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return data
}

/**
 * Query hook
 * @param {UseGetClipbooksParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetClipbooks = (
  params: UseGetClipbooksParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetClipbooks(params),
    ...options,
  })
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseGetClipbooksParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UseGetClipbooksParams>} - mutation 결과
 */
export const usePostClipbooks = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseGetClipbooksParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseGetClipbooksParams> => {
  return useMutation(apiGetClipbooks, options)
}

/**
 * Query hook
 * @param {UseGetClipbooksPrjListParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetClipbooksPrjList = (
  params: UseGetClipbooksPrjListParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetClipbooksPrjList(params),
    ...options,
  })
}
