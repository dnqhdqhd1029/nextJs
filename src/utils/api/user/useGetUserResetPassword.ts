/**
 * @file useGetUserResetPassword.ts
 * @description 관리자가 사용자에게 비밀번호 재설정 메일을 보냄
 */
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_BASE_URL, API_DEMO_BASE_URL, API_VERSION, DEMO_LICENSE } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

interface UseUserResetPasswordParams {
  id: number
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/users`
const afterQuery = '/send/resetpassword'

/**
 * Axios API
 * @param {UseUserResetPasswordParams} { id } - 사용자 id
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiGetUserResetPassword = async ({
  id,
}: UseUserResetPasswordParams): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${id}${afterQuery}`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

export const apiGetUserRegistReMailing = async (id: number): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.get(`${queryKey}/${id}/send/firstregist`, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return data
}

/**
 * Query hook
 * @param {UseUserResetPasswordParams} {id} - 아이디
 * @param {UseQueryOptions<BaseResponseCommonObject, AxiosError>} options - 옵션
 * @returns {UseQueryResult<BaseResponseCommonObject, AxiosError>}
 */
export const useGetUserResetPasswor = (
  { id }: UseUserResetPasswordParams,
  options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
  return useQuery({
    queryKey: [queryKey, { id }],
    queryFn: () => apiGetUserResetPassword({ id }),
    enabled: id > 0,
    ...options,
  })
}
