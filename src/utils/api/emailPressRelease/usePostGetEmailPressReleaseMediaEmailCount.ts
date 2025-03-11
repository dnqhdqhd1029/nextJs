/**
 * @file usePostGetEmailPressReleaseMediaEmailCount.ts
 * @description 이메일/보도자료배포 추가
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestMediaListMailCountDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mailing/medialist/mailcount`

/**
 * Axios API with FormData for File Upload
 * @param {RequestMediaListMailCountDto} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostGetEmailPressReleaseMediaEmailCount = async (
  params: RequestMediaListMailCountDto
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestMediaListMailCountDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, RequestMediaListMailCountDto>}
 */
export const usePostGetEmailPressReleaseMediaEmailCount = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestMediaListMailCountDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, RequestMediaListMailCountDto> => {
  return useMutation(apiPostGetEmailPressReleaseMediaEmailCount, options)
}
