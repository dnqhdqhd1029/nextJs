/**
 * @file FilterSelectItem.tsx
 * @description 필터 셀렉트 아이템
 */
import { MouseEvent } from 'react'
import cn from 'classnames'

import type { MbSearchFilterItem } from '~/types/contents/Common'

interface Props {
  item: MbSearchFilterItem
  onChange: (e: MouseEvent<HTMLButtonElement>) => void
}

const FilterSelectItem = ({ item, onChange }: Props) => {
  return (
    <button
      className={cn('lnb-filter-depth2__option', { 'is-selected': item.checked })}
      onClick={onChange}
      disabled={item.disabled}
    >
      <span className="lnb-filter-depth2__option-text">{item.title}</span>
      {item.selectedItem && <span className="lnb-filter__menu-txt type-count">{item.selectedItem.title}</span>}
    </button>
  )
}

export default FilterSelectItem
