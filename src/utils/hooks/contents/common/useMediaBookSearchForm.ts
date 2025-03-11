import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import { MEDIA_VALUE_MAX_POINT } from '~/constants/common'
import { type PageMediaListDto } from '~/types/api/service'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { apiGetAutoCompleteMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
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
export const useMediaBookSearchForm = (props: Props) => {
  const { licenseInfo, timeZone, userInfo, userSelectGroup, globalNoti, shareCodeData } = useAppSelector(
    state => state.authSlice
  )
  const [inputValue, setInputValue] = useState<string>('')
  const [newsTagList, setNewsTagList] = useState<MbTagSearchResultItem[]>([])
  const debouncedUpdateState = useDebounce(inputValue, 500)

  const mediaGroupListFetchData = async (value: string) => {
    let newTags: MbTagSearchResultItem[] = []
    const { status, data, message } = await apiGetAutoCompleteMediaGroup({
      page: 1,
      size: MEDIA_VALUE_MAX_POINT,
      sort: ['updateAt!desc'],
      groupId: userSelectGroup,
      title: value,
    })
    if (status === 'S') {
      const apiData = data as PageMediaListDto
      if (apiData.content && apiData.content.length > 0) {
        for await (const newTag of apiData.content) {
          const count = Number(newTag?.mediaCount) || 0
          const updateAtDate = moment(newTag?.updateAt || '').format('YYYY-MM-DD')
          const updater = newTag?.updater?.displayName || ''
          newTags = [
            //@ts-ignore
            ...newTags,
            {
              id: newTag.mediaListId?.toString() ?? uuid(),
              //@ts-ignore
              label: newTag?.title,
              subData: props.isJustCount ? count : `${count}개(이메일 ${newTag?.emailCount || 0}개)`,
              subLabel: props.isDetail
                ? `${
                    newTag?.cuType === 'UPDATE'
                      ? getNewsDateFormat(timeZone, moment(newTag.updateAt).format('YYYY-MM-DD HH:mm'), true)
                      : getNewsDateFormat(timeZone, moment(newTag.regisAt).format('YYYY-MM-DD HH:mm'), true)
                  } ${newTag?.cuType === 'UPDATE' ? newTag.updater?.displayName : newTag.register?.displayName} ${
                    newTag?.cuType === 'UPDATE' ? '최종수정' : '생성'
                  }`
                : '',
              realLabel: count.toString(),
              className: 'mediaListId',
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
            label: props.isJustCount ? `${e.label} ${e.subData}개` : `${e.label} ${e.subData}`,
            className: e.className ? e.className : 'mediaListId',
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
      mediaGroupListFetchData(inputValue)
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
