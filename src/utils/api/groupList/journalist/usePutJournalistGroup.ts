/**
 * @file usePutJournalistGroup.ts
 * @description 언론인 목록 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyJrnlstListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutJournalistGroupParams {
  id: number
  journalistInfo: ModifyJrnlstListDto
}

export interface UseAllJournalistGroupShareCodeParams {
  jrnlstListIdList: number[]
  shareCode: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalistgroup`

/**
 * Axios API
 * @param {UsePutJournalistGroupParams} { id, journalistInfo } - id, 사용자 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutJournalistGroup = async ({
  id,
  journalistInfo,
}: UsePutJournalistGroupParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, journalistInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutJournalistGroupParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutJournalistGroupParams>}
 */
export const usePutJournalistGroup = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutJournalistGroupParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutJournalistGroupParams> => {
  return useMutation(apiPutJournalistGroup, options)
}

export const apiAllJournalistGroupShareCode = async (
  param: UseAllJournalistGroupShareCodeParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}/list/share`, param, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

export const useAllJournalistGroupShareCode = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseAllJournalistGroupShareCodeParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseAllJournalistGroupShareCodeParams> => {
  return useMutation(apiAllJournalistGroupShareCode, options)
}
