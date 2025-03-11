/**
 * @file usePutCompanyInfo.ts
 * @description 회사 정보 변경
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, ModifyCompanyDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutCompanyInfoParams {
  id: number
  info: {
    request: ModifyCompanyDto
    fileList: File[]
  }
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/company`

/**
 * Axios API
 * @param {UsePutCompanyInfoParams} params - 파라미터
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutCompanyInfo = async ({ id, info }: UsePutCompanyInfoParams): Promise<BaseResponseCommonObject> => {
  const formData = new FormData()

  const blob = new Blob([JSON.stringify(info.request)], {
    type: 'application/json',
  })

  formData.append('request', blob)

  // FileList를 FormData에 추가
  info.fileList.forEach(file => {
    formData.append('fileList', file)
  })

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, formData, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutCompanyInfoParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutCompanyInfoParams>}
 */
export const usePutCompanyInfo = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutCompanyInfoParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutCompanyInfoParams> => {
  return useMutation(apiPutCompanyInfo, options)
}
