/**
 * @file usePressReleaseMediaPopup.ts
 * @description 이메일/보도자료배포 미디어자료실
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

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import { UseGetEmailPressReleaseGetParams } from '~/utils/api/emailPressRelease/usePostEmailPressReleaseGet'
import axios from '~/utils/common/axios'

export interface UsePressReleaseMediaPopupParams {
  request: { groupId: number }
  fileList: File[]
}

export interface UseDeletePressReleaseMediaPopupParams {
  id: number
}

export interface UseGetPressReleaseMediaPopupParams {
  dto: {
    groupId: number
    fileType: string
    page: number
    size: number
    sort: string[]
  }
  isProcess: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediafile`

/**
 * Axios API with FormData for File Upload
 * @param {UseDeletePressReleaseMediaPopupParams} params - 요청 데이터와 파일 삭제
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiDeletePressReleaseMediaPopup = async (
  params: UseDeletePressReleaseMediaPopupParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.delete(`${queryKey}/${params.id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return response.data
}

/**
 * Axios API with FormData for File Upload
 * @param {UsePostEmailPressReleaseEditParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPressReleaseMediaPopup = async (
  params: UsePressReleaseMediaPopupParams
): Promise<BaseResponseCommonObject> => {
  const formData = new FormData()

  const blob = new Blob([JSON.stringify(params.request)], {
    type: 'application/json',
  })

  formData.append('request', blob)

  // FileList를 FormData에 추가
  params.fileList.forEach(file => {
    formData.append('fileList', file)
  })

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.post(`${queryKey}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return response.data
}

/**
 * Axios API for File list
 * @param {UseGetPressReleaseMediaPopupParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetPressReleaseMediaPopup = async (
  params: UseGetPressReleaseMediaPopupParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.get(`${queryKey}`, {
    params: params.dto,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })

  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostEmailPressReleaseEditParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostEmailPressReleaseEditParams>}
 */
export const usePressReleaseMediaPopup = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePressReleaseMediaPopupParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePressReleaseMediaPopupParams> => {
  return useMutation(apiPressReleaseMediaPopup, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeletePressReleaseMediaPopupParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostEmailPressReleaseEditParams>}
 */
export const useDeletePressReleaseMediaPopup = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeletePressReleaseMediaPopupParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeletePressReleaseMediaPopupParams> => {
  return useMutation(apiDeletePressReleaseMediaPopup, options)
}

/**
 * Query hook
 * @param {UseGetEmailPressReleaseDraftParams} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetPressReleaseMediaPopup = (
  params: UseGetPressReleaseMediaPopupParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'params' + params.dto.groupId + params.isProcess],
    queryFn: () => apiGetPressReleaseMediaPopup(params),
    enabled: false,
    ...options,
  })
}
