import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { MEDIA_VALUE_MAX_POINT } from '~/constants/common'
import { BaseResponseCommonObject, type PageClipBookDto } from '~/types/api/service'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { useGetClipbooks } from '~/utils/api/clipbook/useGetClipbooks'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

export const useClipbookSearchForm = () => {
  const { licenseInfo, userInfo, userSelectGroup, globalNoti, shareCodeData } = useAppSelector(state => state.authSlice)
  const [inputValue, setInputValue] = useState<string>('')
  const [clipbookList, setClipbookList] = useState<MbTagSearchTagItem[]>([])

  const { data: getClipbookListData } = useGetClipbooks(
    {
      page: 1,
      size: inputValue === '' ? 8 : MEDIA_VALUE_MAX_POINT,
      sort: 'updateAt!desc',
      title: inputValue,
      groupId: userSelectGroup,
    },
    {
      enabled: true,
    }
  )

  const setClipbookListData = async (apiData: PageClipBookDto) => {
    let newTags: MbTagSearchTagItem[] = []
    if (apiData.content && apiData.content.length > 0) {
      for await (const newTag of apiData.content) {
        newTags = [
          ...newTags,
          {
            id: newTag.clipBookId?.toString() ?? uuid(),
            label: `${newTag.title}` ?? '',
          },
        ]
      }
    }
    setClipbookList(() => newTags)
  }

  const onChangeCheckedSearchData = (i: boolean, e: MbTagSearchTagItem, tagList: MbTagSearchTagItem[]) => {
    let res: MbTagSearchTagItem[] = [...tagList]
    if (i) {
      res = res.filter(item => item.id !== e.id)
    } else {
      res = [
        ...res,
        {
          id: e.id,
          label: e.label,
        },
      ]
    }
    return res
  }

  const handleInputSearchChange = (e: string) => {
    setInputValue(() => e)
  }

  useEffect(() => {
    if (!getClipbookListData) return
    const { status, data: apiData, message } = getClipbookListData as BaseResponseCommonObject
    if (status === 'S') {
      setClipbookListData(apiData as PageClipBookDto)
    } else {
      openToast(message?.message, 'error')
    }
  }, [getClipbookListData])

  return {
    licenseInfo,
    userInfo,
    userSelectGroup,
    inputValue,
    clipbookList,

    onChangeCheckedSearchData,
    handleInputSearchChange,
  }
}
