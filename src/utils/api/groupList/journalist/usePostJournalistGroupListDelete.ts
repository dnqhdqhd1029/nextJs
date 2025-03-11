/**
 * @file usePostJournalistGroupListDelete.ts
 * @description 언론인 목록을 배열로 받아 삭제
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, DeleteJrnlstListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalistgroup/list/del`

/**
 * Axios API
 * @param {DeleteJrnlstListDto} journalistGroupIds - 사용자 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistGroupListDelete = async (
  journalistGroupIds: DeleteJrnlstListDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, journalistGroupIds, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, DeleteJrnlstListDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, DeleteJrnlstListDto>} - mutation 결과
 */
export const usePostJournalistGroupListDelete = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, DeleteJrnlstListDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, DeleteJrnlstListDto> => {
  return useMutation(apiPostJournalistGroupListDelete, options)
}
