/**
 * @file FilterChildItemOnly.tsx
 * @description 컴포넌트 기능 설명
 */

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'

import FilterCheckbox from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterCheckbox'
import FilterDateRange from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterDateRange'
import FilterSelectItem from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterSelectItem'
import type { MbSearchFilterItem } from '~/types/contents/Common'

interface Props {
  parentItem: MbSearchFilterItem
  childItem: MbSearchFilterItem
  onChildCheckboxChange: (
    e: ChangeEvent<HTMLInputElement>,
    parentItem: MbSearchFilterItem,
    childItem: MbSearchFilterItem
  ) => void
  onSelectItemChange: (
    e: MouseEvent<HTMLButtonElement>,
    parentItem: MbSearchFilterItem,
    childItem: MbSearchFilterItem
  ) => void
  onDateChange: (startDate: Date, endDate: Date, parentItem: MbSearchFilterItem, childItem?: MbSearchFilterItem) => void
}

const FilterChildItemOnly = ({
  parentItem,
  childItem,
  onChildCheckboxChange,
  onSelectItemChange,
  onDateChange,
}: Props) => {
  const [isShow, setIsShow] = useState<boolean>(true)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isDateVisible, setIsDateVisible] = useState<boolean>(true)
  const [defaultStartDate, setDefaultStartDate] = useState<Date | null>(null)
  const [defaultEndDate, setDefaultEndDate] = useState<Date | null>(null)
  const [hasSetDefaultDate, setHasSetDefaultDate] = useState<boolean>(false)

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
    if (parentItem.searchTerm && parentItem.searchTerm !== '') {
      if (childItem.title.includes(parentItem.searchTerm)) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    } else {
      setIsShow(true)
    }

    if (childItem.directDate) {
      if (childItem.checked) {
        if (parentItem.selectedDateValue !== '' && parentItem.dateRange && !hasSetDefaultDate) {
          if (parentItem.dateRange?.startDate) {
            setDefaultStartDate(new Date(parentItem.dateRange?.startDate))
          }
          if (parentItem.dateRange?.endDate) {
            setDefaultEndDate(new Date(parentItem.dateRange?.endDate))
          }

          setHasSetDefaultDate(true)
        }
      } else {
        setStartDate(null)
        setEndDate(null)
        setIsDateVisible(false)
        setTimeout(() => {
          setIsDateVisible(true)
        }, 10)
      }
    }
  }, [parentItem, childItem])

  return (
    <li className={cn('display-block')}>
      {parentItem.radioType || parentItem.dateType ? (
        <>
          <FilterSelectItem
            item={childItem}
            onChange={e => onSelectItemChange(e, parentItem, childItem)}
          />
          {parentItem.dateType && childItem.directDate && isDateVisible && (
            <FilterDateRange
              isOpen={childItem.checked ?? false}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              defaultStartDate={defaultStartDate}
              defaultEndDate={defaultEndDate}
              liClassName="pt-2 pb-2"
              portalId="datepicker-portal"
            />
          )}
        </>
      ) : (
        <FilterCheckbox
          item={childItem}
          onChange={e => onChildCheckboxChange(e, parentItem, childItem)}
        />
      )}
    </li>
  )
}

export default FilterChildItemOnly
