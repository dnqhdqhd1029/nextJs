/**
 * @file useAdditionalServicePayment.ts
 * @description 부가서비스 결제
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
import { BaseResponseCommonObject, PayRequestForCardPayDto, PayRequestForPayDto } from '~/types/api/service'
import axios from '~/utils/common/axios'
import { createAxiosAPI, createMutationHook } from '~/utils/common/helper'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/pay/payrequest`
const queryKeyCard = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/api/pay/payrequest/card`
const queryNonUserKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/nouser/pay/payrequest`
const queryNonUserCancelKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/nouser/cancel/payrequest`
const queryCancelKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/cancel/payrequest`
const companyKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/company/get`

export interface AdditionalServicePostProps {
  productId: number
  count: number
}

export interface AdditionalServiceGetProps {
  key: number
  isDone: boolean
}

export interface AdditionalServicePutProps {
  id: number
  request: PayRequestForPayDto
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPayRequestAdditionalServiceDetail = async (idKey: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${idKey}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPayServiceNonUserDetail = async (idKey: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryNonUserKey}/${idKey}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPayRequestAdditionalService = async (
  params: AdditionalServicePostProps
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPayRequestCancel = async (params: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data: responseData } = await axios.put<BaseResponseCommonObject>(
    `${accessToken === '' ? queryNonUserCancelKey : queryCancelKey}/${params}`,
    undefined,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPayRequestAdditionalServiceDoneDeal = async (
  params: AdditionalServicePutProps
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${params.id}`, params.request, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPayRequestNonUserDoneDeal = async (
  params: AdditionalServicePutProps
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data: responseData } = await axios.put<BaseResponseCommonObject>(
    `${queryNonUserKey}/${params.id}`,
    params.request,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return responseData
}

/**
 * Axios API
 * @param {number} id - 파라미터
 * @returns {Promise<Blob>}
 */
export const apiPaymentBillExcel = async (id: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.get<BaseResponseCommonObject>(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/api/estimate/payrequest/${id}`,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
      withCredentials: true,
      responseType: 'blob',
    }
  )
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetCompanyInfo = async (): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${companyKey}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostPayRequestComplete = createAxiosAPI<PayRequestForCardPayDto>(pay_request_for_card_pay_dto => ({
  url: queryKeyCard,
  data: pay_request_for_card_pay_dto,
  method: 'post',
}))

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps>}
 */
export const usePayRequestCancel = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, number>
): UseMutationResult<BaseResponseCommonObject, AxiosError, number> => {
  return useMutation(apiPayRequestCancel, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps>}
 */
export const usePayRequestAdditionalService = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps>
): UseMutationResult<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps> => {
  return useMutation(apiPayRequestAdditionalService, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps>}
 */
export const usePayRequestAdditionalServiceDoneDeal = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, AdditionalServicePutProps>
): UseMutationResult<BaseResponseCommonObject, AxiosError, AdditionalServicePutProps> => {
  return useMutation(apiPayRequestAdditionalServiceDoneDeal, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, AdditionalServicePostProps>}
 */
export const usePayRequestNonUserDoneDeal = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, AdditionalServicePutProps>
): UseMutationResult<BaseResponseCommonObject, AxiosError, AdditionalServicePutProps> => {
  return useMutation(apiPayRequestNonUserDoneDeal, options)
}

/**
 * Query hook
 * @param {AdditionalServiceGetProps} idKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const usePayRequestAdditionalServiceDetail = (
  idKey: AdditionalServiceGetProps,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, idKey.key],
    queryFn: () => apiPayRequestAdditionalServiceDetail(idKey.key),
    enabled: idKey.key > 0 && !idKey.isDone,
    ...options,
  })
}

/**
 * Query hook
 * @param {AdditionalServiceGetProps} idKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const usePayServiceNonUserDetail = (
  idKey: AdditionalServiceGetProps,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, idKey.key],
    queryFn: () => apiPayServiceNonUserDetail(idKey.key),
    enabled: idKey.key > 0 && !idKey.isDone,
    ...options,
  })
}

/**
 * Query hook
 * @param {number} idKey
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetCompanyInfo = (
  idKey: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, 'usePayments_apiGetCompanyInfo'],
    queryFn: () => apiGetCompanyInfo(),
    enabled: idKey > 0,
    ...options,
  })
}

export const usePostPayRequestComplete = createMutationHook<PayRequestForCardPayDto>(apiPostPayRequestComplete)
