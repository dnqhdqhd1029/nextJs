/**
 * @file usePurchaseRequest.ts
 * @description 구매 신청
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
import type { BaseResponseCommonObject, CreateApplySheetSalesForUserDto } from '~/types/api/service'
import type { SelectListOptionItem } from '~/types/common'
import axios from '~/utils/common/axios'

export type apiFirstRegisterUserProps = {
  id: number
  request: {
    name: string
    nickname: string
    passwd: string
    mobile: string
    phone: string
    receiveLetter: boolean
  }
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

export const apiFirstRegisterUser = async (params: apiFirstRegisterUserProps): Promise<BaseResponseCommonObject> => {
  const { data } = await axios.put(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/auth/users/${params.id}`,
    params.request
  )
  return data
}

export const apiAdminRegisterUser = async (params: apiFirstRegisterUserProps): Promise<BaseResponseCommonObject> => {
  const { data } = await axios.put(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/auth/users/admin/${params.id}`,
    params.request
  )
  return data
}

export const apiAdminConfirmRegisterUser = async (params: number): Promise<BaseResponseCommonObject> => {
  const { data } = await axios.put(
    `${
      Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
    }${apiVersion}/svc/auth/users/confirm/admin/${params}`
  )
  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps>}
 */
export const useFirstRegisterUser = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps>
): UseMutationResult<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps> => {
  return useMutation(apiFirstRegisterUser, options)
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps>}
 */
export const useAdminRegisterUser = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps>
): UseMutationResult<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps> => {
  return useMutation(apiAdminRegisterUser, options)
}
/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, apiFirstRegisterUserProps>}
 */
export const useAdminConfirmRegisterUser = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, number>
): UseMutationResult<BaseResponseCommonObject, AxiosError, number> => {
  return useMutation(apiAdminConfirmRegisterUser, options)
}
