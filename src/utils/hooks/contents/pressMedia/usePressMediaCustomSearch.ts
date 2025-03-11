/**
 * @file usePressMediaCustomSearch.ts
 * @description 언론인 및 미디어 커스텀 검색
 */

import { useEffect, useState } from 'react'

import { API_LOADING_DELAY_TIME } from '~/constants/common'
import { BaseResponseCommonObject } from '~/types/api/service'
import { PageableDataDto } from '~/types/contents/api'
import type { PressMediaCustomSearchListItem } from '~/types/contents/PressMedia'
import {
  apiGetJournalistCustomSearchList,
  useGetJournalistCustomSearchList,
} from '~/utils/api/customSearch/journalist/useGetJournalistCustomSearchList'
import {
  apiGetMediaCustomSearchList,
  useGetMediaCustomSearchList,
} from '~/utils/api/customSearch/media/useGetMediaCustomSearchList'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

export interface ReturnValueOfGetPressMediaCustomSearch {
  journalistGroup: PageableDataDto<PressMediaCustomSearchListItem>
  mediaGroup: PageableDataDto<PressMediaCustomSearchListItem>
}

export const usePressMediaCustomSearch = () => {
  //const storeUserSelectGroup = useAppSelector(state => state.user.userSelectGroup) ?? 0
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)

  const [userOwnerId, setUserOwnerId] = useState<number>()
  const [pressCustomSearchList, setPressCustomSearchList] = useState<PressMediaCustomSearchListItem[]>([])
  const [mediaCustomSearchList, setMediaCustomSearchList] = useState<PressMediaCustomSearchListItem[]>([])
  const [pressCustomSearchListSize, setPressCustomSearchListSize] = useState(10)
  const [mediaCustomSearchListSize, setMediaCustomSearchListSize] = useState(10)
  const [pressCustomSearchListTotalCount, setPressCustomSearchListTotalCount] = useState(0)
  const [mediaCustomSearchListTotalCount, setMediaCustomSearchListTotalCount] = useState(0)
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false)
  const [isPressListLoadingCompleted, setIsPressListLoadingCompleted] = useState(false)
  const [isMediaListLoadingCompleted, setIsMediaListLoadingCompleted] = useState(false)
  const [sort, setSort] = useState('updateAt!desc')

  const { data: pressData, refetch: refetchPressCustomSearchList } = useGetJournalistCustomSearchList(
    {
      page: 1,
      groupId: storeUserSelectGroup,
      size: pressCustomSearchListSize,
      sort: [sort],
      ownerId: userOwnerId,
    },
    {
      enabled: false,
    }
  )

  const { data: mediaData, refetch: refetchMediaCustomSearchList } = useGetMediaCustomSearchList(
    {
      page: 1,
      groupId: storeUserSelectGroup,
      size: mediaCustomSearchListSize,
      sort: [sort],
      ownerId: userOwnerId,
    },
    {
      enabled: false,
    }
  )

  const getPressMediaCustomSearchList = async (
    skipLoading: boolean = false,
    pressSize: number,
    mediaSize: number,
    sort: string,
    ownerId?: number
  ): Promise<ReturnValueOfGetPressMediaCustomSearch> => {
    return new Promise(async resolve => {
      if (!skipLoading) {
        setIsPressListLoadingCompleted(false)
        setIsMediaListLoadingCompleted(false)
      }

      setPressCustomSearchListSize(pressSize)
      setMediaCustomSearchListSize(mediaSize)
      setSort(sort)

      if (ownerId) {
        setUserOwnerId(ownerId)
      } else {
        setUserOwnerId(undefined)
      }

      setPressCustomSearchList([])
      setMediaCustomSearchList([])

      const allLoad = await Promise.all([
        apiGetJournalistCustomSearchList({
          page: 1,
          groupId: storeUserSelectGroup,
          size: pressSize,
          sort: [sort],
          ownerId: ownerId,
        }),
        apiGetMediaCustomSearchList({
          page: 1,
          groupId: storeUserSelectGroup,
          size: mediaSize,
          sort: [sort],
          ownerId: ownerId,
        }),
      ])
      const { data: journalistGroup, status: journalistStatus } = allLoad[0] as BaseResponseCommonObject
      const { data: mediaGroup, status: mediaStatus } = allLoad[1] as BaseResponseCommonObject
      if (journalistStatus === 'S') {
        const { content, totalElements } = journalistGroup as PageableDataDto<PressMediaCustomSearchListItem>

        setPressCustomSearchList(content)
        setPressCustomSearchListTotalCount(totalElements ?? 0)

        setIsPressListLoadingCompleted(true)
      }
      if (mediaStatus === 'S') {
        const { content, totalElements } = mediaGroup as PageableDataDto<PressMediaCustomSearchListItem>

        setMediaCustomSearchList(content)
        setMediaCustomSearchListTotalCount(totalElements ?? 0)

        setIsMediaListLoadingCompleted(true)
      }

      resolve({
        journalistGroup,
        mediaGroup,
      } as ReturnValueOfGetPressMediaCustomSearch)
    })
  }

  useEffect(() => {
    if (pressData) {
      const { status, data, message } = pressData as BaseResponseCommonObject
      if (status === 'S') {
        const { content, totalElements } = data as PageableDataDto<PressMediaCustomSearchListItem>

        setPressCustomSearchList(content)
        setPressCustomSearchListTotalCount(totalElements ?? 0)

        setIsPressListLoadingCompleted(true)
      } else {
        openToast(message?.message, 'error')
      }
    }
  }, [pressData])

  useEffect(() => {
    if (mediaData) {
      const { status, data, message } = mediaData as BaseResponseCommonObject
      if (status === 'S') {
        const { content, totalElements } = data as PageableDataDto<PressMediaCustomSearchListItem>

        setMediaCustomSearchList(content)
        setMediaCustomSearchListTotalCount(totalElements ?? 0)

        setIsMediaListLoadingCompleted(true)
      } else {
        openToast(message?.message, 'error')
      }
    }
  }, [mediaData])

  useEffect(() => {
    if (isPressListLoadingCompleted && isMediaListLoadingCompleted) {
      setTimeout(() => {
        setIsLoadingCompleted(true)
      }, API_LOADING_DELAY_TIME)
    } else {
      setIsLoadingCompleted(false)
    }
  }, [isPressListLoadingCompleted, isMediaListLoadingCompleted])

  return {
    userOwnerId,
    setUserOwnerId,
    pressCustomSearchList,
    setPressCustomSearchList,
    mediaCustomSearchList,
    setMediaCustomSearchList,
    pressCustomSearchListSize,
    setPressCustomSearchListSize,
    mediaCustomSearchListSize,
    setMediaCustomSearchListSize,
    pressCustomSearchListTotalCount,
    setPressCustomSearchListTotalCount,
    mediaCustomSearchListTotalCount,
    setMediaCustomSearchListTotalCount,
    refetchPressCustomSearchList,
    refetchMediaCustomSearchList,
    getPressMediaCustomSearchList,
    isLoadingCompleted,
    setIsLoadingCompleted,
    sort,
  }
}
