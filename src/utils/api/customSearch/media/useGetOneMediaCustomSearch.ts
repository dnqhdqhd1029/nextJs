/**
 * @file useGetOneMediaCustomSearch.ts
 * @description 미디어 맞춤 검색 정보 확인
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import type { CustomSearchDto } from '~/utils/api/customSearch/journalist/useGetOneJournalistCustomSearch'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediasrch`

/**
 * Axios API
 * @param {CustomSearchDto} customSearchDto - 미디어 맞춤 검색 id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetOneMediaCustomSearch = async ({
  id,
  groupId,
}: CustomSearchDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${id}`, {
    params: { groupId },
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {CustomSearchDto} customSearchDto
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetOneMediaCustomSearch = (
  customSearchDto: CustomSearchDto,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, customSearchDto],
    queryFn: () => apiGetOneMediaCustomSearch(customSearchDto),
    ...options,
  })
}
