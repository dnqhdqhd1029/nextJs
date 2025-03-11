/**
 * @file usePutActionUpdate.ts
 * @description 활동 수정
 */

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import { BaseResponseCommonObject, ModifyActionDto, ModifyShareCodeOwnerDto } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface IUpdateShareCodeOwner {
  id: number
  modify_share_code_owner_dto: ModifyShareCodeOwnerDto
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/action/share`

/**
 * Axios API with FormData for File Upload using PUT method
 * @param {IUpdateShareCodeOwner} params - 요청 데이터와 파일 목록
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutMailingControlUpdate = async (params: IUpdateShareCodeOwner): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data } = await axios.put(`${queryKey}/${params.id}`, params.modify_share_code_owner_dto, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return data
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, IUpdateShareCodeOwner>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, IUpdateShareCodeOwner>}
 */
export const usePutmailingControlUpdate = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, IUpdateShareCodeOwner>
): UseMutationResult<BaseResponseCommonObject, AxiosError, IUpdateShareCodeOwner> => {
  return useMutation(apiPutMailingControlUpdate, options)
}
