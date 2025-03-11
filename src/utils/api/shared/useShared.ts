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
}${apiVersion}/svc/share/mail`

export interface useShareMailTypeProps {
  title: string
  userIdList: number[]
  extraMailList: string[]
  body: string
  content: string
  link: string
}

export interface useShareMailType {
  request: useShareMailTypeProps
  fileList: File[]
}

/**
 * Axios API with template add
 * @param {number} params - 추가
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiShareMailCancel = async (params: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.put(`${queryKey}/cancel/${params}`, params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return response.data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, useMailtemplateListAddType>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, useMailtemplateListAddType>}
 */
export const useShareMailCancel = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, number>
): UseMutationResult<BaseResponseCommonObject, AxiosError, number> => {
  return useMutation(apiShareMailCancel, options)
}
//
// /**
//  * Axios API with template add
//  * @param {useShareMailType} params - 추가
//  * @returns {Promise<BaseResponseCommonObject>}
//  */
// export const apiShareMail = async (params: useShareMailType): Promise<BaseResponseCommonObject> => {
//   const formData = new FormData()
//
//   const blob = new Blob([JSON.stringify(params.request)], {
//     type: 'multipart/form-data',
//   })
//
//   formData.append('request', blob)
//
//   // FileList를 FormData에 추가
//   params.fileList.forEach(file => {
//     formData.append('fileList', file)
//   })
//
//   const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
//   const locale = Cookie.get('locale') ?? 'ko'
//
//   const response = await axios.post(`${queryKey}`, params, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'X-Mediabee-Lang': locale,
//     },
//     withCredentials: true,
//   })
//
//   return response.data
// }

/**
 * Axios API with template add
 * @param {useShareMailType} params - 추가
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiShareMail = async (params: useShareMailType): Promise<BaseResponseCommonObject> => {
  const formData = new FormData()

  const blob = new Blob([JSON.stringify(params.request)], {
    type: 'application/json',
  })

  formData.append('request', blob)

  params.fileList.forEach(file => {
    formData.append('fileList', file)
  })

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  console.log('params', params)
  const response = await axios.post(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/share/mail`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Mediabee-Lang': locale,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
  )

  return response.data
}
/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, useMailtemplateListAddType>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, useMailtemplateListAddType>}
 */
export const useShareMailSender = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, useShareMailType>
): UseMutationResult<BaseResponseCommonObject, AxiosError, useShareMailType> => {
  return useMutation(apiShareMail, options)
}
