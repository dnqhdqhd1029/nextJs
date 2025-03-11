/**
 * @file usePostMonitoringNameCheck.ts
 * @description 모니터링 Title 중복 확인
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CheckNameDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newssrch/checkname`

/**
 * Axios API
 * @param {CheckNameDto} checkNameDto - 중복 확인할 이름
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMonitoringNameCheck = async (checkNameDto: CheckNameDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, checkNameDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckNameDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CheckNameDto>} - mutation 결과
 */
export const usePostMonitoringNameCheck = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CheckNameDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CheckNameDto> => {
  return useMutation(apiPostMonitoringNameCheck, options)
}
