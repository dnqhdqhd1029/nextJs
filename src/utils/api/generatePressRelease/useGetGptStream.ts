/**
 * @file useGetGptStream.ts
 * @description ChatGPT 호출
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import {
  ACCESS_TOKEN_NAME,
  API_AI_BASE_URL,
  API_BASE_URL,
  API_DEMO_BASE_URL,
  API_VERSION,
  DEMO_LICENSE,
} from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetGptStreamParams {
  product: string
  message: string
  tone: string
  audience: string
  language: string
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${API_AI_BASE_URL}${apiVersion}/svc/callgpt-stream`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetGptStream = async (request: UseGetGptStreamParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}`, {
    params: request,
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })

  // console.log('data.getReader()', data.getReader())
  // const reader = response.data.getReader()
  // const decoder = new TextDecoder('utf-8')
  // let partialMessage = ''

  // while (true) {
  //   const { done, value } = await reader.read()
  //   if (done) break

  //   const chunk = decoder.decode(value)
  //   const lines = chunk.split('\n').filter(line => line.trim() !== '')

  //   for (const line of lines) {
  //     if (line.startsWith('data: ')) {
  //       const json = JSON.parse(line.slice('data: '.length))
  //       const { choices } = json

  //       if (choices && choices[0]?.delta?.content) {
  //         partialMessage += choices[0].delta.content
  //         console.log(partialMessage)
  //       }
  //     }
  //   }
  // }

  return data
}

/**
 * Query hook
 * @param {UseGetGptStreamParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetGptStream = (
  params: UseGetGptStreamParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetGptStream(params),
    ...options,
  })
}
