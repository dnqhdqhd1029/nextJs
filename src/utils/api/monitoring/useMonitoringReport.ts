/**
 * @file useMonitoringReport.ts
 * @description 모니터링
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject, CreateNewsSrchDto } from '~/types/api/service'
import { useShareMailType, useShareMailTypeProps } from '~/utils/api/shared/useShared'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/newssrch/mail`

const queryPDFKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/report/download/pdf`

export interface useMonitoringReportMailType {
  request: {
    title: string
    userIdList: number[]
    extraMailList: string[]
    content: string
  }
  fileList: File[]
}

/**
 * Axios API with template add
 * @param {useMonitoringReportMailType} params - 추가
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiMonitoringReportAction = async (
  params: useMonitoringReportMailType
): Promise<BaseResponseCommonObject> => {
  const formData = new FormData()

  const blob = new Blob([JSON.stringify(params.request)], {
    type: 'application/json',
  })

  formData.append('request', blob)

  // FileList를 FormData에 추가
  params.fileList.forEach(file => {
    formData.append('fileList', file)
  })

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const response = await axios.post(`${queryKey}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return response.data
}

/**
 * Axios API
 * @param {useMonitoringReportMailType} params - 파라미터
 * @returns {Promise<Blob>}
 */
export const apiGetMonitoringReportPDF = async (
  params: useMonitoringReportMailType
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const formData = new FormData()

  const blob = new Blob([JSON.stringify(params.request)], {
    type: 'application/json',
  })

  formData.append('request', blob)
  const { data } = await axios.post<BaseResponseCommonObject>(`${queryPDFKey}`, formData, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Newsbee-Lang']: locale },
    withCredentials: true,
    responseType: 'blob',
  })
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, useMonitoringReportMailType>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, useMonitoringReportMailType>}
 */
export const useMonitoringReportAction = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, useMonitoringReportMailType>
): UseMutationResult<BaseResponseCommonObject, AxiosError, useMonitoringReportMailType> => {
  return useMutation(apiMonitoringReportAction, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, useMonitoringReportMailType>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, useMonitoringReportMailType>}
 */
export const useMonitoringReportPDFAction = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, useMonitoringReportMailType>
): UseMutationResult<BaseResponseCommonObject, AxiosError, useMonitoringReportMailType> => {
  return useMutation(apiGetMonitoringReportPDF, options)
}
