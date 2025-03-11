/**
 * @file usePutJournalistPhoto.ts
 * @description 사용자 추가 언론인 사진 변경
 */
import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME, API_DEMO_BASE_URL, DEMO_LICENSE } from '~/constants/common'
import { API_BASE_URL, API_VERSION } from '~/constants/common'
import type { BaseResponseCommonObject } from '~/types/api/service'
import axios from '~/utils/common/axios'

export interface UsePutJournalistPhotoParams {
  id: number
  file: File
}

const apiVersion = API_VERSION !== '' ? `/${API_VERSION}` : ''

// queryKey: API 주소
const queryKey = `${
  Cookie.get(DEMO_LICENSE) && Cookie.get(DEMO_LICENSE) === 'true' ? API_DEMO_BASE_URL : API_BASE_URL
}${apiVersion}/svc/journalists/photo`

/**
 * Axios API
 * @param {UsePutJournalistPhotoParams} { id, file } - 수정 정보
 * @returns {Promise<BaseResponseCommonObject>}
 */
export const apiPutJournalistPhoto = async ({
  id,
  file,
}: UsePutJournalistPhotoParams): Promise<BaseResponseCommonObject> => {
  const formData = new FormData()

  console.log('file', file)
  //console.log('>> [usePutEmailPressReleaseUpdate] params:', params)

  // const blob = new Blob([JSON.stringify(params.request)], {
  //   type: 'application/json',
  // })
  //
  // formData.append('request', blob)

  formData.append('file', file)

  const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
  const locale = Cookie.get('locale') ?? 'ko'

  const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Mediabee-Lang': locale,
    },
    withCredentials: true,
  })

  return responseData
}
//
// export const apiPutJournalistPhoto = async ({
//                                               id,
//                                               file,
//                                             }: UsePutJournalistPhotoParams): Promise<BaseResponseCommonObject> => {
//   const formData = new FormData()
//   formData.append('file', file)
//
//   const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
//   const locale = Cookie.get('locale') ?? 'ko'
//
//   const { data: responseData } = await axios.put<BaseResponseCommonObject>(`${queryKey}/${id}`, formData, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       ['X-Mediabee-Lang']: locale,
//       'Content-Type': 'multipart/form-data',
//     },
//     withCredentials: true,
//   })
//
//   return responseData
// }
/**
 * Mutation hook
 * @param {UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutJournalistPhotoParams>} options - 옵션
 * @returns {UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutJournalistPhotoParams>}
 */
export const usePutJournalistPhoto = (
  options?: UseMutationOptions<BaseResponseCommonObject, AxiosError, UsePutJournalistPhotoParams>
): UseMutationResult<BaseResponseCommonObject, AxiosError, UsePutJournalistPhotoParams> => {
  return useMutation(apiPutJournalistPhoto, options)
}
