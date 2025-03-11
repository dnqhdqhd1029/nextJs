/**
 * @file useGetEstimateDownload.ts
 * @description 견적사 파일 다운로드
 */
import Cookie from 'js-cookie'

import { API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import { createAxiosAPI, createMutationHook } from '~/utils/common/helper'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/api/estimate/payrequest`

export const apiGetEstimateDownload = createAxiosAPI<number>(id => ({
  url: `${queryKey}/${id}`,
  method: 'download',
  fileName: '견적서.pdf',
}))

export const useGetEstimateDownload = createMutationHook<number>(apiGetEstimateDownload)
