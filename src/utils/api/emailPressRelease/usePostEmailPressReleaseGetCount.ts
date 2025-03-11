/**
 * @file usePostEmailPressReleaseGetCount.ts
 * @description 메일 목록 총개수 확인(총 수신자수, 수신거부, 발송차단)
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestMailingMailListDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing/getcount`

/**
 * Axios API with FormData for File Upload
 * @param {RequestMailingMailListDto} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
const apiPostEmailPressReleaseGetCount = async (
  params: RequestMailingMailListDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.post(queryKey, params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return response.data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestMailingMailListDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, RequestMailingMailListDto>}
 */
export const usePostEmailPressReleaseGetCount = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestMailingMailListDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, RequestMailingMailListDto> => {
  return useMutation(apiPostEmailPressReleaseGetCount, options)
}
