/**
 * @file useSearchJournalistType.ts
 * @description 언론인 분야 검색
 */

import { BaseResponseCommonObject } from '~/types/api/service'
import type { MbTagSearchExpandedItemObject, MbTagSearchExpandedTagItem } from '~/types/contents/Common'
import type { PressMediaSearchFilter } from '~/types/contents/PressMedia'
import { apiGetCommonCode, CommonCode, UseGetCommonCodeParams } from '~/utils/api/common/useGetCommonCode'
import { usePostJournalistSearch } from '~/utils/api/journalist/usePostJournalistSearch'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

export interface UseSearchJournalistTypeParams {
  parentCode: string
  parentCommonCodeId?: number
  parentCodeName: string
}

export const useSearchJournalistType = () => {
  const { userSelectGroup } = useAppSelector(state => state.authSlice)
  // 언론인 미디어유형 하위 분야 - elastic search 이용
  const getJournalistSearchResult = usePostJournalistSearch()

  // 언론인 미디어유형 하위 분야
  const getJournalistTypeSubData = async (commonCodeParams: UseGetCommonCodeParams) => {
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

  const adjustLowerResultData = (resultData: BaseResponseCommonObject, commonCodes: CommonCode[]) => {
    const { data, status, message } = resultData
    if (status === 'S') {
      const filters = data as PressMediaSearchFilter

      if (filters.filterSubtype && filters.filterSubtype.length > 0) {
        const newSubType: CommonCode[] = []
        Object.keys(filters.filterSubtype).map(key => {
          const value = filters.filterSubtype[key]
          const code = Object.keys(value)[0]
          const count = Object.values(value)[0]

          const findItem = commonCodes?.find(item => item.code === code)

          if (findItem) {
            newSubType.push({
              code: findItem.code,
              name: findItem.name,
              count: Number(count),
            } as CommonCode)
          }
        })
        return newSubType
      } else {
        return []
      }
    } else {
      openToast(message?.message, 'error')
      return []
    }
  }

  const handleGetJournalistTypeSubData = (params: UseSearchJournalistTypeParams, title: string) => {
    return new Promise<MbTagSearchExpandedItemObject>(async (resolve, reject) => {
      try {
        console.log('>> [handleGetJournalistTypeSubData] params: ', params)
        // let originLowerResultList = await getJournalistTypeSubData(params.parentCode)
        let lowerResultData = await getJournalistSearchResult.mutateAsync({
          page: 1,
          size: 10,
          filter: '',
          sort: ['name!asc'],
          mainCategoryList: [params.parentCodeName],
          groupId: userSelectGroup,
        })
        const originLowerResultList = await getJournalistTypeSubData(params)
        const lowerResultList = adjustLowerResultData(lowerResultData, originLowerResultList)

        console.log('>> 엘라스틱 lowerResultData: ', lowerResultData)
        console.log('>> originLowerResultList: ', originLowerResultList)
        console.log('>> lowerResultList: ', lowerResultList)

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
        openToast('언론인유형 데이터를 불러오는데 실패했습니다.', 'error')
      }
    })
  }

  return {
    // 언론인 유형
    getJournalistTypeSubData,
    handleGetJournalistTypeSubData,
  }
}
