/**
 * @file DatePicker.tsx
 * @description DatePicker
 */

import { FocusEvent, forwardRef, useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import cn from 'classnames'
import { getMonth, getYear } from 'date-fns'
import ko from 'date-fns/locale/ko'
import { range } from 'lodash'

import { IRenderCustomerHeaderProps } from './common-ui'

import { IcoChevronThickLeft, IcoChevronThickRight } from '~/publishing/components/common/ui/IcoGroup'
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface Props {
  onDateChange?: (date: Date) => void
  isFailed?: boolean
  value?: Date
}

const DatePickerContainer = ({ onDateChange, isFailed = false, value }: Props) => {
  const datePickerRef = useRef<HTMLInputElement>(null)
  const [startDate, setStartDate] = useState<null | Date>(null)
  const [selectYear, setSelectYear] = useState(false)
  const [selectDate, setSelectDate] = useState(false)
  const years = range(1990, getYear(new Date()) + 1, 1)
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

  const handleDateChange = (date: Date) => {
    setStartDate(date)
    onDateChange && onDateChange(date)
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
    <div className="react-datepicker__day-controller">
      <button
        className="react-datepicker__day-btn"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <IcoChevronThickLeft />
      </button>

      <div className={`react-datepicker__day-year select ${selectYear && 'is-opened'}`}>
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

      <div className={`react-datepicker__day-date select ${selectDate && 'is-opened'}`}>
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

  const onCalendarOnOff = () => {
    setSelectYear(false)
    setSelectDate(false)
  }

  //@ts-ignore
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="react-datepicker__input-container">
      <button
        type="button"
        className="input"
        onClick={onClick}
      >
        <span>{value ? value : <span className="color-secondary">날짜 선택</span>}</span>
        <span className="trigger" />
      </button>
    </div>
  ))

  useEffect(() => {
    if (value) {
      setStartDate(value)
    }
  }, [value])

  return (
    <div
      className={cn('datepicker__group type-only', {
        'is-failed': isFailed,
      })}
    >
      <DatePicker
        locale={ko}
        placeholderText="날짜 선택"
        dateFormat="yyyy-MM-dd"
        todayButton="오늘"
        selected={startDate}
        onChange={handleDateChange}
        onCalendarClose={onCalendarOnOff}
        onCalendarOpen={onCalendarOnOff}
        renderCustomHeader={renderCustomHeader}
        onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.blur()}
        value={startDate}
        ref={datePickerRef}
        customInput={<CustomInput />}
      />
    </div>
  )
}

export default DatePickerContainer
