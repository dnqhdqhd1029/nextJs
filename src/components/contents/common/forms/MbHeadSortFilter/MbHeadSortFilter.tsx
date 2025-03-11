/**
 * @file MbSortFilter.tsx
 * @description 정렬 필터
 */
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

import MyItemToggle from './MyItemToggle'
import SearchButton from './SearchButton'
import SearchInput from './SearchInput'

import SelectList from '~/components/common/ui/SelectList'
import SortFilterList from '~/components/common/ui/SortFilterList'
import type { SelectListOptionItem } from '~/types/common'
import type { SortFilterOptionItem } from '~/types/common'

interface Props {
  hasMyItemToggle?: boolean
  onMyItemToggle?: (e: ChangeEvent<HTMLInputElement>) => void
  hasDisclosureScopeFilter?: boolean
  disclosureScopeFilterOptionList?: SelectListOptionItem[]
  selectedDisclosureScopeFilterOption?: string
  onDisclosureScopeFilterChange?: (option: SelectListOptionItem) => void
  hasSearch?: boolean
  hasSortFilter?: boolean
  searchWidth?: number
  searchPortalSelector?: string
  isNoData?: boolean
  myItemToggleChecked?: boolean
  totalCount?: number
  isMyItemToggleDisabled?: boolean
  onSearchInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onSearchInputKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  searchValue?: string
  sortOptionsByData?: SortFilterOptionItem[]
  sortOptionsByOrder?: SortFilterOptionItem[]
  selectedSortOption?: string[]
  onSortFilterChange?: (dataItem: SortFilterOptionItem, orderItem: SortFilterOptionItem) => void
}

const MbSortFilter = ({
  hasDisclosureScopeFilter = false,
  disclosureScopeFilterOptionList = [],
  selectedDisclosureScopeFilterOption,
  onDisclosureScopeFilterChange,
  hasMyItemToggle = false,
  hasSearch = false,
  hasSortFilter = false,
  searchPortalSelector = '#mb-head-sort-filter__portal',
  onMyItemToggle,
  isNoData = false,
  myItemToggleChecked,
  isMyItemToggleDisabled,
  onSearchInputChange,
  searchValue,
  sortOptionsByData = [],
  sortOptionsByOrder = [],
  selectedSortOption = [''],
  onSortFilterChange,
  totalCount,
  onSearchInputKeyDown,
}: Props) => {
  const [isSearchShow, setIsSearchShow] = useState(false)
  const [dsFilterOptionList, setDsFilterOptionList] = useState<SelectListOptionItem[]>([])
  const [selectedDsFilterOption, setSelectedDsFilterOption] = useState<string>('')
  const [defaultSortOptionsByData, setDefaultSortOptionsByData] = useState<SortFilterOptionItem[]>([])

  const handleToggleSearchShow = () => {
    setIsSearchShow(!isSearchShow)
  }

  const handleDisclosureScopeFilterChange = (option: SelectListOptionItem) => {
    setSelectedDsFilterOption(option.id)
    onDisclosureScopeFilterChange && onDisclosureScopeFilterChange(option)
  }

  useEffect(() => {
    if (hasDisclosureScopeFilter && disclosureScopeFilterOptionList) {
      setDsFilterOptionList(disclosureScopeFilterOptionList)
    }
  }, [disclosureScopeFilterOptionList])

  useEffect(() => {
    if (hasDisclosureScopeFilter && selectedDisclosureScopeFilterOption) {
      setSelectedDsFilterOption(selectedDisclosureScopeFilterOption)
    }
  }, [selectedDisclosureScopeFilterOption])

  useEffect(() => {
    if (searchValue !== '') {
      setIsSearchShow(true)
    } else {
      setIsSearchShow(false)
    }
  }, [searchValue])

  useEffect(() => {
    if (hasSortFilter && sortOptionsByData) {
      setDefaultSortOptionsByData(sortOptionsByData)
    }
  }, [sortOptionsByData])

  return (
    <div className="header-sort__filter display-flex">
      <ul className="s-header__control">
        {hasMyItemToggle && (
          <MyItemToggle
            onChange={onMyItemToggle}
            checked={myItemToggleChecked}
            disabled={isMyItemToggleDisabled}
          />
        )}
        {hasDisclosureScopeFilter && (
          <li className="select">
            <SelectList
              optionList={dsFilterOptionList}
              value={selectedDsFilterOption}
              onChange={handleDisclosureScopeFilterChange}
            />
          </li>
        )}
        {hasSearch && !isSearchShow && (
          <SearchButton
            onToggleShow={handleToggleSearchShow}
            disabled={totalCount === 0}
          />
        )}
        {hasSortFilter && (
          <li className="filter">
            <SortFilterList
              sortOptionsByData={defaultSortOptionsByData}
              onChange={onSortFilterChange && onSortFilterChange}
              value={selectedSortOption}
              disabled={totalCount === undefined || totalCount === 0}
            />
          </li>
        )}
      </ul>
      {hasSearch && (
        <SearchInput
          searchPortalSelector={searchPortalSelector}
          isSearchShow={isSearchShow}
          onClose={() => setIsSearchShow(false)}
          onChange={onSearchInputChange}
          onKeyDown={onSearchInputKeyDown}
          searchValue={searchValue}
        />
      )}
    </div>
  )
}

export default MbSortFilter
