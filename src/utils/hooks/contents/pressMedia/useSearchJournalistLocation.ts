/**
 * @file useSearchJournalistLocation.ts
 * @description 언론인 지역 검색
 */

import { useEffect, useState } from 'react'

import type { BaseResponseCommonObject } from '~/types/api/service'
import type { MbTagSearchExpandedItemObject, MbTagSearchExpandedTagItem } from '~/types/contents/Common'
import type { PressMediaSearchResultItem } from '~/types/contents/PressMedia'
import { apiGetJournalistFieldSubData } from '~/utils/api/journalist/useGetJournalistLocation'
import { usePostJournalistSearch } from '~/utils/api/journalist/usePostJournalistSearch'
import { useGetMediaFieldType } from '~/utils/api/media/useGetMediaFieldType'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'

export const useSearchJournalistLocation = () => {
  // 언론인 미디어유형 하위 분야 - elastic search 이용
  const getJournalistSearchResult = usePostJournalistSearch()

  const [upperLocationList, setUpperLocationList] = useState<string[]>([])

  // 지역 상위 목록 불러오기
  const { data: mediaUpperLocationListData } = useGetMediaFieldType({
    type: 'LOCATION',
  })

  useEffect(() => {
    if (!mediaUpperLocationListData) {
      return
    }

    const { status, data, message } = mediaUpperLocationListData as BaseResponseCommonObject

    if (status === 'S') {
      setUpperLocationList(data as string[])
    } else {
      openToast(message?.message, 'error')
    }
  }, [mediaUpperLocationListData])

  // 지역 상위 목록 불러오기
  const getJournalistLocationList = async (): Promise<string[]> => {
    return (upperLocationList as string[]).map((item: string) => {
      return item
    })
  }

  // 지역 하위 목록 불러오기
  const getJournalistLocationSubData = async (journalistLocationSub: string): Promise<PressMediaSearchResultItem[]> => {
    const response = await apiGetJournalistFieldSubData({
      name: journalistLocationSub,
    })

    const { data: resultData, status: resultStatus, message } = response as BaseResponseCommonObject

    if (resultStatus === 'S') {
      return (resultData as PressMediaSearchResultItem[]).map((item: PressMediaSearchResultItem) => {
        return item
      })
    } else {
      openToast(message?.message, 'error')
      return []
    }
  }

  // 지역 하위 목록 불러오기
  const handleGetJournalistLocationSubData = async (upperItem: string, title: string) => {
    return new Promise<MbTagSearchExpandedItemObject>(async (resolve, reject) => {
      try {
        const lowerResultList = await getJournalistLocationSubData(upperItem)

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
        openToast('지역 데이터를 불러오는데 실패했습니다.', 'error')
        reject(e)
      }
    })
  }

  return {
    getJournalistLocationList,
    handleGetJournalistLocationSubData,
  }
}
