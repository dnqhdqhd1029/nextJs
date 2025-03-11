/**
 * @file useSearchMediaGroup.ts
 * @description 미디어그룹 검색
 */

import { useEffect, useRef, useState } from 'react'

import { API_LOADING_DELAY_TIME } from '~/constants/common'
import { BaseResponseCommonObject } from '~/types/api/service'
import { TimeoutRef } from '~/types/common'
import type { AutoCompleteProps } from '~/types/contents/api'
import type { MbTagSearchResultItem } from '~/types/contents/Common'
import { TagSearchListType } from '~/types/contents/Common'
import type { PressMediaSearchResultItem } from '~/types/contents/PressMedia'
import { useGetMediaGroupAutoComplete } from '~/utils/api/media/useGetMediaGroupAutoComplete'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'

export const useSearchMediaGroup = ({
  tagSearchList,
  setTagSearchList,
  afterLoadComplete,
}: AutoCompleteProps<PressMediaSearchResultItem>) => {
  const timerRef: TimeoutRef = useRef(null)
  const [mediaGroup, setMediaGroup] = useState('')
  const [mediaGroupCount, setMediaGroupCount] = useState(10)

  // 미디어그룹 UseQuery
  const { refetch: refetchMediaGroupAutoComplete } = useGetMediaGroupAutoComplete(
    {
      name: mediaGroup,
      page: 1,
      size: mediaGroupCount,
      sort: 'name!asc',
    },
    {
      enabled: false,
    }
  )

  // 미디어그룹 자동완성 API 호출
  const handleMediaGroupAutoCompleteResult = async () => {
    const { data, isSuccess } = await refetchMediaGroupAutoComplete()

    if (!isSuccess) {
      return
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
      const reDefinedResultData = resultData as PressMediaSearchResultItem[]
      const newSearchListData: TagSearchListType[] = []

      const autoCompleteData: MbTagSearchResultItem[] = reDefinedResultData.map(item => {
        return {
          id: item.name,
          label: item.name,
          subLabel: getCurrencyFormat(item.count),
          checked: false,
        } as MbTagSearchResultItem
      })
      tagSearchList.map(item => {
        if (item.key === 'groupList') {
          newSearchListData.push({
            ...item,
            searchListData: autoCompleteData,
          })
        } else {
          newSearchListData.push(item)
        }
      })

      setTagSearchList(newSearchListData)

      afterLoadComplete && afterLoadComplete(reDefinedResultData, mediaGroupCount, setMediaGroupCount)
    } else {
      openToast(message?.message, 'error')
    }
  }

  useEffect(() => {
    // console.log('>> mediaGroup :', mediaGroup)
  }, [mediaGroup])

  useEffect(() => {
    // console.log('>> mediaGroupCount :', mediaGroupCount)
  }, [mediaGroupCount])

  // 미디어그룹 자동완성
  useEffect(() => {
    if (mediaGroup !== '' && mediaGroupCount !== 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        handleMediaGroupAutoCompleteResult()
      }, API_LOADING_DELAY_TIME)
    }
  }, [mediaGroup, mediaGroupCount])

  return {
    handleMediaGroupAutoCompleteResult,

    // 미디어그룹(자동완성)
    mediaGroup,
    setMediaGroup,
    mediaGroupCount,
    setMediaGroupCount,
  }
}
