/**
 * @file usePostJournalistGroupDeleteJournalist.ts
 * @description 언론인목록에 언론인 제거
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalistgroup/journalist/del`

export interface AddDelJournalistDto {
  /**
   * 언론인목록 ID
   * @type {number}
   * @memberof AddDelJournalistDto
   */
  jrnlstListId: number
  /**
   * 언론인 ID 배열
   * @type {Array<number>}
   * @memberof AddDelJournalistDto
   */
  journalistIdList: Array<number>
}

/**
 * Axios API
 * @param {AddDelJournalistDto} addDelJournalistDto - 언론인 제거 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistGroupDeleteJournalist = async (
  addDelJournalistDto: AddDelJournalistDto
): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, addDelJournalistDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Journalistbee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, AddDelJournalistDto>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, AddDelJournalistDto>} - mutation 결과
 */
export const usePostJournalistGroupDeleteJournalist = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, AddDelJournalistDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, AddDelJournalistDto> => {
  return useMutation(apiPostJournalistGroupDeleteJournalist, options)
}

/**
 * Axios API
 * @param {AddDelJournalistDto} addDelJournalistDto - 언론인 제거 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistGroupDeleteJournal = async (addDelJournalistDto: {
  journalistId: number
  jrnlstListIdList: number[]
}): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, addDelJournalistDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Journalistbee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, {
 *   journalistId: number; jrnlstListIdList: number[]
 * }>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, {
 *   journalistId: number; jrnlstListIdList: number[]
 * }>} - mutation 결과
 */
export const usePostJournalistGroupDeleteJournal = (
  options?: UseMutationOptions<
    BaseResponseCommonObject,
    AxiosError,
    {
      journalistId: number
      jrnlstListIdList: number[]
    }
  >
): UseMutationResult<
  BaseResponseCommonObject,
  AxiosError,
  {
    journalistId: number
    jrnlstListIdList: number[]
  }
> => {
  return useMutation(apiPostJournalistGroupDeleteJournal, options)
}
