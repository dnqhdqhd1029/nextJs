import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Cookie from 'js-cookie'

import { ACCESS_TOKEN_NAME } from '~/constants/common'
import { BaseResponseCommonObject } from '~/types/api/service'

export type AxiosAPIHttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'download'
export type MutationOptions<T> = UseMutationOptions<BaseResponseCommonObject, AxiosError, T>
export type MutationResult<T> = UseMutationResult<BaseResponseCommonObject, AxiosError, T>

export const createAxiosAPI =
  <T>(urlGenerator: (params: T) => { url: string; method: AxiosAPIHttpMethod; data?: T | object; fileName?: string }) =>
  async (params: T): Promise<BaseResponseCommonObject> => {
    const accessToken = Cookie.get(ACCESS_TOKEN_NAME) ?? ''
    const locale = Cookie.get('locale') ?? 'ko'

    const axiosConfig: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${accessToken}`, ['X-Mediabee-Lang']: locale },
      withCredentials: true,
    }

    const { url, data, method, fileName } = urlGenerator(params)

    if (method === 'download') {
      await downloadFile(url, data, { responseType: 'blob', ...axiosConfig }, fileName as string)
      return {}
    }

    const { data: responseData } = await axios({
      url,
      method,
      ...(method !== 'get' && { data }),
      ...axiosConfig,
    })

    return responseData
  }

export const createQueryHook =
  <T>(queryKeyGenerator: (params: T) => QueryKey, apiFunction: (params: T) => Promise<BaseResponseCommonObject>) =>
  (
    params: T,
    options?: UseQueryOptions<BaseResponseCommonObject, AxiosError, BaseResponseCommonObject>
  ): UseQueryResult<BaseResponseCommonObject, AxiosError> => {
    const queryKey = queryKeyGenerator(params)

    return useQuery({
      queryKey: queryKey,
      queryFn: () => apiFunction(params),
      ...options,
    })
  }

export const createMutationHook =
  <T>(apiFunction: (params: T) => Promise<BaseResponseCommonObject>) =>
  (options?: MutationOptions<T>): MutationResult<T> => {
    return useMutation(apiFunction, options)
  }

export const loadJavascript = (url: string, callback?: any, type?: string) => {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = type || 'application/javascript'
  document.body.appendChild(script)

  if (callback) {
    script.onload = () => callback()
  }
}

const downloadFile = async <T>(
  url: string,
  data: T | object,
  config: AxiosRequestConfig,
  fileName: string
): Promise<void> => {
  try {
    const response = await axios.get<ArrayBuffer>(url, config)
    const blob = new Blob([response.data], { type: 'application/pdf;charset=utf-8' })

    // 파일 다운
    // let newFileName = fileName
    // const link = document.createElement('a')
    // link.href = window.URL.createObjectURL(blob)
    // link.download = newFileName
    // link.click()

    // 새창 열림
    const openUrl = URL.createObjectURL(blob)
    console.log(openUrl)
    window.open(openUrl, '_blank')
    URL.revokeObjectURL(openUrl)
  } catch (error) {
    console.error('Error downloading file:', (error as Error).message)
  }
}

export const getYoutubeThumbnailUrl = (
  url: string,
  quality: 'default' | 'mqdefault' | 'hqdefault' = 'hqdefault'
): string | null => {
  const videoIdMatch = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1]
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
  } else {
    return ''
  }
}
