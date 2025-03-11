/**
 * @file FilterParentItem.tsx
 * @description 컴포넌트 기능 설명
 */

import { MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import moment from 'moment'

import FilterCloseIcon from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterCloseIcon'
import FilterDateRange from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterDateRange'
import FilterDropdownIcon from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterDropdownIcon'
import FilterTitle from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterTitle'
import type { MbSearchFilterItem } from '~/types/contents/Common'

interface Props {
  parentItem: MbSearchFilterItem
  onToggleDropdown: (e: MouseEvent<HTMLButtonElement>, parentItem: MbSearchFilterItem) => void
  onDateChange: (startDate: Date, endDate: Date, parentItem: MbSearchFilterItem, childItem?: MbSearchFilterItem) => void
  onRemoveAllCheckedItems: (e: MouseEvent<HTMLDivElement>, parentItem: MbSearchFilterItem) => void
  onRemoveSelectedValue: (e: MouseEvent<HTMLDivElement>, parentItem: MbSearchFilterItem) => void
  onRemoveDateValue: (e: MouseEvent<HTMLDivElement>, parentItem: MbSearchFilterItem) => void
  isUnavailableToDelete?: boolean
}

const FilterParentItem = ({
  parentItem,
  onToggleDropdown,
  onDateChange,
  onRemoveAllCheckedItems,
  onRemoveSelectedValue,
  onRemoveDateValue,
  isUnavailableToDelete = false,
}: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const handleStartDateChange = (date: Date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date: Date) => {
    setEndDate(date)
  }

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      onDateChange(startDate, endDate, parentItem)
    }
  }, [startDate, endDate])

  useEffect(() => {
    if (!parentItem.checked && parentItem.directDate) {
      setStartDate(null)
      setEndDate(null)
    }
  }, [parentItem])

  return (
    <>
      <button
        type="button"
        className={cn('lnb-filter__menu-depth1')}
        onClick={e => onToggleDropdown(e, parentItem)}
        disabled={
          parentItem.disabled ||
          (!parentItem.dateType && (parentItem.subItems === undefined || parentItem.subItems.length === 0))
        }
      >
        <FilterTitle>{parentItem.title}</FilterTitle>
        {parentItem.radioType && parentItem.selectedItem && (
          <>
            <FilterTitle countType>{parentItem.selectedItem.title}</FilterTitle>
            {!isUnavailableToDelete && <FilterCloseIcon onClick={e => onRemoveSelectedValue(e, parentItem)} />}
          </>
        )}
        {parentItem.checkedItems !== undefined && parentItem.checkedItems.length > 0 && (
          <>
            <FilterTitle countType>{parentItem.checkedItems.length}</FilterTitle>
            {!isUnavailableToDelete && <FilterCloseIcon onClick={e => onRemoveAllCheckedItems(e, parentItem)} />}
          </>
        )}
        {parentItem.dateType && (
          <>
            {parentItem.selectedDateValue && parentItem.selectedDateValue !== '' ? (
              <>
                <FilterTitle countType>{parentItem.selectedDateValue}</FilterTitle>
                {!isUnavailableToDelete && <FilterCloseIcon onClick={e => onRemoveDateValue(e, parentItem)} />}
              </>
            ) : (
              <>
                {parentItem.selectedItem && (
                  <>
                    <FilterTitle countType>{parentItem.selectedItem.title}</FilterTitle>
                    {!isUnavailableToDelete && <FilterCloseIcon onClick={e => onRemoveSelectedValue(e, parentItem)} />}
                  </>
                )}
              </>
            )}
          </>
        )}

        {((parentItem.subItems && parentItem.subItems.length > 0) ||
          (parentItem.dateType && !parentItem.disabled && !parentItem.subItems)) && (
          <FilterDropdownIcon isOpen={parentItem.checked ?? false} />
        )}
      </button>

      {parentItem.dateType && !parentItem.subItems && (
        <FilterDateRange
          isOpen={parentItem.checked ?? false}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          defaultStartDate={parentItem.dateRange?.startDate ? moment(parentItem.dateRange?.startDate).toDate() : null}
          defaultEndDate={parentItem.dateRange?.endDate ? moment(parentItem.dateRange?.endDate).toDate() : null}
        />
      )}
    </>
  )
}

export default FilterParentItem
