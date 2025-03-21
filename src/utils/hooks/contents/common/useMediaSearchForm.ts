import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { MEDIA_VALUE_MAX_POINT } from '~/constants/common'
import { MediaAutoCompleteDto } from '~/types/api/service'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { apiGetMediaNameAutoComplete } from '~/utils/api/media/useGetMediaNameAutoComplete'
import { openToast } from '~/utils/common/toast'
import useDebounce from '~/utils/hooks/common/useDebounce'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

interface Props {
  isJustCount?: boolean
  isNoDetail?: boolean
  useDisabled?: boolean
}
export const useMediaSearchForm = (props: Props) => {
  const { licenseInfo, userInfo, userSelectGroup, globalNoti, shareCodeData } = useAppSelector(state => state.authSlice)
  const [inputValue, setInputValue] = useState<string>('')
  const [dataValue, setDataValue] = useState<string>('')
  const [newsTagList, setNewsTagList] = useState<MbTagSearchResultItem[]>([])
  const debouncedUpdateState = useDebounce(dataValue, 500)

  const mediaListFetchData = async (value: string) => {
    let newTags: MbTagSearchResultItem[] = []
    const { status, data, message } = await apiGetMediaNameAutoComplete({
      name: value,
      page: 1,
      size: MEDIA_VALUE_MAX_POINT,
      sort: 'name!asc',
    })
    if (status === 'S') {
      const apiData = data as MediaAutoCompleteDto[]
      if (apiData && apiData.length > 0) {
        for await (const newTag of apiData) {
          newTags = [
            //@ts-ignore
            ...newTags,
            {
              id: newTag.mediaId?.toString() ?? uuid(),
              label: `${newTag.name} - ${newTag.subcategory}`,
              checked: false,
              className: 'mediaId',
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
            label: e.label,
            className: e.className ? e.className : 'mediaId',
          },
        ]
      }
    }
    return res
  }

  const handleInputSearchChange = (e: string) => {
    setInputValue(() => e)
  }

  const handleDataInputSearchChange = (e: string) => {
    setDataValue(() => e)
  }

  useEffect(() => {
    if (dataValue !== '') {
      mediaListFetchData(dataValue)
    }
  }, [debouncedUpdateState])

  return {
    licenseInfo,
    userInfo,
    userSelectGroup,
    inputValue,
    newsTagList,

    onChangeCheckedSearchData,
    handleInputSearchChange,
    handleDataInputSearchChange,
  }
}
