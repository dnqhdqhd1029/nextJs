/**
 * @file useGetOneClipbook.ts
 * @description 클립북 리스트
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

interface UseGetOneClipbookParams {
  clipbookId: number
  groupId: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/clipbook`

/**
 * Axios API
 * @param {UseGetOneClipbookParams} params - 목록 조회 시 필요한 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetOneClipbook = async ({
  clipbookId,
  groupId,
}: UseGetOneClipbookParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${clipbookId}`, {
    params: {
      groupId,
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Clipbookbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {UseGetOneClipbookParams} params
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetOneClipbook = (
  params: UseGetOneClipbookParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetOneClipbook(params),
    ...options,
  })
}
