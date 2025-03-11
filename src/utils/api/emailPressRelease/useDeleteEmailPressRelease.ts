/**
 * @file useDeleteEmailPressRelease.ts
 * @description 이메일/보도자료배포 삭제(노트, 약속, 전화, 문의)
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestMailingDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UseDeleteEmailPressReleaseParams {
  id: number
  info: RequestMailingDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing`

/**
 * Axios API
 * @param {UseDeleteEmailPressReleaseParams} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiDeleteEmailPressRelease = async ({
  id,
  info,
}: UseDeleteEmailPressReleaseParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.delete<BaseResponseCommonObject>(`${queryKey}/${id}`, {
    data: info,
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteEmailPressReleaseParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteEmailPressReleaseParams>}
 */
export const useDeleteEmailPressRelease = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UseDeleteEmailPressReleaseParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UseDeleteEmailPressReleaseParams> => {
  return useMutation(apiDeleteEmailPressRelease, options)
}
