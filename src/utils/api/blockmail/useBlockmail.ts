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

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestActionDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/nomail`

export interface BlockedInfoParams {
  fr: string
  to: string
  key: string
}

export interface BlockedUserParams {
  from: string
  to: string
  mailRcvId: number
  journalistId: number
  mediaId: number
}

export interface UnBlockedUserParams {
  from: string
  to: string
  blockedUserId: number
}

/**
 * Axios API
 * @param {BlockedInfoParams} paramKey - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const unblockmailInfo = async (paramKey: BlockedInfoParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/blockinfo`, {
    params: paramKey,
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @param {BlockedInfoParams} paramKey - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const blockmailInfo = async (paramKey: BlockedInfoParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/mailinfo`, {
    params: paramKey,
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @param {BlockedUserParams} paramKey - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiBlockUserAction = async (paramKey: BlockedUserParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  console.log('accessToken', accessToken)

  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}/blockuser`, paramKey, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @param {UnBlockedUserParams} paramKey - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiUnBlockUserAction = async (paramKey: UnBlockedUserParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  console.log('accessToken', accessToken)

  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}/unblockuser`, paramKey, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, string>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, string>}
 */
export const useUnBlockUserAction = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UnBlockedUserParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UnBlockedUserParams> => {
  return useMutation(apiUnBlockUserAction, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, string>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, string>}
 */
export const useBlockUserAction = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, BlockedUserParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, BlockedUserParams> => {
  return useMutation(apiBlockUserAction, options)
}

/**
 * Query hook
 * @param {BlockedInfoParams} paramsKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetBlockmailInfo = (
  paramsKey: BlockedInfoParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'blockmailInfo'],
    queryFn: () => blockmailInfo(paramsKey),
    ...options,
  })
}

/**
 * Query hook
 * @param {BlockedInfoParams} paramsKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetUnBlockmailInfo = (
  paramsKey: BlockedInfoParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'unblockmailInfo'],
    queryFn: () => unblockmailInfo(paramsKey),
    ...options,
  })
}
