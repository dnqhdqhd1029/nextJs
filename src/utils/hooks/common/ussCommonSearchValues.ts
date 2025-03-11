/**
 * @file ussCommonSearchValues.ts
 * @description 공통 검색 값 비교 hook
 */

import { CommonSearchValues } from '~/types/contents/Common'

export const useCommonSearchValues = () => {
  const isSameValues = (originValues: CommonSearchValues, newValues: CommonSearchValues): boolean => {
    let flag = true
    Object.keys(originValues).map(key => {
      const originValue = originValues[key]
      const newValue = newValues[key]
      const isLabelComparison = key === 'queryAnd' || key === 'queryOr' || key === 'queryNot'
      if (newValue !== undefined) {
        if (originValue.length !== newValue.length) {
          flag = false
        } else {
          originValue.map(item => {
            if (isLabelComparison) {
              const isSameLabelExist = newValue.find(newItem => newItem.label === item.label)
              if (!isSameLabelExist) {
                flag = false
              }
            } else {
              const isSameItemExist = newValue.find(newItem => newItem.id === item.id)
              if (!isSameItemExist) {
                flag = false
              }
            }
          })
        }
      } else {
        flag = false
      }
    })

    return flag
  }

  return {
    isSameValues,
  }
}
