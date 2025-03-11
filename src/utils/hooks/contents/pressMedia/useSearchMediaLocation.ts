/**
 * @file useSearchMediaLocation.ts
 * @description 미디어지역 검색
 */

import { useEffect, useState } from 'react'

import type { BaseResponseCommonObject } from '~/types/api/service'
import { NameCountDto, NameCountListDto } from '~/types/api/service'
import type { MbTagSearchExpandedItemObject, MbTagSearchExpandedTagItem } from '~/types/contents/Common'
import type { PressMediaSearchResultItem } from '~/types/contents/PressMedia'
import { useGetMediaFieldType } from '~/utils/api/media/useGetMediaFieldType'
import { apiGetMediaLocationSubData } from '~/utils/api/media/useGetMediaLocation'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'

export const useSearchMediaLocation = () => {
  const [upperLocationList, setUpperLocationList] = useState<string[]>([])

  // 미디어지역 상위 목록
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

  // 미디어지역 상위 목록 불러오기
  const getMediaLocationList = async (): Promise<string[]> => {
    return (upperLocationList as string[]).map((item: string) => {
      return item
    })
  }

  // 미디어지역 하위 목록 불러오기 API
  const getMediaLocationSubData = async (mediaLocationSub: string): Promise<PressMediaSearchResultItem[]> => {
    const {
      data: resultData,
      status: resultStatus,
      message,
    } = await apiGetMediaLocationSubData({
      name: mediaLocationSub,
    })

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

  // 미디어지역 하위 목록 불러오기
  const handleGetMediaLocationSubData = async (upperItem: string, title: string) => {
    return new Promise<MbTagSearchExpandedItemObject>(async (resolve, reject) => {
      try {
        const lowerResultList = await getMediaLocationSubData(upperItem)

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
    getMediaLocationList,
    handleGetMediaLocationSubData,
  }
}
