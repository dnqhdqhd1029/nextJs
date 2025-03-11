/**
 * @file FilterSearchItem.tsx
 * @description 아이템 검색
 */

import { ChangeEvent } from 'react'

import FormInputSearch from '~/components/common/ui/FormInputSearch'

interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const FilterSearchItem = ({ onChange }: Props) => {
  return (
    <div className="lnb-filter__search display-block">
      <FormInputSearch onChange={onChange && onChange} />
    </div>
  )
}

export default FilterSearchItem
