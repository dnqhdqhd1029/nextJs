/**
 * @file useDemoApplyUser.ts
 * @description 데모 신청
 */
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import {
  BaseResponseCommonObject,
  CreateApplySheetDemoForNoUserDto,
  CreateApplySheetSalesForUserDto,
} from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import axios from '~/utils/common/axios'

export type useGetCompanyControlProps = {
  regionList: SelectListOptionItem[]
  companyTypeList: SelectListOptionItem[]
  userCountList: SelectListOptionItem[]
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/nouser/demo`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiDemoApplyUser = async (params: CreateApplySheetDemoForNoUserDto): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, params, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateApplySheetDemoForNoUserDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateApplySheetDemoForNoUserDto>}
 */
export const useDemoApplyUser = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateApplySheetDemoForNoUserDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateApplySheetDemoForNoUserDto> => {
  return useMutation(apiDemoApplyUser, options)
}
