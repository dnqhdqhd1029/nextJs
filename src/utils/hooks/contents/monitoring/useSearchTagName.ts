/**
 * @file useSearchTagName.ts
 * @description 태그명 검색
 */

import { useEffect, useState } from 'react'

import type { ResponseTagDto } from '~/types/api/service'
import { BaseResponseCommonObject, PageResponseTagDto } from '~/types/api/service'
import type { AutoCompleteProps } from '~/types/contents/api'
import type { MbTagSearchResultItem } from '~/types/contents/Common'
import { TagSearchListType } from '~/types/contents/Common'
import { useGetTagNameAutoComplete } from '~/utils/api/tag/useGetTagNameAutoComplete'
import { openToast } from '~/utils/common/toast'

export const useSearchTagName = ({
  tagSearchList,
  setTagSearchList,
  afterLoadComplete,
}: AutoCompleteProps<ResponseTagDto>) => {
  const [tagName, setTagName] = useState('')
  const [category, setCategory] = useState<'NEWS' | 'ACTION'>('NEWS')
  const [tagNameCount, setTagNameCount] = useState(10)

  // 태그명 UseQuery
  const { refetch: refetchTagNameAutoComplete } = useGetTagNameAutoComplete(
    {
      name: tagName,
      category: category,
      page: 1,
      size: tagNameCount,
      sort: 'name!asc',
    },
    {
      enabled: false,
    }
  )

  // 태그명 자동완성 API 호출
  const handleTagNameAutoCompleteResult = async () => {
    const { data, isSuccess } = await refetchTagNameAutoComplete()

    if (!isSuccess) {
      return
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
      const { content } = resultData as PageResponseTagDto

      const newSearchListData: TagSearchListType[] = []
      const autoCompleteData: MbTagSearchResultItem[] | undefined = content?.map(item => {
        return {
          id: item.tagId?.toString(),
          label: `${item.tagName} - ${item.category}`,
          checked: false,
        } as MbTagSearchResultItem
      })
      tagSearchList.map(item => {
        if (item.key === 'tagIdList') {
          newSearchListData.push({
            ...item,
            searchListData: autoCompleteData ?? [],
          })
        } else {
          newSearchListData.push(item)
        }
      })

      setTagSearchList(newSearchListData)

      afterLoadComplete && afterLoadComplete(content ?? [], tagNameCount)
    } else {
      openToast(message?.message, 'error')
    }
  }

  // 매체명 자동완성
  useEffect(() => {
    if (tagName !== '') {
      handleTagNameAutoCompleteResult()
    }
  }, [tagName])

  return {
    handleTagNameAutoCompleteResult,

    tagName,
    setTagName,
    category,
    setCategory,
    tagNameCount,
    setTagNameCount,
  }
}
