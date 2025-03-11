/**
 * @file FilterCheckbox.tsx
 * @description 체크박스
 */

import { ChangeEvent } from 'react'

import FormInputBtnControl from '~/components/common/ui/FormInputBtnControl'
import type { MbSearchFilterItem } from '~/types/contents/Common'

interface Props {
  item: MbSearchFilterItem
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const FilterCheckbox = ({ item, onChange }: Props) => {
  return (
    <div className="lnb-filter-depth3__checkbox">
      <FormInputBtnControl
        type="checkbox"
        name={item.id}
        id={item.id}
        label={item.title}
        count={item.count}
        checked={item.checked}
        onChange={e => onChange(e)}
      />
    </div>
  )
}

export default FilterCheckbox
