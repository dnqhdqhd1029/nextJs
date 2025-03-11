/**
 * @file useSearchMediaName.ts
 * @description 매체명 검색
 */

import { useEffect, useState } from 'react'

import { BaseResponseCommonObject, MediaAutoCompleteDto } from '~/types/api/service'
import type { AutoCompleteProps } from '~/types/contents/api'
import type { MbTagSearchResultItem } from '~/types/contents/Common'
import { TagSearchListType } from '~/types/contents/Common'
import type { PressMediaSearchResultItem } from '~/types/contents/PressMedia'
import { useGetMediaNameAutoComplete } from '~/utils/api/media/useGetMediaNameAutoComplete'
import { openToast } from '~/utils/common/toast'

export const useSearchMediaName = ({
  tagSearchList,
  setTagSearchList,
  afterLoadComplete,
}: AutoCompleteProps<PressMediaSearchResultItem>) => {
  const [mediaName, setMediaName] = useState('')
  const [mediaNameCount, setMediaNameCount] = useState(10)

  // 매체명 UseQuery
  const { refetch: refetchMediaNameAutoComplete } = useGetMediaNameAutoComplete(
    {
      name: mediaName,
      page: 1,
      size: mediaNameCount,
      sort: 'name!asc',
    },
    {
      enabled: false,
    }
  )

  // 매체명 자동완성 API 호출
  const handleMediaNameAutoCompleteResult = async () => {
    const { data, isSuccess } = await refetchMediaNameAutoComplete()

    if (!isSuccess) {
      return
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
      const reDefinedResultData = resultData as MediaAutoCompleteDto[]

      const newSearchListData: TagSearchListType[] = []
      const autoCompleteData: MbTagSearchResultItem[] = reDefinedResultData.map(item => {
        return {
          id: item.mediaId?.toString(),
          label: `${item.name} - ${item.subcategory}`,
          checked: false,
        } as MbTagSearchResultItem
      })
      tagSearchList.map(item => {
        if (item.key === 'mediaIdList') {
          newSearchListData.push({
            ...item,
            searchListData: autoCompleteData,
          })
        } else {
          newSearchListData.push(item)
        }
      })

      setTagSearchList(newSearchListData)

      afterLoadComplete && afterLoadComplete(reDefinedResultData, mediaNameCount)
    } else {
      openToast(message?.message, 'error')
    }
  }

  // 매체명 자동완성
  useEffect(() => {
    if (mediaName !== '') {
      handleMediaNameAutoCompleteResult()
    }
  }, [mediaName])

  return {
    handleMediaNameAutoCompleteResult,

    // 매체명(자동완성)
    mediaName,
    setMediaName,
    mediaNameCount,
    setMediaNameCount,
  }
}
