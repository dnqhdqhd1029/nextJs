/**
 * @file usePostMonitoringCreate.ts
 * @description 모니터링 추가
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CreateNewsSrchDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newssrch`

/**
 * Axios API
 * @param {CreateNewsSrchDto} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMonitoringCreate = async (params: CreateNewsSrchDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateNewsSrchDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateNewsSrchDto>} - mutation 결과
 */
export const usePostMonitoringCreate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateNewsSrchDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateNewsSrchDto> => {
  return useMutation(apiPostMonitoringCreate, options)
}
