/**
 * @file useMailTemplateRelease.ts
 * @description 태그 삭제
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

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailtemplate`

export interface useMailtemplateListAddType {
  title: string
  content: string
  groupId: number
  isDefault: boolean
}

/**
 * Axios API with FormData for File Upload
 * @param {UseDeletePressReleaseMediaPopupParams} params - 요청 데이터와 파일 삭제
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiMailtemplateList = async (): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.get(`${queryKey}/list`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return response.data
}

/**
 * Axios API with template delete
 * @param params - 삭제
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiMailtemplateListDelete = async (params: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.delete(`${queryKey}/${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return response.data
}

/**
 * Axios API with template add
 * @param {useMailtemplateListAddType} params - 추가
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiMailtemplateListAdd = async (params: useMailtemplateListAddType): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.post(`${queryKey}`, params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return response.data
}

/**
 * Query hook
 * @param - 파라미터
 * @param {string} idKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetMailtemplateList = (
  idKey: string,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'useGetMailtemplateList' + idKey],
    queryFn: () => apiMailtemplateList(),
    ...options,
  })
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeletePressReleaseMediaPopupParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostEmailPressReleaseEditParams>}
 */
export const useMailtemplateListDelete = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, number>
): UseMutationResult<BaseResponseCommonObject, AxiosError, number> => {
  return useMutation(apiMailtemplateListDelete, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, useMailtemplateListAddType>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, useMailtemplateListAddType>}
 */
export const useMailtemplateListAdd = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, useMailtemplateListAddType>
): UseMutationResult<BaseResponseCommonObject, AxiosError, useMailtemplateListAddType> => {
  return useMutation(apiMailtemplateListAdd, options)
}
