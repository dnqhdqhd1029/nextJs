/**
 * @file usePostMediaGroupDeleteMedia.ts
 * @description 미디어목록에 미디어 제거
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface AddDelMediaDto {
  /**
   * 미디어목록 ID
   * @type {number}
   * @memberof AddDelMediaDto
   */
  mediaListId: number
  /**
   * 미디어ID 배열
   * @type {Array<number>}
   * @memberof AddDelMediaDto
   */
  mediaIdList: Array<number>
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/mediagroup/media/del`

/**
 * Axios API
 * @param {AddDelMediaDto} addDelMediaDto - 미디어 제거 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostMediaGroupDeleteMedia = async (
  addDelMediaDto: AddDelMediaDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, addDelMediaDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, AddDelMediaDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, AddDelMediaDto>} - mutation 결과
 */
export const usePostMediaGroupDeleteMedia = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, AddDelMediaDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, AddDelMediaDto> => {
  return useMutation(apiPostMediaGroupDeleteMedia, options)
}
