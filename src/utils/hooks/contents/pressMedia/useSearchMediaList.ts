/**
 * @file useSearchMediaList.ts
 * @description 미디어 리스트 검색
 */

import { useState } from 'react'

import { AUTO_COMPLETE_COUNT } from '~/constants/common'
import { BaseResponseCommonObject } from '~/types/api/service'
import type { AutoCompleteProps } from '~/types/contents/api'
import { PageableDataDto } from '~/types/contents/api'
import type { MbTagSearchResultItem } from '~/types/contents/Common'
import type { CommonSearchValues, TagSearchListType } from '~/types/contents/Common'
import type { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { useGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

export const useSearchMediaList = ({
  tagSearchList,
  setTagSearchList,
  afterLoadComplete,
}: AutoCompleteProps<JournalistMediaGroupItem>) => {
  //const storeUserSelectGroup = useAppSelector(state => state.user.userSelectGroup)
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)
  const [mediaListCount, setMediaListCount] = useState(AUTO_COMPLETE_COUNT)

  const { refetch: refetchMediaListGroup } = useGetMediaGroup(
    {
      page: 1,
      size: mediaListCount,
      sort: ['title!asc'],
      groupId: storeUserSelectGroup ?? -1,
    },
    {
      enabled: false,
    }
  )

  // 매체명 자동완성 API 호출
  const handleMediaListLoadResult = async (
    receivedTagSearchList?: TagSearchListType[],
    storedValues?: CommonSearchValues
  ) => {
    const { data, isSuccess } = await refetchMediaListGroup()

    if (!isSuccess) {
      return
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
      const { content } = resultData as PageableDataDto<JournalistMediaGroupItem>

      const currentTagSearchList: TagSearchListType[] = receivedTagSearchList ?? tagSearchList
      const newSearchListData: TagSearchListType[] = []

      const autoCompleteData: MbTagSearchResultItem[] = content?.map(item => {
        const id = item.mediaListId?.toString()
        const isChecked = storedValues ? storedValues?.mediaListId?.find(item => item.id === id) : false
        return {
          id: item.mediaListId?.toString(),
          label: `${item.title}`,
          subLabel: getCurrencyFormat(item.journalistCount),
          checked: !!isChecked,
        } as MbTagSearchResultItem
      })

      currentTagSearchList.map(item => {
        if (item.key === 'mediaListId') {
          newSearchListData.push({
            ...item,
            searchListData: autoCompleteData,
          })
        } else {
          newSearchListData.push(item)
        }
      })

      setTagSearchList(newSearchListData)

      afterLoadComplete && afterLoadComplete(content, mediaListCount, setMediaListCount)
    } else {
      openToast(message?.message, 'error')
    }
  }

  return {
    handleMediaListLoadResult,
    setMediaListCount,
  }
}
