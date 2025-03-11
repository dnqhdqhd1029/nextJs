/**
 * @file DatePicker.tsx
 * @description 캘린더 날짜 선택
 */

import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import cn from 'classnames'
import { getMonth, getYear } from 'date-fns'
import ko from 'date-fns/locale/ko'
import { range } from 'lodash'
import moment from 'moment/moment'

import FormMsg from '~/components/common/ui/FormMsg'
import { IcoChevronThickLeft, IcoChevronThickRight } from '~/components/common/ui/IcoGroup'
import { openToast } from '~/utils/common/toast'

interface Props {
  /** 초기 세팅 날짜 */
  defaultValue?: Date

  /** selectedDate */
  selectedDate?: Date

  errorMsg?: string
  forbiddenBefore?: boolean

  /**
   * 달력에서 날짜를 선택했을 때
   * @param {Date} date
   * @returns
   */
  onCalendarChange?: (date: Date) => void
}

export interface IRenderCustomerHeaderProps {
  date: Date
  changeYear: (year: number) => void
  changeMonth: (month: number) => void
  decreaseMonth: () => void
  increaseMonth: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
}

const DatePickerContainer = ({ defaultValue, selectedDate, errorMsg, onCalendarChange, forbiddenBefore }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(defaultValue ?? null)
  const [selectYear, setSelectYear] = useState(false)
  const [selectDate, setSelectDate] = useState(false)
  const years = range(1990, getYear(new Date()) + 1, 1)
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

  const handleOnChange = (date: Date) => {
    if (forbiddenBefore) {
      const current = moment().isBefore(moment(date))
      if (!current) {
        openToast('현재보다 이전날짜는 선택이 불가능합니다', 'warning')
      } else {
        setStartDate(date)
        onCalendarChange && onCalendarChange(date)
      }
    } else {
      setStartDate(date)
      onCalendarChange && onCalendarChange(date)
    }
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

  const onCalendarOnOff = () => {
    setSelectYear(false)
    setSelectDate(false)
  }

  useEffect(() => {
    if (selectedDate === undefined) {
      return
    }

    setStartDate(selectedDate)
  }, [selectedDate])

  return (
    <div
      className={cn('datepicker__group type-only', {
        'is-error': errorMsg !== '',
      })}
      style={{ height: 'auto' }}
    >
      <div style={{ height: '35px' }}>
        <DatePicker
          locale={ko}
          placeholderText="날짜 선택"
          dateFormat="yyyy-MM-dd"
          todayButton="오늘"
          selected={startDate}
          onChange={handleOnChange}
          onCalendarClose={onCalendarOnOff}
          onCalendarOpen={onCalendarOnOff}
          renderCustomHeader={renderCustomHeader}
        />
      </div>
      {errorMsg !== '' && (
        <FormMsg
          msg={errorMsg}
          type="error"
        />
      )}
    </div>
  )
}

export default DatePickerContainer
