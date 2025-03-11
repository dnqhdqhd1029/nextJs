import React, { useCallback, useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import cn from 'classnames'
import { getDate, getMonth, getYear } from 'date-fns'
import ko from 'date-fns/locale/ko'
import { motion } from 'framer-motion'
import { range } from 'lodash'
import moment from 'moment/moment'

import { IRenderCustomerHeaderProps } from '~/components/common/ui/DatePicker'
import DatePickerRange from '~/components/common/ui/DatePickerRange'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { IcoChevronThickLeft, IcoChevronThickRight } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import TagSearchDateRange from '~/components/contents/common/forms/MbTagSearch/TagSearchDateRange'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'
import { useMonitoringSearchOptions } from '~/utils/hooks/contents/monitoring/useMonitoringSearchOptions'

const ContentItem = (props: {
  item: SelectListOptionItem
  tagItems: MbTagSearchTagItem[]
  onChangeChecked: (key: SelectListOptionItem) => void
}) => {
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    const find = props.tagItems.find(e => e.id === props.item.id)
    setIsSelected(() => !!find)
  }, [props.tagItems])

  return (
    <li>
      <button
        className={cn('select-form-option__item', {
          'is-selected': isSelected,
        })}
        onClick={() => props.onChangeChecked(props.item)}
      >
        <span className="select-form-option__item-text">{props.item.name}</span>
      </button>
    </li>
  )
}

const PeriodContent = () => {
  const {
    additionalParam,
    periodList,
    setAdditionalParamPeriod,
    setAdditionalParamPeriodDate,
    setAdditionalParamPeriodDateAction,
  } = useMonitoringSearchOptions()
  const getOpenRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [overflowProperty, setOverflowProperty] = useState('hidden')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectYear, setSelectYear] = useState(false)
  const [selectDate, setSelectDate] = useState(false)
  const years = range(1990, getYear(new Date()) + 1, 1)
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: IRenderCustomerHeaderProps) => (
    <div className={cn('react-datepicker__day-controller')}>
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

  const onStartChange = (date: Date) => {
    if (endDate) {
      if (moment(date).isSame(endDate)) {
        setStartDate(() => date)
        setAdditionalParamPeriodDateAction(date as Date, endDate, additionalParam)
      } else if (
        !moment(moment(date).add(1, 'year')).isBefore(endDate) &&
        moment(moment(date).add(1, 'year')).isAfter(endDate) &&
        moment(date).isBefore(endDate)
      ) {
        setStartDate(() => date)
        setAdditionalParamPeriodDateAction(date as Date, endDate, additionalParam)
      } else {
        openToast('기간은 1년 이내만 설정할 수 있습니다, 시작일을 다시 입력해 주세요.', 'warning')
      }
    } else {
      setStartDate(() => date)
    }
  }

  const onEndChange = (date: Date) => {
    if (startDate) {
      if (moment(date).isSame(startDate)) {
        setEndDate(() => date)
        setAdditionalParamPeriodDateAction(startDate as Date, date, additionalParam)
      } else if (
        !moment(date).isAfter(moment(startDate).add(1, 'year')) &&
        moment(date).isBefore(moment(startDate).add(1, 'year')) &&
        moment(date).isAfter(startDate)
      ) {
        setEndDate(() => date)
        setAdditionalParamPeriodDateAction(startDate as Date, date, additionalParam)
      } else {
        openToast('기간은 1년 이내만 설정할 수 있습니다, 종료일을 다시 입력해 주세요.', 'warning')
      }
    } else {
      setEndDate(() => date)
    }
  }

  const periodContentChange = (key: SelectListOptionItem) => {
    if (key.id !== 'DIRECT') {
      setAdditionalParamPeriod(key, additionalParam)
      setIsOpen(() => false)
    } else {
      setAdditionalParamPeriodDate(key, additionalParam)
    }
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) {
        setIsOpen(() => false)
      }
    },
    [getOpenRef]
  )

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <div
      className={cn('select-form__group', {
        'is-show': isOpen,
        'is-selected': isOpen,
      })}
      ref={getOpenRef}
    >
      {/* <div className="select-form__group"> */}
      <button
        className="select-form__label"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="select-form__label-text">{additionalParam.period.name}</span>
        <IcoSvg data={icoSvgData.chevronDown} />
      </button>
      <div
        className={cn('select-form-option__section', `select-list__direction-down`)}
        style={{ display: isOpen ? 'block' : 'none', opacity: 1 }}
      >
        <div
          className={cn('select-form-option__area', 'auto-complete__max-height', {
            'overflow-visible': additionalParam.period.id === 'DIRECT',
            'height-auto': additionalParam.period.id === 'DIRECT',
          })}
        >
          <ul className="select-option__group">
            {periodList &&
              periodList.length > 0 &&
              periodList.map(e => {
                if (e.id !== '') {
                  return (
                    <ContentItem
                      key={'periodList' + e.id + e.name}
                      item={e}
                      tagItems={additionalParam.periodTag}
                      onChangeChecked={key => periodContentChange(key)}
                    />
                  )
                }
              })}
            <motion.ul
              className={'position-relative pl-14 pr-14 pt-4'}
              initial={{
                height: 0,
              }}
              animate={{
                height: additionalParam.period.id === 'DIRECT' ? 'auto' : 0,
              }}
              style={{
                overflow: overflowProperty,
              }}
              onAnimationComplete={latest =>
                setOverflowProperty(() => (additionalParam.period.id === 'DIRECT' ? 'visible' : 'hidden'))
              }
              onAnimationStart={latest => setOverflowProperty(() => 'hidden')}
              transition={filterTransition}
            >
              <div className="datepicker__group type-range">
                <DatePicker
                  locale={ko}
                  placeholderText="시작일"
                  dateFormat="yyyy-MM-dd"
                  selectsStart
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  showYearDropdown
                  scrollableYearDropdown
                  //shouldCloseOnSelect
                  //minDate={moment(endDate).subtract(1, 'year').toDate()}
                  maxDate={new Date()}
                  onChange={(date: Date) => onStartChange(date)}
                  renderCustomHeader={renderCustomHeader}
                  renderDayContents={(day: number, date: Date) => <span className="range-day">{getDate(date)}</span>}
                  popperPlacement="bottom-start"
                />
                <DatePicker
                  locale={ko}
                  placeholderText="종료일"
                  dateFormat="yyyy-MM-dd"
                  selectsEnd
                  selected={endDate}
                  startDate={startDate}
                  endDate={endDate}
                  showYearDropdown
                  scrollableYearDropdown
                  //shouldCloseOnSelect
                  //minDate={moment(startDate).add(1, 'year').toDate()}
                  maxDate={new Date()}
                  selectRange
                  onChange={(date: Date) => onEndChange(date)}
                  renderCustomHeader={renderCustomHeader}
                  renderDayContents={(day: number, date: Date) => <span className="range-day">{getDate(date)}</span>}
                  popperPlacement="bottom-end"
                />
              </div>
            </motion.ul>
          </ul>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default PeriodContent
