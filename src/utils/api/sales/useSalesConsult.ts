/**
 * @file useSalesConsult.ts
 * @description 구매 상담
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_VERSION } from '~/constants/common'
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
const queryKey = `${API_BASE_URL}${apiVersion}/svc/nouser/sales`

/**
 * Axios API
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiSalesConsult = async (params: CreateApplySheetSalesForUserDto): Promise<BaseResponseCommonObject> => {
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
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateApplySheetSalesForUserDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, CreateApplySheetSalesForUserDto>}
 */
export const useSalesConsult = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, CreateApplySheetSalesForUserDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, CreateApplySheetSalesForUserDto> => {
  return useMutation(apiSalesConsult, options)
}
