/**
 * @file ListHeader.tsx
 * @description 테이블 상단 헤더
 */

import { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState } from 'react'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import SelectList from '~/components/common/ui/SelectList'
import SortFilterList from '~/components/common/ui/SortFilterList'
import type { SelectListOptionItem } from '~/types/common'
import type { SortFilterOptionItem } from '~/types/common'

interface Props {
  totalCount?: number
  isPageLoadCompleted?: boolean
  searchTerm?: string
  filteringOptions?: SelectListOptionItem[]
  selectedFilteringItem?: string
  sortOptionsByData?: SortFilterOptionItem[]
  selectedSortItem?: string[]
  headDescription?: ReactNode
  onFilteringChange?: (option: SelectListOptionItem) => void
  onSortChange?: (dataItem: SortFilterOptionItem, orderItem: SortFilterOptionItem) => void
  onSearchTermChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onSearchTermEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  extraFilteringContent?: ReactNode
}

const TableBoardHeader = ({
  isPageLoadCompleted,
  totalCount,
  onFilteringChange,
  onSortChange,
  selectedFilteringItem,
  selectedSortItem,
  searchTerm,
  onSearchTermChange,
  filteringOptions = [],
  sortOptionsByData = [],
  headDescription,
  extraFilteringContent,
  onSearchTermEnter,
}: Props) => {
  const [inputValue, setInputValue] = useState(searchTerm)
  const [optionList, setOptionList] = useState<SelectListOptionItem[]>(filteringOptions)
  const [selectedOptionItem, setSelectedOptionItem] = useState<string>('-1')

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onSearchTermChange && onSearchTermChange(e)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSearchTermEnter && onSearchTermEnter(e)
    }
  }

  const handleSelectListChange = (option: SelectListOptionItem) => {
    onFilteringChange && onFilteringChange(option)
    setSelectedOptionItem(option.id)
  }

  useEffect(() => {
    if (!isPageLoadCompleted) {
      setInputValue(searchTerm)
    }
  }, [searchTerm])

  useEffect(() => {
    setOptionList(filteringOptions)
  }, [filteringOptions])

  useEffect(() => {
    if (!selectedFilteringItem) {
      return
    }

    setSelectedOptionItem(selectedFilteringItem)
  }, [selectedFilteringItem])

  return (
    <>
      <div className="setting-contents-list__header">
        <p className="font-body__regular display-flex align-items__center">
          {isPageLoadCompleted && totalCount !== undefined && <>총 {totalCount}명</>}
          {headDescription && <>{headDescription}</>}
        </p>
        <ul className="control-list">
          {extraFilteringContent && extraFilteringContent}
          <li>
            <SelectList
              optionList={optionList}
              onChange={handleSelectListChange}
              value={selectedOptionItem}
            />
          </li>
          <li>
            <SortFilterList
              sortOptionsByData={sortOptionsByData}
              onChange={onSortChange && onSortChange}
              value={selectedSortItem}
            />
          </li>
          <li className="search">
            <FormInputSearch
              id="user-list-search"
              name="user-list-search"
              placeholder={'검색'}
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={onSearchTermChange && handleSearchTermChange}
              preventAutoComplete
            />
          </li>
        </ul>
      </div>
    </>
  )
}

export default TableBoardHeader
