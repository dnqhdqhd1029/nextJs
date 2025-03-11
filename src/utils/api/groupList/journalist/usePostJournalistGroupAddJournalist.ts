/**
 * @file usePostJournalistGroupAddJournalist.ts
 * @description 언론인목록에 미디어 추가
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

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

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalistgroup/journalist/add`

// queryKey: API 주소
const queryKeyAuto = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalistgroup/journalist/addone`

/**
 * Axios API
 * @param {AddDelJournalistDto} addDelJournalistDto - 연락처 추가 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistGroupAddJournalist = async (
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
export const usePostJournalistGroupAddJournalist = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, AddDelJournalistDto>
): UseMutationResult<BaseResponseCommonObject, AxiosError, AddDelJournalistDto> => {
  return useMutation(apiPostJournalistGroupAddJournalist, options)
}

/**
 * Axios API
 * @param {AddDelJournalistDto} addDelJournalistDto - 연락처 추가 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistGroupAddJournalId = async (addDelJournalistDto: {
  jrnlstListIdList: number[]
  journalistIdList: number[]
}): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  console.log('addDelJournalistDto', addDelJournalistDto)
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKey}`, addDelJournalistDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Journalistbee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, {
 *   jrnlstListIdList: number[]
 *   journalistIdList: number[]
 * }>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, {
 *   jrnlstListIdList: number[]
 *   journalistIdList: number[]
 * }>} - mutation 결과
 */
export const usePostJournalistGroupAddJournalId = (
  options?: UseMutationOptions<
    BaseResponseCommonObject,
    AxiosError,
    {
      jrnlstListIdList: number[]
      journalistIdList: number[]
    }
  >
): UseMutationResult<
  BaseResponseCommonObject,
  AxiosError,
  {
    jrnlstListIdList: number[]
    journalistIdList: number[]
  }
> => {
  return useMutation(apiPostJournalistGroupAddJournalId, options)
}

/**
 * Axios API
 * @param {AddDelJournalistDto} addDelJournalistDto - 연락처 추가 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPostJournalistGroupAddJournalIdAuto = async (addDelJournalistDto: {
  jrnlstListId: number
  journalistId: number
}): Promise<BaseResponseCommonObject> => {
  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'
  console.log('addDelJournalistDto', addDelJournalistDto)
  const { data: responseData } = await axios.post<BaseResponseCommonObject>(`${queryKeyAuto}`, addDelJournalistDto, {
    headers: { Authorization: `Bearer ${accessToken}`, ['X-Journalistbee-Lang']: locale },
    withCredentials: true,
  })
  return responseData
}

/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, {
 *   jrnlstListId: number
 *   journalistId: number
 * }>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, {
 *   jrnlstListId: number
 *   journalistId: number
 * }>} - mutation 결과
 */
export const usePostJournalistGroupAddJournalIdAuto = (
  options?: UseMutationOptions<
    BaseResponseCommonObject,
    AxiosError,
    {
      jrnlstListId: number
      journalistId: number
    }
  >
): UseMutationResult<
  BaseResponseCommonObject,
  AxiosError,
  {
    jrnlstListId: number
    journalistId: number
  }
> => {
  return useMutation(apiPostJournalistGroupAddJournalIdAuto, options)
}
