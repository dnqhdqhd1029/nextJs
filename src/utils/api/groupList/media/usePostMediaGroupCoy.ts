/**
 * @file usePost미디어GroupCopy.ts
 * @description 미디어 목록 복사
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CopyMediaListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediagroup/copy`

/**
 * Axios API
 * @param {CopyMediaListDto} copyMediaGroupInfo - 복사할 매체 그룹 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMediaGroupCopy = async (
  copyMediaGroupInfo: CopyMediaListDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, copyMediaGroupInfo, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CopyMediaListDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CopyMediaListDto>} - mutation 결과
 */
export const usePostMediaGroupCopy = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CopyMediaListDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CopyMediaListDto> => {
  return useMutation(apiPostMediaGroupCopy, options)
}
