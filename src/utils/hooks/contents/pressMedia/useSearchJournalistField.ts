/**
 * @file useSearchJournalistField.ts
 * @description 언론인 분야 검색
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { AUTO_COMPLETE_COUNT } from '~/constants/common'
import type { BaseResponseCommonObject, NameCountDto } from '~/types/api/service'
import type {
  MbTagSearchExpandedItemObject,
  MbTagSearchExpandedTagItem,
  MbTagSearchResultItem,
} from '~/types/contents/Common'
import { TagSearchListType } from '~/types/contents/Common'
import type { PressMediaSearchResultItem } from '~/types/contents/PressMedia'
import { useGetJournalistFieldAutoComplete } from '~/utils/api/journalist/useGetJournalistFieldAutoComplete'
import {
  apiGetJournalistFieldSubData,
  useGetJournalistFieldSubData,
} from '~/utils/api/journalist/useGetJournalistFieldSubData'
import { useGetMediaFieldType } from '~/utils/api/media/useGetMediaFieldType'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'

interface MediaAutoCompleteProps {
  tagSearchList: TagSearchListType[]
  setTagSearchList: Dispatch<SetStateAction<TagSearchListType[]>>
  afterLoadComplete?: (data: PressMediaSearchResultItem[], countArrayName: number) => void
}

export const useSearchJournalistField = ({
  tagSearchList,
  setTagSearchList,
  afterLoadComplete,
}: MediaAutoCompleteProps) => {
  const [journalistField, setJournalistField] = useState('')
  const [journalistFieldCount, setJournalistFieldCount] = useState(AUTO_COMPLETE_COUNT)
  const [journalistFieldSub, setJournalistFieldSub] = useState('')

  // 매체 분야 UseQuery
  const { refetch: refetchJournalistFieldAutoComplete } = useGetJournalistFieldAutoComplete(
    {
      name: journalistField,
      page: 1,
      size: journalistFieldCount,
      sort: 'name!asc',
    },
    {
      enabled: false,
    }
  )

  // 언론인 상위 분야(미디어와 같음)
  const { refetch: refetchMediaFieldType } = useGetMediaFieldType(
    {
      type: 'INDUSTRY',
    },
    {
      enabled: false,
    }
  )

  // 언론인 하위 분야
  const { refetch: refetchJournalistFieldSubData } = useGetJournalistFieldSubData(
    {
      name: journalistFieldSub,
    },
    {
      enabled: false,
    }
  )

  // 언론인 분야 자동완성 API 호출
  const handleJournalistFieldAutoCompleteResult = async () => {
    const { data, isSuccess } = await refetchJournalistFieldAutoComplete()

    if (!isSuccess) {
      return
    }

    const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject

    if (resultStatus === 'S') {
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
        if (item.key === 'fieldList') {
          newSearchListData.push({
            ...item,
            searchListData: autoCompleteData,
          })
        } else {
          newSearchListData.push(item)
        }
      })

      setTagSearchList(newSearchListData)

      afterLoadComplete && afterLoadComplete(reDefinedResultData, journalistFieldCount)
    } else {
      openToast(message?.message, 'error')
    }
  }

  // 언론인 분야 자동완성
  useEffect(() => {
    if (journalistField !== '') {
      handleJournalistFieldAutoCompleteResult()
    }
  }, [journalistField])

  // 언론인 상위 분야 목록 불러오기
  const getJournalistFieldList = async (): Promise<string[]> => {
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

  // 언론인 분야 하위 목록 불러오기
  const getJournalistFieldSubData = async (name: string): Promise<PressMediaSearchResultItem[]> => {
    // const { data, isSuccess } = await refetchJournalistFieldSubData()

    // if (!isSuccess) {
    //   return []
    // }

    // const { data: resultData, status: resultStatus, message } = data as BaseResponseCommonObject
    const {
      data: resultData,
      status: resultStatus,
      message,
    } = (await apiGetJournalistFieldSubData({
      name,
    })) as BaseResponseCommonObject

    if (resultStatus === 'S') {
      return (resultData as PressMediaSearchResultItem[]).map((item: PressMediaSearchResultItem) => {
        return item
      })
    } else {
      openToast(message?.message, 'error')
      return []
    }
  }

  // 분야/매체 분야 하위 목록 불러오기
  const handleGetJournalistFieldSubData = async (upperItem: string, title: string) => {
    return new Promise<MbTagSearchExpandedItemObject>(async (resolve, reject) => {
      try {
        setJournalistFieldSub(upperItem)
        const lowerResultList = await getJournalistFieldSubData(upperItem)

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
    journalistField,
    setJournalistField,
    journalistFieldCount,
    setJournalistFieldCount,
    getJournalistFieldList,
    handleGetJournalistFieldSubData,
  }
}
