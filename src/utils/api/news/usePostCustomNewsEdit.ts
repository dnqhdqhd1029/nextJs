/**
 * @file usePostCustomNewsEdit.ts
 * @description 사용자 추가 뉴스 수정하기
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, RequestNewsUserDocDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

type RequestNewsUserExcelDocDtoType = {
  request: RequestNewsUserDocDto[]
  id: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/elastic/news`

/**
 * Axios API
 * @param {RequestNewsUserExcelDocDtoType} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostCustomNewsEdit = async (
  params: RequestNewsUserExcelDocDtoType
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${params.id}`, params.request, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestNewsUserExcelDocDtoType>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, RequestNewsUserExcelDocDtoType>} - mutation 결과
 */
export const usePostCustomNewsEdit = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, RequestNewsUserExcelDocDtoType>
): UseMutationResult<BaseResponseCommonObject, AxiosError, RequestNewsUserExcelDocDtoType> => {
  return useMutation(apiPostCustomNewsEdit, options)
}
