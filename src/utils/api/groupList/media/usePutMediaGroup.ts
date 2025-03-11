/**
 * @file usePutMediaGroup.ts
 * @description 미디어 목록 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyMediaListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutMediaGroupParams {
  id: number
  mediaInfo: ModifyMediaListDto
}

export interface UseAllMediaGroupShareParams {
  mediaListIdList: number[]
  shareCode: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediagroup`

/**
 * Axios API
 * @param {UsePutMediaGroupParams} { id, journalistInfo } - id, 사용자 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutMediaGroup = async ({
  id,
  mediaInfo,
}: UsePutMediaGroupParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, mediaInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMediaGroupParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMediaGroupParams>}
 */
export const usePutMediaGroup = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutMediaGroupParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutMediaGroupParams> => {
  return useMutation(apiPutMediaGroup, options)
}

export const apiAllMediaGroupShareCode = async (
  param: UseAllMediaGroupShareParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}/list/share`, param, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

export const useAllMediaGroupShareCode = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseAllMediaGroupShareParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseAllMediaGroupShareParams> => {
  return useMutation(apiAllMediaGroupShareCode, options)
}
