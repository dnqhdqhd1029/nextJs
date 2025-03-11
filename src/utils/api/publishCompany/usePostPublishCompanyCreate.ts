/**
 * @file usePostPublishCompanyCreate.ts
 * @description 태그 추가. category: NEWS / ACTION
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestNwPublishCompanyDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/publish/company`

/**
 * Axios API
 * @param {RequestNwPublishCompanyDto} createPubComDto - 생성 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostPublishCompanyCreate = async (
  createPubComDto: RequestNwPublishCompanyDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, createPubComDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestNwPublishCompanyDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, RequestNwPublishCompanyDto>} - mutation 결과
 */
export const usePostPublishCompanyCreate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestNwPublishCompanyDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, RequestNwPublishCompanyDto> => {
  return useMutation(apiPostPublishCompanyCreate, options)
}
