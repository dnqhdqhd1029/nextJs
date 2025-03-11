import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { MEDIA_VALUE_MAX_POINT } from '~/constants/common'
import { BaseResponseCommonObject, type PageClipBookDto, PageResponseTagDto, PageTagDto } from '~/types/api/service'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { useGetTagList } from '~/utils/api/tag/useGetTagList'
import { usePostTagCreate } from '~/utils/api/tag/usePostTagCreate'
import { openToast } from '~/utils/common/toast'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

interface Props {
  isOpen: boolean
  type?: string
  category: 'NEWS' | 'ACTION'
}
export const useTagSearchForm = (props: Props) => {
  const createTag = usePostTagCreate()
  const { licenseInfo, userInfo, userSelectGroup, globalNoti, shareCodeData } = useAppSelector(state => state.authSlice)
  const [inputValue, setInputValue] = useState<string>('')
  const [newsTagList, setNewsTagList] = useState<MbTagSearchTagItem[]>([])
  const [inputValueErrorMessage, setInputValueErrorMessage] = useState('')

  const {
    isLoading,
    data: getNewsTagListData,
    refetch: refetchGetNewsTagListData,
  } = useGetTagList(
    {
      name: inputValue,
      category: props.category,
      page: 1,
      size: inputValue === '' ? 8 : MEDIA_VALUE_MAX_POINT,
      sort: 'updateAt!desc',
      groupId: userSelectGroup,
    },
    {
      enabled: props.type && props.type !== '' ? (inputValue === '' ? false : props.isOpen) : props.isOpen,
    }
  )

  const setNewstagListData = async (apiData: PageTagDto) => {
    let newTags: MbTagSearchTagItem[] = []
    if (apiData.content && apiData.content.length > 0) {
      for await (const newTag of apiData.content) {
        if (newTag.tagId && newTag.name) {
          newTags = [
            ...newTags,
            {
              id: newTag.tagId?.toString(),
              label: `${newTag.name}`,
            },
          ]
        }
      }
    }
    setNewsTagList(() => newTags)
  }

  const onChangeCheckedSearchData = (
    i: boolean,
    e: MbTagSearchTagItem,
    tagList: MbTagSearchTagItem[],
    limitAmount?: number
  ) => {
    let res: MbTagSearchTagItem[] = [...tagList]
    if (i) {
      res = res.filter(item => item.id !== e.id)
    } else {
      if (limitAmount && res.length >= limitAmount) {
        openToast(`${limitAmount}개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요`, 'warning')
      } else {
        res = [
          ...res,
          {
            id: e.id,
            label: e.label,
          },
        ]
      }
    }
    return res
  }

  const handleTagCreate = async (e: string) => {
    if (e === '') {
      setInputValueErrorMessage(() => '태그를 입력해주세요.')
    } else if (e && e.length > 30) {
      setInputValueErrorMessage(() => '태그는 30자를 넘을 수 없습니다.')
    } else {
      const { status, data, message } = await createTag.mutateAsync({
        name: e,
        category: props.category,
        groupId: userSelectGroup,
      })
      if (status === 'S') {
        openToast(message?.message, 'success')
        await refetchGetNewsTagListData()
      } else {
        openToast(message?.message, 'error')
      }
    }
  }

  const handleInputSearchChange = (e: string) => {
    if (e && e.length > 30) {
      setInputValueErrorMessage(() => '태그는 30자를 넘을 수 없습니다.')
    } else {
      setInputValue(() => e)
    }
  }

  useEffect(() => {
    if (!getNewsTagListData) return
    const { status, data: apiData, message } = getNewsTagListData as BaseResponseCommonObject
    if (status === 'S') {
      setNewstagListData(apiData as PageTagDto)
    } else {
      openToast(message?.message, 'error')
    }
  }, [getNewsTagListData])

  useEffect(() => {
    if (!props.type) return
    setInputValue(() => '')
    setInputValueErrorMessage(() => '')
    setNewsTagList(() => [])
  }, [props.type])

  return {
    licenseInfo,
    userInfo,
    userSelectGroup,
    inputValue,
    newsTagList,
    inputValueErrorMessage,

    onChangeCheckedSearchData,
    handleInputSearchChange,
    handleTagCreate,
  }
}
