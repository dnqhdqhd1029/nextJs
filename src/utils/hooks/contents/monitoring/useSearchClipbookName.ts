/**
 * @file useSearchClipbookName.ts
 * @description 클립북명 검색
 */

import { useEffect, useState } from 'react'

import type { BaseResponseCommonObject, ClipBookDto, PageClipBookDto } from '~/types/api/service'
import type { AutoCompleteProps } from '~/types/contents/api'
import type { MbTagSearchResultItem } from '~/types/contents/Common'
import { TagSearchListType } from '~/types/contents/Common'
import { useGetClipbooks } from '~/utils/api/clipbook/useGetClipbooks'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

export const useSearchClipbookName = ({
  tagSearchList,
  setTagSearchList,
  afterLoadComplete,
}: AutoCompleteProps<ClipBookDto>) => {
  //const storeUserSelectGroup = useAppSelector(state => state.user.userSelectGroup)
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)
  const [clipbookName, setClipbookName] = useState('')
  const [clipbookNameCount, setClipbookNameCount] = useState(10)

  // 클립북명 UseQuery
  const { refetch: refetchClipbookNameAutoComplete } = useGetClipbooks(
    {
      title: clipbookName,
      groupId: storeUserSelectGroup ?? -1,
      page: 1,
      size: clipbookNameCount,
      sort: 'title!asc',
    },
    {
      enabled: false,
    }
  )

  // 클리북 이름 자동완성 API 호출
  const handleClipbookNameAutoCompleteResult = async () => {
    const { data, isSuccess } = await refetchClipbookNameAutoComplete()

    if (!isSuccess) {
      return
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
      const { content } = resultData as PageClipBookDto

      const newSearchListData: TagSearchListType[] = []
      const autoCompleteData: MbTagSearchResultItem[] | undefined = content?.map(item => {
        return {
          id: item.clipBookId?.toString(),
          label: `${item.title} - ${item.type}`,
          checked: false,
        } as MbTagSearchResultItem
      })
      tagSearchList.map(item => {
        if (item.key === 'clipbookIdList') {
          newSearchListData.push({
            ...item,
            searchListData: autoCompleteData ?? [],
          })
        } else {
          newSearchListData.push(item)
        }
      })

      setTagSearchList(newSearchListData)

      afterLoadComplete && afterLoadComplete(content ?? [], clipbookNameCount)
    } else {
      openToast(message?.message, 'error')
    }
  }

  // 매체명 자동완성
  useEffect(() => {
    if (clipbookName !== '') {
      handleClipbookNameAutoCompleteResult()
    }
  }, [clipbookName])

  return {
    handleClipbookNameAutoCompleteResult,

    clipbookName,
    setClipbookName,
    clipbookNameCount,
    setClipbookNameCount,
  }
}
