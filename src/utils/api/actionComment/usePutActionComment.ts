/**
 * @file useActionExcel.ts
 * @description 활동 댓글 수정
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyActionCommentDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutActionCommentParams {
  id: number
  info: ModifyActionCommentDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/actioncomment`

/**
 * Axios API
 * @param {UsePutActionCommentParams} { id, info } - id, 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutActionComment = async ({
  id,
  info,
}: UsePutActionCommentParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, info, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutActionCommentParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutActionCommentParams>}
 */
export const usePutActionComment = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutActionCommentParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutActionCommentParams> => {
  return useMutation(apiPutActionComment, options)
}
