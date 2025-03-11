import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { getDate, getMonth, getYear } from 'date-fns'
import ko from 'date-fns/locale/ko'
import { range } from 'lodash'

import { IRenderCustomerHeaderProps } from './common-ui'

import { IcoChevronThickLeft, IcoChevronThickRight } from '~/publishing/components/common/ui/IcoGroup'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerRange = () => {
  const [startDate, setStartDate] = useState<null | Date>(null)
  const [endDate, setEndDate] = useState<null | Date>(null)
  const [selectYear, setSelectYear] = useState(false)
  const [selectDate, setSelectDate] = useState(false)
  const years = range(1990, getYear(new Date()) + 1, 1)
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

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

  const renderDayContents = (day: number, date: Date) => {
    return <span className="range-day">{getDate(date)}</span>
  }

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      if (startDate.valueOf() > endDate.valueOf()) setEndDate(null)
    }
  }, [startDate, endDate])

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
        onChange={(date: Date) => setStartDate(date)}
        onCalendarClose={onCalendarOnOff}
        onCalendarOpen={onCalendarOnOff}
        renderCustomHeader={renderCustomHeader}
        renderDayContents={renderDayContents}
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
        onChange={(date: Date) => setEndDate(date)}
        onCalendarClose={onCalendarOnOff}
        onCalendarOpen={onCalendarOnOff}
        renderCustomHeader={renderCustomHeader}
        renderDayContents={renderDayContents}
      />
    </div>
  )
}

export default DatePickerRange
