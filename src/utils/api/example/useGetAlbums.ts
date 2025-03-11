/**
 * @file useGetAlbums.ts
 * @description useGetAlbums Hook
 */

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import useSWR, { useSWRConfig } from 'swr'

import axios from '~/utils/common/axios'

export interface jsonData {
  userId?: number
  id?: number
  title?: string
}

const queryKey = 'https://jsonplaceholder.typicode.com/albums'

/***
 * jsonData 목록
 *@returns {Promise<jsonData[]>}
 */
export const apiGetAlbums = async (): Promise<jsonData[]> => {
  const { data } = await axios.get<jsonData[]>(`${queryKey}`)
  return data
}

/**
 * jsonData 조회  hook
 */
export const useGetAlbums = (
  options?: UseQueryOptions<jsonData[], AxiosError>
): UseQueryResult<jsonData[], AxiosError> => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: apiGetAlbums,
    ...options,
  })
}

/**
 * jsonData 조회 SWR hook
 */
export const useGetAlbumsSWR = () => {
  const { data, error, mutate } = useSWR<jsonData[], AxiosError>(queryKey, apiGetAlbums)
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
