/**
 * @file useSearchMediaField.ts
 * @description 매체 분야 검색
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { AUTO_COMPLETE_COUNT } from '~/constants/common'
import type { BaseResponseCommonObject, NameCountDto, NameCountListDto } from '~/types/api/service'
import type {
  MbTagSearchExpandedItemObject,
  MbTagSearchExpandedTagItem,
  MbTagSearchResultItem,
} from '~/types/contents/Common'
import { TagSearchListType } from '~/types/contents/Common'
import type { PressMediaSearchResultItem } from '~/types/contents/PressMedia'
import { useGetMediaFieldAutoComplete } from '~/utils/api/media/useGetMediaFieldAutoComplete'
import { apiGetMediaFieldSubData, useGetMediaFieldSubData } from '~/utils/api/media/useGetMediaFieldSubData'
import { useGetMediaFieldType } from '~/utils/api/media/useGetMediaFieldType'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'

interface MediaAutoCompleteProps {
  tagSearchList: TagSearchListType[]
  setTagSearchList: Dispatch<SetStateAction<TagSearchListType[]>>
  afterLoadComplete?: (data: PressMediaSearchResultItem[], countArrayName: number) => void
}

export const useSearchMediaField = ({ tagSearchList, setTagSearchList, afterLoadComplete }: MediaAutoCompleteProps) => {
  const [mediaField, setMediaField] = useState('')
  const [mediaFieldCount, setMediaFieldCount] = useState(AUTO_COMPLETE_COUNT)
  const [mediaFieldSub, setMediaFieldSub] = useState('')

  // 매체 분야 UseQuery
  const { refetch: refetchMediaFieldAutoComplete } = useGetMediaFieldAutoComplete(
    {
      name: mediaField,
      page: 1,
      size: mediaFieldCount,
      sort: 'name!asc',
    },
    {
      enabled: false,
    }
  )

  // 미디어유형 목록 UseQuery
  const { refetch: refetchMediaFieldType } = useGetMediaFieldType(
    {
      type: 'INDUSTRY',
    },
    {
      enabled: false,
    }
  )

  // 미디어유형 하위 목록 UseQuery
  const { refetch: refetchMediaFieldSubData } = useGetMediaFieldSubData(
    {
      name: mediaFieldSub,
    },
    {
      enabled: false,
    }
  )

  // 미디어유형 자동완성 API 호출
  const handleMediaFieldAutoCompleteResult = async () => {
    const { data, isSuccess } = await refetchMediaFieldAutoComplete()

    if (!isSuccess) {
      return
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
      // console.log('>> handleMediaFieldAutoCompleteResult resultData: ', resultData)
      const reDefinedResultData = resultData as NameCountDto[]
      const newSearchListData: TagSearchListType[] = []
      const autoCompleteData: MbTagSearchResultItem[] = reDefinedResultData.map(item => {
        return {
          id: item.name,
          label: item.name,
          subLabel: item.count,
          checked: false,
        } as MbTagSearchResultItem
      })
      tagSearchList.map(item => {
        if (item.key === 'fieldList' || item.key === 'mediaFieldList') {
          newSearchListData.push({
            ...item,
            searchListData: autoCompleteData,
          })
        } else {
          newSearchListData.push(item)
        }
      })

      setTagSearchList(newSearchListData)

      afterLoadComplete && afterLoadComplete(reDefinedResultData, mediaFieldCount)
    } else {
      openToast(message?.message, 'error')
    }
  }

  // 미디어분야 자동완성
  useEffect(() => {
    if (mediaField !== '') {
      handleMediaFieldAutoCompleteResult()
    }
  }, [mediaField])

  // 미디어분야 목록 불러오기
  const getMediaFieldList = async (): Promise<string[]> => {
    const { data, isSuccess } = await refetchMediaFieldType()

    if (!isSuccess) {
      return []
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
      return (resultData as string[]).map((item: string) => {
        return item
      })
    } else {
      openToast(message?.message, 'error')
      return []
    }
  }

  // 미디어분야 하위 목록 불러오기
  const getMediaFieldSubData = async (name: string): Promise<PressMediaSearchResultItem[]> => {
    // const { data, isSuccess } = await refetchMediaFieldSubData()

    // if (!isSuccess) {
    //   return []
    // }

    // const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject
    const {
      data: resultData,
      status: resultStatus,
      message,
    } = (await apiGetMediaFieldSubData({ name })) as BaseResponseCommonObject

    if (resultStatus === 'S') {
      const { itmems: items } = resultData as NameCountListDto
      return (items as NameCountDto[]).map((item: NameCountDto) => {
        return item
      })
    } else {
      openToast(message?.message, 'error')
      return []
    }
  }

  // 분야/매체 분야 하위 목록 불러오기
  const handleGetMediaFieldSubData = async (upperItem: string, title: string) => {
    return new Promise<MbTagSearchExpandedItemObject>(async (resolve, reject) => {
      try {
        setMediaFieldSub(upperItem)
        const lowerResultList = await getMediaFieldSubData(upperItem)

        const newLowerItems: MbTagSearchExpandedTagItem[] = []
        lowerResultList.map((item, index) => {
          newLowerItems.push({
            id: item.name ?? '',
            label: item.name ?? '',
            subLabel: getCurrencyFormat(item.count),
            checked: index === 0,
          })
        })

        resolve({
          title,
          items: newLowerItems,
        })
      } catch (e) {
        console.log('>> e: ', e)
        openToast('분야 데이터를 불러오는데 실패했습니다.', 'error')
        reject(e)
      }
    })
  }

  return {
    // 매체 분야(자동완성)
    mediaField,
    setMediaField,
    mediaFieldCount,
    setMediaFieldCount,
    getMediaFieldList,
    handleGetMediaFieldSubData,
  }
}
