import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import { MediaBookTagLabel } from '~/components/contents/common/forms/MediaBookSearchForm/MediaBookTagLabel'
import {
  BaseResponseCommonObject,
  type PageClipBookDto,
  type PageJrnlstListDto,
  type PageMediaListDto,
  PageResponseTagDto,
  PageTagDto,
} from '~/types/api/service'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import {
  apiGetAutoCompleteJournalistGroup,
  useGetJournalistGroup,
} from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { useGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { useGetTagList } from '~/utils/api/tag/useGetTagList'
import { getNewsDateFormat } from '~/utils/common/date'
import { openToast } from '~/utils/common/toast'
import useDebounce from '~/utils/hooks/common/useDebounce'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

interface Props {
  isDetail?: boolean
  isJustCount?: boolean
  isNoDetail?: boolean
  useDisabled?: boolean
}
export const usePressBookSearchForm = (props: Props) => {
  const { licenseInfo, userInfo, userSelectGroup, timeZone, shareCodeData } = useAppSelector(state => state.authSlice)
  const [inputValue, setInputValue] = useState<string>('')
  const [newsTagList, setNewsTagList] = useState<MbTagSearchResultItem[]>([])
  const debouncedUpdateState = useDebounce(inputValue, 500)

  const journalistGroupListFetchData = async (value: string) => {
    let newTags: MbTagSearchResultItem[] = []
    const { status, data, message } = await apiGetAutoCompleteJournalistGroup({
      page: 1,
      size: 9999999,
      sort: ['updateAt!desc'],
      groupId: userSelectGroup,
      title: value,
    })
    if (status === 'S') {
      const apiData = data as PageJrnlstListDto
      if (apiData.content && apiData.content.length > 0) {
        for await (const newTag of apiData.content) {
          const count = Number(newTag?.journalistCount) || 0
          const updateAtDate = moment(newTag?.updateAt || '').format('YYYY-MM-DD')
          const updater = newTag?.updater?.displayName || ''
          newTags = [
            //@ts-ignore
            ...newTags,
            {
              id: newTag.jrnlstListId?.toString() ?? uuid(),
              //@ts-ignore
              label: newTag?.title,
              subData: props.isJustCount ? count : '',
              subLabel: props.isDetail
                ? `${
                    newTag?.cuType === 'UPDATE'
                      ? getNewsDateFormat(timeZone, moment(newTag.updateAt).format('YYYY-MM-DD HH:mm'), true)
                      : getNewsDateFormat(timeZone, moment(newTag.regisAt).format('YYYY-MM-DD HH:mm'), true)
                  } ${newTag?.cuType === 'UPDATE' ? newTag.updater?.displayName : newTag.register?.displayName} ${
                    newTag?.cuType === 'UPDATE' ? '최종수정' : '생성'
                  }`
                : '',
              realLabel: newTag?.title || '',
              className: 'jrnlstListId',
            },
          ]
        }
      }
      setNewsTagList(() => newTags)
    } else {
      openToast(message?.message, 'error')
    }
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
            label: `${e.label} ${e.subData}명`,
            className: e.className ? e.className : 'jrnlstListId',
          },
        ]
      }
    }
    return res
  }

  const handleInputSearchChange = (e: string) => {
    setInputValue(() => e)
  }

  useEffect(() => {
    if (inputValue !== '') {
      journalistGroupListFetchData(inputValue)
    }
  }, [debouncedUpdateState])

  return {
    licenseInfo,
    userInfo,
    userSelectGroup,
    inputValue,
    newsTagList,

    setNewsTagList,
    onChangeCheckedSearchData,
    handleInputSearchChange,
  }
}
