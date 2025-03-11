/**
 * @file useDeleteJournalistGroup.ts
 * @description 언론인 목록 삭제
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseDeleteJournalistGroupParams {
  id: number
}

export interface UseAllDeleteJournalistGroupParams {
  jrnlstListIdList: number[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalistgroup`

/**
 * Axios API
 * @param {UseDeleteJournalistGroupParams} { id } - 언론인 목록 id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiDeleteJournalistGroup = async ({
  id,
}: UseDeleteJournalistGroupParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.delete<BaseResponseCommonObject>(`${queryKey}/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteGroupParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteGroupParams>}
 */
export const useDeleteJournalistGroup = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteJournalistGroupParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteJournalistGroupParams> => {
  return useMutation(apiDeleteJournalistGroup, options)
}

export const apiAllDeleteJournalistGroup = async (
  params: UseAllDeleteJournalistGroupParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}/list/del`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

export const useAllDeleteJournalistGroup = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseAllDeleteJournalistGroupParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseAllDeleteJournalistGroupParams> => {
  return useMutation(apiAllDeleteJournalistGroup, options)
}
