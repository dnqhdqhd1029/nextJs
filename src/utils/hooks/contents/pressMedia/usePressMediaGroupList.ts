/**
 * @file usePressMediaGroupList.ts
 * @description 언론사, 언론인 그룹 리스트
 */

import { useEffect, useState } from 'react'

import { API_LOADING_DELAY_TIME } from '~/constants/common'
import { BaseResponseCommonObject } from '~/types/api/service'
import { PageableDataDto } from '~/types/contents/api'
import type { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { apiGetJournalistGroup, useGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { apiGetMediaGroup, useGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

export interface ReturnValueOfGetPressMediaGroupList {
  journalistGroup: PageableDataDto<JournalistMediaGroupItem>
  mediaGroup: PageableDataDto<JournalistMediaGroupItem>
}

export const usePressMediaGroupList = () => {
  //const storeUserSelectGroup = useAppSelector(state => state.user.userSelectGroup)
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)
  const [userSelectGroup, setUserSelectGroup] = useState<number>()
  const [userOwnerId, setUserOwnerId] = useState<number>()
  const [pressGroupList, setPressGroupList] = useState<JournalistMediaGroupItem[]>([])
  const [mediaGroupList, setMediaGroupList] = useState<JournalistMediaGroupItem[]>([])
  const [pressGroupListSize, setPressGroupListSize] = useState(10)
  const [mediaGroupListSize, setMediaGroupListSize] = useState(10)
  const [pressGroupListTotalCount, setPressGroupListTotalCount] = useState(0)
  const [mediaGroupListTotalCount, setMediaGroupListTotalCount] = useState(0)
  const [isListLoadingCompleted, setIsLoadingCompleted] = useState(false)
  const [isPressListGroupLoadingCompleted, setIsPressListGroupLoadingCompleted] = useState(false)
  const [isMediaListGroupLoadingCompleted, setIsMediaListGroupLoadingCompleted] = useState(false)
  const [sort, setSort] = useState('updateAt!desc')

  const { data: journalistListData, refetch: refetchGetJournalistGroup } = useGetJournalistGroup(
    {
      page: 1,
      groupId: storeUserSelectGroup ?? -1,
      size: pressGroupListSize,
      sort: [sort],
      ownerId: userOwnerId,
    },
    {
      enabled: false,
    }
  )

  const { data: mediaListData, refetch: refetchGetMediaGroup } = useGetMediaGroup(
    {
      page: 1,
      groupId: storeUserSelectGroup ?? -1,
      size: mediaGroupListSize,
      sort: [sort],
      ownerId: userOwnerId,
    },
    {
      enabled: false,
    }
  )

  const getPressMediaGroupList = async (
    skipLoading: boolean = false,
    pressSize: number,
    mediaSize: number,
    sort: string,
    ownerId?: number
  ): Promise<ReturnValueOfGetPressMediaGroupList> => {
    return new Promise(async resolve => {
      if (!skipLoading) {
        setIsPressListGroupLoadingCompleted(false)
        setIsMediaListGroupLoadingCompleted(false)
      }

      setPressGroupListSize(pressSize)
      setMediaGroupListSize(mediaSize)
      setSort(sort)

      if (ownerId) {
        setUserOwnerId(ownerId)
      } else {
        setUserOwnerId(undefined)
      }

      const allLoad = await Promise.all([
        apiGetJournalistGroup({
          page: 1,
          groupId: storeUserSelectGroup ?? -1,
          size: pressSize,
          sort: [sort],
          ownerId: ownerId,
        }),
        apiGetMediaGroup({
          page: 1,
          groupId: storeUserSelectGroup ?? -1,
          size: mediaSize,
          sort: [sort],
          ownerId: ownerId,
        }),
      ])
      const { data: journalistGroup, status: journalistStatus } = allLoad[0] as BaseResponseCommonObject
      const { data: mediaGroup, status: mediaStatus } = allLoad[1] as BaseResponseCommonObject
      if (journalistStatus === 'S') {
        const { content, totalElements } = journalistGroup as PageableDataDto<JournalistMediaGroupItem>
        setPressGroupList(content)
        setPressGroupListTotalCount(totalElements ?? 0)

        setIsPressListGroupLoadingCompleted(true)
      }
      if (mediaStatus === 'S') {
        const { content, totalElements } = mediaGroup as PageableDataDto<JournalistMediaGroupItem>
        setMediaGroupList(content)
        setMediaGroupListTotalCount(totalElements ?? 0)

        setIsMediaListGroupLoadingCompleted(true)
      }

      resolve({
        journalistGroup,
        mediaGroup,
      } as ReturnValueOfGetPressMediaGroupList)
    })
  }

  useEffect(() => {
    if (isPressListGroupLoadingCompleted && isMediaListGroupLoadingCompleted) {
      setTimeout(() => {
        setIsLoadingCompleted(true)
      }, API_LOADING_DELAY_TIME)
    } else {
      setIsLoadingCompleted(false)
    }
  }, [isPressListGroupLoadingCompleted, isMediaListGroupLoadingCompleted])

  return {
    userOwnerId,
    setUserOwnerId,
    pressGroupList,
    setPressGroupList,
    mediaGroupList,
    setMediaGroupList,
    pressGroupListSize,
    setPressGroupListSize,
    mediaGroupListSize,
    setMediaGroupListSize,
    pressGroupListTotalCount,
    setPressGroupListTotalCount,
    mediaGroupListTotalCount,
    setMediaGroupListTotalCount,
    refetchGetJournalistGroup,
    refetchGetMediaGroup,
    journalistListData,
    mediaListData,
    getPressMediaGroupList,
    isListLoadingCompleted,
    setIsLoadingCompleted,
    sort,
    setSort,
    userSelectGroup,
    setUserSelectGroup,
  }
}
