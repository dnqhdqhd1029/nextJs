/**
 * @file useSearchMediaType.ts
 * @description 매체 분야 검색
 */

import type { MbTagSearchExpandedItemObject, MbTagSearchExpandedTagItem } from '~/types/contents/Common'
import { apiGetCommonCode, CommonCode, UseGetCommonCodeParams } from '~/utils/api/common/useGetCommonCode'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'

export const useSearchMediaType = () => {
  // 미디어유형 하위 분야
  const getMediaTypeSubData = async (commonCodeParams: UseGetCommonCodeParams) => {
    const { data: resultData, status, message } = await apiGetCommonCode(commonCodeParams)

    if (status === 'S') {
      return (resultData as CommonCode[]).map((item: CommonCode) => {
        return item
      })
    } else {
      openToast(message?.message, 'error')
      return []
    }
  }

  const handleGetMediaTypeSubData = (params: UseGetCommonCodeParams, title: string) => {
    return new Promise<MbTagSearchExpandedItemObject>(async (resolve, reject) => {
      try {
        let lowerResultList = await getMediaTypeSubData(params)
        const newLowerItems: MbTagSearchExpandedTagItem[] = []
        lowerResultList.map((item, index) => {
          newLowerItems.push({
            id: item.code.toString() ?? '',
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
        reject(e)
        openToast('미디어유형 데이터를 불러오는데 실패했습니다.', 'error')
      }
    })
  }

  return {
    // 매체 유형
    getMediaTypeSubData,
    handleGetMediaTypeSubData,
  }
}
