/**
 * @file useGetPosts.ts
 * @description useGetPosts Hook
 */

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import useSWR, { useSWRConfig } from 'swr'

import axios from '~/utils/common/axios'

export interface jsonData {
  id?: number | string
  userId?: number
  title?: string
  body?: string
}

const queryKey = 'https://jsonplaceholder.typicode.com/posts'

/***
 * jsonData 목록
 *@returns {Promise<jsonData[]>}
 */
export const apiGetPosts = async (): Promise<jsonData[]> => {
  const { data } = await axios.get<jsonData[]>(`${queryKey}`)
  return data
}

/**
 * jsonData 조회  hook
 */
export const useGetPosts = (
  options?: UseQueryOptions<jsonData[], AxiosError>
): UseQueryResult<jsonData[], AxiosError> => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: apiGetPosts,
    ...options,
  })
}

/**
 * jsonData 조회 SWR hook
 */
export const useGetPostsSWR = () => {
  const { data, error, mutate } = useSWR<jsonData[], AxiosError>(queryKey, apiGetPosts)
  const { mutate: refetch } = useSWRConfig()

  return {
    data,
    error,
    mutate,
    refetch,
    isLoading: !error && !data,
    isError: error,
  }
}
