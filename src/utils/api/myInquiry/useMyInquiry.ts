/**
 * @file useMyInquiry.ts
 * @description 내문의
 */

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE, SPECIAL_CHARACTERS_PATTERN } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import { UseGetPayRequestParams } from '~/utils/api/payRequest/useGetPayRequest'
import axios from '~/utils/common/axios'

export interface UseGetMyInquiryListParamsProps {
  paramData: UseGetMyInquiryListParams
  userId: number
}
export interface UseGetMyInquiryListParams {
  pageableDto: pageableDtoParams
  requestDto: {
    title: string
  }
}

export interface pageableDtoParams {
  page: number
  size: number
  sort: string[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/inquiry`

/**
 * Axios API for File list
 * @param {UseGetMyInquiryListParams} params - 요청 데이터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetMyInquiryDetail = async (params: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${params}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Axios API for File list
 * @param {UseGetMyInquiryListParams} params - 요청 데이터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetMyInquiryList = async (params: UseGetMyInquiryListParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(
    `${queryKey}?page=${params.pageableDto.page}&size=${params.pageableDto.size}&sort=${params.pageableDto.sort}`,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }
  )
  return data
}

/**
 * Query hook
 * @param {UseGetMyInquiryListParamsProps} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const UseGetMyInquiryList = (
  params: UseGetMyInquiryListParamsProps,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params.paramData],
    queryFn: () => apiGetMyInquiryList(params.paramData),
    enabled: params.userId > 0,
    ...options,
  })
}

/**
 * Query hook
 * @param {UseGetMyInquiryListParams} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const UseGetMyInquiryDetail = (
  params: number,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetMyInquiryDetail(params),
    enabled: params > 0,
    ...options,
  })
}
