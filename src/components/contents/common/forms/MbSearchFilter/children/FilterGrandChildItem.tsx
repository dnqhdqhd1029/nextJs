/**
 * @file FilterGrandChildItem.tsx
 * @description 컴포넌트 기능 설명
 */

import { ChangeEvent, useEffect, useState } from 'react'

import FilterCheckbox from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterCheckbox'
import type { MbSearchFilterItem } from '~/types/contents/Common'

interface Props {
  childItem: MbSearchFilterItem
  grandChildItem: MbSearchFilterItem
  onGrandChildCheckboxChange: (
    e: ChangeEvent<HTMLInputElement>,
    childItem: MbSearchFilterItem,
    grandChildItem: MbSearchFilterItem
  ) => void
}

const FilterGrandChildItem = ({ childItem, grandChildItem, onGrandChildCheckboxChange }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(true)

  useEffect(() => {
    if (childItem.searchTerm && childItem.searchTerm !== '') {
      if (grandChildItem.title.includes(childItem.searchTerm)) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    } else {
      setIsShow(true)
    }
  }, [childItem, grandChildItem])

  return (
    <li style={{ display: isShow ? 'flex' : 'none' }}>
      <FilterCheckbox
        item={grandChildItem}
        onChange={e => onGrandChildCheckboxChange(e, childItem, grandChildItem)}
      />
    </li>
  )
}

export default FilterGrandChildItem
