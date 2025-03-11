/**
 * @file SearchSelect.tsx
 * @description 검색어 입력 Select
 */
import { useContext, useEffect, useState } from 'react'
import _ from 'lodash'

import { TagSearchContext } from './TagSearchContainer'

import Select from '~/components/common/ui/Select'
import type { SelectListOptionItem } from '~/types/common'

const SearchInput = () => {
  const [optionValues, setOptionValues] = useState<SelectListOptionItem[]>([])
  const { listItems, nameTagItems, setNameTagItems } = useContext(TagSearchContext)

  useEffect(() => {
    if (listItems.length > 0) {
      const newOptionValues: SelectListOptionItem[] = []
      listItems.map(item => {
        newOptionValues.push({
          id: item.id,
          name: item.label,
        })
      })
      setOptionValues(newOptionValues)
    }
  }, [listItems])

  const handleNameSearchChange = (option: SelectListOptionItem) => {
    const newNameTagItems = _.cloneDeep(nameTagItems)
    newNameTagItems.push({
      id: option.id,
      label: option.name,
    })
    setNameTagItems(newNameTagItems)
  }

  if (optionValues.length === 0) {
    return null
  }

  return (
    <Select
      onChange={handleNameSearchChange}
      options={optionValues}
    />
  )
}

export default SearchInput
