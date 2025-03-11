/**
 * @file useGetAdditionsProduct.ts
 * @description 부가 서비스
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

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import {
  AddInquiryForNoUserRequest,
  BaseResponseCommonObject,
  type CreateInquiryForNoUserDto,
} from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/additions`

export interface UsePostInquiryParams {
  request: {
    whyCode: string
    title: string
    content: string
  }
  fileList: File[]
}

export interface UsePostNonUserInquiryParams {
  request: CreateInquiryForNoUserDto
  fileList: File[]
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetAdditionsProduct = async (): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/product`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetAdditionsProductDetail = async (idKey: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/product/${idKey}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API with FormData for File Upload
 * @param {UsePostEmailPressReleaseCreateParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiInquiry = async (params: UsePostInquiryParams): Promise<BaseResponseCommonObject> => {
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

  const response = await axios.post(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/inquiry`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Mediabee-Lang': locale,
      },
      withCredentials: true,
    }
  )

  return response.data
}

/**
 * Axios API with FormData for File Upload
 * @param {UsePostEmailPressReleaseCreateParams} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiNonUserInquiry = async (params: UsePostNonUserInquiryParams): Promise<BaseResponseCommonObject> => {
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

  const response = await axios.post(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/nouser/inquiry`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Mediabee-Lang': locale,
      },
      withCredentials: true,
    }
  )

  return response.data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostNonUserInquiryParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostNonUserInquiryParams>}
 */
export const usePostNonUserInquiry = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostNonUserInquiryParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostNonUserInquiryParams> => {
  return useMutation(apiNonUserInquiry, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostInquiryParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostInquiryParams>}
 */
export const usePostInquiry = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostInquiryParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostInquiryParams> => {
  return useMutation(apiInquiry, options)
}

/**
 * Query hook
 * @param {number} idKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetAdditionsProduct = (
  idKey: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'apiGetAdditionsProduct'],
    queryFn: () => apiGetAdditionsProduct(),
    enabled: idKey > 0,
    ...options,
  })
}

/**
 * Query hook
 * @param {number} idKey
 * @param {idKey: number, UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetAdditionsProductDetail = (
  idKey: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, idKey],
    queryFn: () => apiGetAdditionsProductDetail(idKey),
    enabled: idKey > 13,
    ...options,
  })
}
