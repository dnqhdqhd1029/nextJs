/**
 * @file usePostTagCreate.ts
 * @description 태그 추가. category: NEWS / ACTION
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CreateTagDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/tag`

/**
 * Axios API
 * @param {CreateTagDto} createTagDto - 생성 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostTagCreate = async (createTagDto: CreateTagDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, createTagDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateTagDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateTagDto>} - mutation 결과
 */
export const usePostTagCreate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateTagDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateTagDto> => {
  return useMutation(apiPostTagCreate, options)
}
