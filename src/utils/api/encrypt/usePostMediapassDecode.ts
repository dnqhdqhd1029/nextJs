/**
 * @file usePostMediapassDecode.ts
 * @description 미디어패스 복호화
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestEncDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePostMediapassDecodeParams {
  type: string
  info: RequestEncDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKeyElasticSearch = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/auth/mpdec/rep`
const queryKeyDbEmailTel = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/auth/mpdec/base`
const queryKeyDbName = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/auth/mpdec/rep`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMediapassDecode = async ({
  type,
  info,
}: UsePostMediapassDecodeParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  let apiUrl = ''
  switch (type) {
    case 'ELASTIC_SEARCH':
      apiUrl = queryKeyElasticSearch
      break
    case 'DB_EMAIL_TEL':
      apiUrl = queryKeyDbEmailTel
      break
    case 'DB_NAME':
      apiUrl = queryKeyDbName
      break
  }

  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${apiUrl}`, info, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestEncDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, RequestEncDto>}
 */
export const usePostMediapassDecode = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePostMediapassDecodeParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePostMediapassDecodeParams> => {
  return useMutation(apiPostMediapassDecode, options)
}
