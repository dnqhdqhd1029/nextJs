import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import cn from 'classnames'
import { getDate, getMonth, getYear } from 'date-fns'
import { de } from 'date-fns/locale'
import ko from 'date-fns/locale/ko'
import { range, set } from 'lodash'

import { IRenderCustomerHeaderProps } from '~/components/common/ui/DatePicker'
import { IcoChevronThickLeft, IcoChevronThickRight } from '~/components/common/ui/IcoGroup'

interface Props {
  /** 시작 날자 */
  defaultStartDate?: Date | null

  /** 종료 날짜 */
  defaultEndDate?: Date | null

  /** className */
  className?: string

  /** 최소 시작 날짜 */
  minDate?: Date | null

  /** 최대 종료 날짜 */
  maxDate?: Date | null

  /**
   * 시작 날짜 변경 이벤트
   * @param {Date} date
   * @returns
   */
  onStartDateChange?: (date: Date) => void

  /**
   * 종료 날짜 변경 이벤트
   * @param {Date} date
   * @returns
   */
  onEndDateChange?: (date: Date) => void

  /** portal id */
  portalId?: string
}

const DatePickerRange = ({
  defaultStartDate,
  defaultEndDate,
  minDate,
  maxDate,
  onStartDateChange,
  onEndDateChange,
  className,
  portalId,
}: Props) => {
  const [startDate, setStartDate] = useState<null | Date>(defaultStartDate ?? null)
  const [endDate, setEndDate] = useState<null | Date>(defaultEndDate ?? null)
  const [minDateValue, setMinDateValue] = useState<Date | null>(minDate ?? null)
  const [maxDateValue, setMaxDateValue] = useState<Date | null>(maxDate ?? null)
  const [selectYear, setSelectYear] = useState(false)
  const [selectDate, setSelectDate] = useState(false)
  const years = range(1990, getYear(new Date()) + 1, 1)
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const [pickerPortalId, setPickerPortalId] = useState<string>()

  useEffect(() => {
    console.log('DatePickerRange', defaultStartDate)
    setStartDate(defaultStartDate ?? null)
  }, [defaultStartDate])

  useEffect(() => {
    console.log('DatePickerRange', defaultEndDate)
    setEndDate(defaultEndDate ?? null)
  }, [defaultEndDate])

  const onCalendarOnOff = () => {
    setSelectYear(false)
    setSelectDate(false)
  }

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: IRenderCustomerHeaderProps) => (
    <div className={cn('react-datepicker__day-controller', className)}>
      <button
        className="react-datepicker__day-btn"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <IcoChevronThickLeft />
      </button>

      <div className={cn('react-datepicker__day-year', 'select', { 'is-opened': selectYear })}>
        <select
          value={getYear(date)}
          data-testid="year-dropdown"
          onChange={({ target: { value } }) => changeYear(Number(value))}
          onClick={() => setSelectYear(prev => !prev)}
        >
          {years.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={cn('react-datepicker__day-date', 'select', { 'is-opened': selectDate })}>
        <select
          data-testid="month-dropdown"
          value={months[getMonth(date)]}
          onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
          onClick={() => setSelectDate(prev => !prev)}
        >
          {months.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        className="react-datepicker__day-btn"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <IcoChevronThickRight />
      </button>
    </div>
  )

  const renderDayContents = (day: number, date: Date) => {
    return <span className="range-day">{getDate(date)}</span>
  }

  const handleStartDateChange = (date: Date) => {
    setStartDate(date)
    onStartDateChange && onStartDateChange(date)
  }

  const handleEndDateChange = (date: Date) => {
    setEndDate(date)
    onEndDateChange && onEndDateChange(date)
  }

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      if (startDate.valueOf() > endDate.valueOf()) setEndDate(null)
    }
  }, [startDate, endDate])

  useEffect(() => {
    setMinDateValue(minDate ?? null)
  }, [minDate])

  useEffect(() => {
    setMaxDateValue(maxDate ?? null)
  }, [maxDate])

  useEffect(() => {
    if (portalId) {
      setPickerPortalId(portalId)
    } else {
      setPickerPortalId(undefined)
    }
  }, [portalId])

  return (
    <div className="datepicker__group type-range">
      <DatePicker
        locale={ko}
        placeholderText="시작일"
        dateFormat="yyyy-MM-dd"
        selectsStart
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        minDate={minDateValue}
        onChange={handleStartDateChange}
        onCalendarClose={onCalendarOnOff}
        onCalendarOpen={onCalendarOnOff}
        renderCustomHeader={renderCustomHeader}
        renderDayContents={renderDayContents}
        popperPlacement="bottom-start"
        portalId={pickerPortalId}
      />
      <DatePicker
        locale={ko}
        placeholderText="종료일"
        dateFormat="yyyy-MM-dd"
        selectsEnd
        selected={endDate}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={maxDateValue}
        onChange={handleEndDateChange}
        onCalendarClose={onCalendarOnOff}
        onCalendarOpen={onCalendarOnOff}
        renderCustomHeader={renderCustomHeader}
        renderDayContents={renderDayContents}
        popperPlacement="bottom-end"
        portalId={pickerPortalId}
      />
    </div>
  )
}

export default DatePickerRange
