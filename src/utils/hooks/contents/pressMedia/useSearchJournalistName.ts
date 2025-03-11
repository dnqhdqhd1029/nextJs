/**
 * @file useSearchJournalistName.ts
 * @description 언론인명 검색
 */

import { useEffect, useState } from 'react'

import { BaseResponseCommonObject, JournalistAutoCompleteDto } from '~/types/api/service'
import type { AutoCompleteProps } from '~/types/contents/api'
import type { MbTagSearchResultItem } from '~/types/contents/Common'
import { TagSearchListType } from '~/types/contents/Common'
import type { PressMediaSearchResultItem } from '~/types/contents/PressMedia'
import { useGetJournalistNameAutoComplete } from '~/utils/api/journalist/useGetJournalistNameAutoComplete'
import { openToast } from '~/utils/common/toast'

export const useSearchJournalistName = ({
  tagSearchList,
  setTagSearchList,
  afterLoadComplete,
}: AutoCompleteProps<PressMediaSearchResultItem>) => {
  const [journalistName, setJournalistName] = useState('')
  const [journalistNameCount, setJournalistNameCount] = useState(10)

  // 언론인명 UseQuery
  const { refetch: refetchJournalistNameAutoComplete } = useGetJournalistNameAutoComplete(
    {
      name: journalistName,
      page: 1,
      size: journalistNameCount,
      sort: 'name!asc',
    },
    {
      enabled: false,
    }
  )

  // 언론인명 자동완성 API 호출
  const handleJournalistNameAutoCompleteResult = async () => {
    const { data, isSuccess } = await refetchJournalistNameAutoComplete()

    if (!isSuccess) {
      return
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
      const reDefinedResultData = resultData as JournalistAutoCompleteDto[]

      const newSearchListData: TagSearchListType[] = []
      const autoCompleteData: MbTagSearchResultItem[] = reDefinedResultData.map(item => {
        return {
          id: item.journalistId?.toString(),
          label: `${item.name} - ${item.mediaName}`,
          checked: false,
        } as MbTagSearchResultItem
      })
      tagSearchList.map(item => {
        if (item.key === 'journalistIdList') {
          newSearchListData.push({
            ...item,
            searchListData: autoCompleteData,
          })
        } else {
          newSearchListData.push(item)
        }
      })

      setTagSearchList(newSearchListData)

      afterLoadComplete && afterLoadComplete(reDefinedResultData, journalistNameCount)
    } else {
      openToast(message?.message, 'error')
    }
  }

  // 언론인명 자동완성
  useEffect(() => {
    if (journalistName !== '') {
      handleJournalistNameAutoCompleteResult()
    }
  }, [journalistName])

  return {
    handleJournalistNameAutoCompleteResult,

    // 언론인명(자동완성)
    journalistName,
    setJournalistName,
    journalistNameCount,
    setJournalistNameCount,
  }
}
