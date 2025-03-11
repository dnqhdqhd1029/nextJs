/**
 * @file useEmailVerification.ts
 * @description 이메일 인증 API
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import axios from 'axios'
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'

interface UseUserEmailVerificationParams {
  encUrl: string
  locale?: string
}

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}/verification/email`

/**
 * Axios API
 * @param {UseUserEmailVerificationParams} { encUrl, locale } - 사용자 이메일 인증 url
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetAuth = async ({
  encUrl,
  locale,
}: UseUserEmailVerificationParams): Promise<BaseResponseCommonObject> => {
  const { data } = await axios.get(`${queryKey}/${encUrl}`, {
    headers: { ['X-Mediabee-Lang']: locale },
  })
  console.log('>> [useEmailVerification] apiGetAuth', data)
  return data
}

/**
 * Query hook
 * @param {UseUserEmailVerificationParams} { encUrl, locale } - 사용자 이메일 인증 url
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useEmailVerification = (
  { encUrl, locale }: UseUserEmailVerificationParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, { encUrl, locale }],
    queryFn: () => apiGetAuth({ encUrl, locale }),
    ...options,
  })
}
