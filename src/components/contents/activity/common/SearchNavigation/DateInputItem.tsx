import React, { Fragment, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import cn from 'classnames'
import { getDate, getMonth, getYear } from 'date-fns'
import ko from 'date-fns/locale/ko'
import { motion } from 'framer-motion'
import { range } from 'lodash'
import moment from 'moment'

import { IRenderCustomerHeaderProps } from '~/components/common/ui/DatePicker'
import { IcoChevronThickLeft, IcoChevronThickRight } from '~/components/common/ui/IcoGroup'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import { NavigationLinkItem } from '~/types/common'
import { openToast } from '~/utils/common/toast'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const DateInputItem = (props: NavigationLinkItem) => {
  const {
    filterSubParamActions,
    apiParams,
    setOpenfilterSubParamActions,
    setAddExtraCustomDateFilterSearch,
    setExtractExtraDateFilterSearch,
  } = useActivityList()
  const [indexNm, setIndexNm] = useState(0)
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
      if (
        !moment(moment(date).add(1, 'year')).isBefore(endDate) &&
        moment(moment(date).add(1, 'year')).isAfter(endDate) &&
        moment(date).isBefore(endDate)
      ) {
        setStartDate(() => date)
        setAddExtraCustomDateFilterSearch(
          apiParams,
          filterSubParamActions,
          moment(date).format('YYYY-MM-DD'),
          moment(endDate).format('YYYY-MM-DD')
        )
      } else {
        openToast('기간은 1년 이내만 설정할 수 있습니다, 시작일을 다시 입력해 주세요.', 'warning')
      }
    } else {
      setStartDate(() => date)
    }
  }

  const onEndChange = (date: Date) => {
    if (startDate) {
      if (
        !moment(date).isAfter(moment(startDate).add(1, 'year')) &&
        moment(date).isBefore(moment(startDate).add(1, 'year')) &&
        moment(date).isAfter(startDate)
      ) {
        setEndDate(() => date)
        setAddExtraCustomDateFilterSearch(
          apiParams,
          filterSubParamActions,
          moment(startDate).format('YYYY-MM-DD'),
          moment(date).format('YYYY-MM-DD')
        )
      } else {
        openToast('기간은 1년 이내만 설정할 수 있습니다, 종료일을 다시 입력해 주세요.', 'warning')
      }
    } else {
      setEndDate(() => date)
    }
  }

  const changeState = () => {
    if (filterSubParamActions[indexNm]) {
      let param = [...filterSubParamActions]
      param[indexNm] = {
        ...param[indexNm],
        isOpen: !param[indexNm].isOpen,
      }
      setOpenfilterSubParamActions(param)
    }
  }

  useEffect(() => {
    const find = filterSubParamActions.findIndex(e => e.id === props.id)
    setIndexNm(() => (find ? find : 0))
  }, [filterSubParamActions])

  useEffect(() => {
    if (
      apiParams.periodEndDay &&
      apiParams.periodEndMonth &&
      apiParams.periodEndYear &&
      apiParams.periodStartDay &&
      apiParams.periodStartMonth &&
      apiParams.periodStartYear &&
      apiParams.periodEndDay !== '' &&
      apiParams.periodEndMonth !== '' &&
      apiParams.periodEndYear !== '' &&
      apiParams.periodStartDay !== '' &&
      apiParams.periodStartMonth !== '' &&
      apiParams.periodStartYear !== ''
    ) {
      setStartDate(() =>
        moment(`${apiParams.periodStartYear}-${apiParams.periodStartMonth}-${apiParams.periodStartDay}`).toDate()
      )
      setEndDate(() =>
        moment(`${apiParams.periodEndYear}-${apiParams.periodEndMonth}-${apiParams.periodEndDay}`).toDate()
      )
    } else {
      setStartDate(() => null)
      setEndDate(() => null)
    }
  }, [apiParams])

  return (
    <li id={props.id + 'lnb-filter__menu-list_subNewsFilterListList'}>
      {filterSubParamActions[indexNm] && (
        <button
          type="button"
          className={`lnb-filter__menu-depth1 is-opened`}
          id={'lnb-filter__menu-depth1' + props.id}
          onClick={() => changeState()}
        >
          <span className="lnb-filter__menu-txt">{props.title}</span>
          {startDate && endDate && (
            <Fragment>
              <span className="lnb-filter__menu-txt type-count">
                {moment(startDate).format('YYYY.MM.DD')} ~ {moment(endDate).format('YYYY.MM.DD')}
              </span>
              {filterSubParamActions[indexNm] && filterSubParamActions[indexNm].isOpen && (
                <div
                  className="lnb-filter__menu-ico type-close"
                  onClick={() => setExtractExtraDateFilterSearch(filterSubParamActions, apiParams)}
                >
                  <IcoSvg data={icoSvgData.iconCloseButton2} />
                </div>
              )}
            </Fragment>
          )}
          <span className="lnb-filter__menu-ico type-chevron">
            <IcoSvg data={filterSubParamActions[indexNm].isOpen ? icoSvgData.chevronDown : icoSvgData.chevronUp} />
          </span>
        </button>
      )}
      {filterSubParamActions[indexNm] && filterSubParamActions[indexNm].isOpen && (
        <motion.ul
          className={cn('lnb-filter-depth2__list')}
          initial={{
            height: 0,
          }}
          animate={{
            height: filterSubParamActions[indexNm].isOpen ? 'auto' : 0,
          }}
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
      )}
    </li>
  )
}

export default DateInputItem
