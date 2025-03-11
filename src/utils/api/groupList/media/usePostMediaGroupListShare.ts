/**
 * @file usePostMediaGroupListShare.ts
 * @description 미디어 목록 공유 설정을 배열로 받아 한번에 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, EditSharePolicyMediaListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediagroup/list/share`

/**
 * Axios API
 * @param {EditSharePolicyMediaListDto} mediaGroupListShareInfo - 미디어 목록 공유 설정
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMediaGroupListShare = async (
  mediaGroupListShareInfo: EditSharePolicyMediaListDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, mediaGroupListShareInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, EditSharePolicyMediaListDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, EditSharePolicyMediaListDto>} - mutation 결과
 */
export const usePostMediaGroupListShare = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, EditSharePolicyMediaListDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, EditSharePolicyMediaListDto> => {
  return useMutation(apiPostMediaGroupListShare, options)
}
