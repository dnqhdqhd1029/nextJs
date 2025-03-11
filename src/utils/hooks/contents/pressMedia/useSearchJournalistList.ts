/**
 * @file useSearchJournalistList.ts
 * @description 언론인 검색
 */

import { useState } from 'react'

import { AUTO_COMPLETE_COUNT } from '~/constants/common'
import { BaseResponseCommonObject } from '~/types/api/service'
import type { AutoCompleteProps } from '~/types/contents/api'
import { PageableDataDto } from '~/types/contents/api'
import type { MbTagSearchResultItem } from '~/types/contents/Common'
import type { CommonSearchValues, TagSearchListType } from '~/types/contents/Common'
import type { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { useGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

export const useSearchJournalistList = ({
  tagSearchList,
  setTagSearchList,
  afterLoadComplete,
}: AutoCompleteProps<JournalistMediaGroupItem>) => {
  //const storeUserSelectGroup = useAppSelector(state => state.user.userSelectGroup)
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)
  const [journalistListCount, setJournalistListCount] = useState(AUTO_COMPLETE_COUNT)

  const { refetch: refetchJournalListGroup } = useGetJournalistGroup(
    {
      page: 1,
      size: journalistListCount,
      sort: ['title!asc'],
      groupId: storeUserSelectGroup ?? -1,
    },
    {
      enabled: false,
    }
  )

  const handleJournalistListLoadResult = async (
    receivedTagSearchList?: TagSearchListType[],
    storedValues?: CommonSearchValues
  ) => {
    const { data, isSuccess } = await refetchJournalListGroup()

    if (!isSuccess) {
      return
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
      const { content } = resultData as PageableDataDto<JournalistMediaGroupItem>

      const currentTagSearchList: TagSearchListType[] = receivedTagSearchList ?? tagSearchList
      const newSearchListData: TagSearchListType[] = []
      const autoCompleteData: MbTagSearchResultItem[] = content.map(item => {
        const id = item.mediaListId?.toString()
        const isChecked = storedValues ? storedValues.jrnlstListId?.find(item => item.id === id) : false
        return {
          id: item.jrnlstListId?.toString(),
          label: `${item.title}`,
          subLabel: getCurrencyFormat(item.journalistCount),
          checked: !!isChecked,
        } as MbTagSearchResultItem
      })

      currentTagSearchList.map(item => {
        if (item.key === 'jrnlstListId') {
          newSearchListData.push({
            ...item,
            searchListData: autoCompleteData,
          })
        } else {
          newSearchListData.push(item)
        }
      })

      setTagSearchList(newSearchListData)

      afterLoadComplete && afterLoadComplete(content, journalistListCount, setJournalistListCount)
    } else {
      openToast(message?.message, 'error')
    }
  }

  return {
    handleJournalistListLoadResult,
    setJournalistListCount,
  }
}
