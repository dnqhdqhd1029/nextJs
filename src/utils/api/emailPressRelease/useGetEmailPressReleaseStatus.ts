/**
 * @file useGetEmailPressReleaseStatus.ts
 * @description 이메일/보도자료배포 중 수정 가능한 초안 상태 목록 조회
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseGetEmailPressReleaseStatusParams {
  id: number
  groupId: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing/status`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetEmailPressReleaseStatus = async ({
  id,
  groupId,
}: UseGetEmailPressReleaseStatusParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? null
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${id}`, {
    params: {
      groupId,
    },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })

  return data
}
/**
 * Query hook
 * @param {UseGetEmailPressReleaseStatusParams} params - 파라미터
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetEmailPressReleaseStatus = (
  params: UseGetEmailPressReleaseStatusParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => apiGetEmailPressReleaseStatus(params),
    ...options,
  })
}
