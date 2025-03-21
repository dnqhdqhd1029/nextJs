/**
 * @file usePostEmailPressReleaseGet.ts
 * @description 이메일/보도자료배포 정보
 */

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'
import { enabled } from 'store'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetEmailPressReleaseGetParams {
  id: number
  groupId: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetEmailPressReleaseGet = async (
  params: UseGetEmailPressReleaseGetParams
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.get(`${queryKey}/${params.id}`, {
    params: { groupId: params.groupId },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })

  return data
}
/**
 * Query hook
 * @param {UseGetEmailPressReleaseGetParams} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const usePostEmailPressReleaseGet = (
  params: UseGetEmailPressReleaseGetParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetEmailPressReleaseGet(params),
    enabled: params.id > 0 && params.groupId > 0,
    ...options,
  })
}
