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
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const SearchFilterItemDate = (props: NavigationLinkItem) => {
  const {
    filterSubParamActions,
    clipbookIdKey,
    clipbookDataCatgory,
    isOwner,
    isFilterSubParam,
    monitoringListParams,
    setOpenFilterSubParamActions,
    setAddExtraDateFilterSearch,
    setExtractExtraFilterSearch,
    setAddExtraCustomDateFilterSearch,
  } = useClipbookDetail()
  const [indexNm, setIndexNm] = useState(0)
  const [isSelected, setIsSelected] = useState<{ id: string; title: string }>({ id: '', title: '' })
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

  const changeState = () => {
    if (filterSubParamActions[indexNm]) {
      let param = [...filterSubParamActions]
      param[indexNm] = {
        ...param[indexNm],
        isOpen: !param[indexNm].isOpen,
      }
      setOpenFilterSubParamActions(param)
    }
  }

  const onStartChange = (date: Date) => {
    if (endDate) {
      if (
        !moment(moment(date).add(1, 'year')).isBefore(endDate) &&
        moment(moment(date).add(1, 'year')).isAfter(endDate) &&
        moment(date).isBefore(endDate)
      ) {
        setStartDate(() => date)
        setAddExtraCustomDateFilterSearch(
          filterSubParamActions,
          monitoringListParams,
          moment(date).format('YYYY-MM-DD'),
          moment(endDate).format('YYYY-MM-DD'),
          clipbookIdKey,
          isOwner,
          isFilterSubParam
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
          filterSubParamActions,
          monitoringListParams,
          moment(startDate).format('YYYY-MM-DD'),
          moment(date).format('YYYY-MM-DD'),
          clipbookIdKey,
          isOwner,
          isFilterSubParam
        )
      } else {
        openToast('기간은 1년 이내만 설정할 수 있습니다, 종료일을 다시 입력해 주세요.', 'warning')
      }
    } else {
      setEndDate(() => date)
    }
  }

  const selectData = (i: NavigationLinkItem) => {
    if (i.id === 'DIRECT') {
      let tempFilterSubParam = [...filterSubParamActions]
      tempFilterSubParam[indexNm] = {
        ...tempFilterSubParam[indexNm],
        values: [i.id],
      }
      setOpenFilterSubParamActions(tempFilterSubParam)
      setStartDate(() => null)
      setEndDate(() => null)
    } else {
      setAddExtraDateFilterSearch(
        i,
        filterSubParamActions,
        indexNm,
        monitoringListParams,
        clipbookIdKey,
        isOwner,
        isFilterSubParam
      )
    }
  }

  useEffect(() => {
    const find = filterSubParamActions.findIndex(e => e.id === props.id)
    setIndexNm(() => (find ? find : 0))
  }, [filterSubParamActions])

  useEffect(() => {
    const find = props?.subMenus?.find(e => e.id === filterSubParamActions[indexNm].values[0])
    const res = find ? { id: find.id, title: find.title || '' } : { id: '', title: '' }
    setIsSelected(() => res)
  }, [filterSubParamActions[indexNm].values])

  useEffect(() => {
    if (
      monitoringListParams.filterPeriodEndDay &&
      monitoringListParams.filterPeriodEndDay !== '' &&
      monitoringListParams.filterPeriodEndMonth &&
      monitoringListParams.filterPeriodEndMonth !== '' &&
      monitoringListParams.filterPeriodEndYear &&
      monitoringListParams.filterPeriodEndYear !== '' &&
      monitoringListParams.filterPeriodStartDay &&
      monitoringListParams.filterPeriodStartDay !== '' &&
      monitoringListParams.filterPeriodStartMonth &&
      monitoringListParams.filterPeriodStartMonth !== '' &&
      monitoringListParams.filterPeriodStartYear &&
      monitoringListParams.filterPeriodStartYear !== '' &&
      filterSubParamActions[indexNm].values &&
      filterSubParamActions[indexNm].values.length > 0 &&
      filterSubParamActions[indexNm].values[0] === 'DIRECT'
    ) {
      setStartDate(() =>
        moment(
          `${monitoringListParams.filterPeriodStartYear}-${monitoringListParams.filterPeriodStartMonth}-${monitoringListParams.filterPeriodStartDay}`
        ).toDate()
      )
      setEndDate(() =>
        moment(
          `${monitoringListParams.filterPeriodEndYear}-${monitoringListParams.filterPeriodEndMonth}-${monitoringListParams.filterPeriodEndDay}`
        ).toDate()
      )
    } else {
      setStartDate(() => null)
      setEndDate(() => null)
    }
  }, [monitoringListParams])

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
          {filterSubParamActions[indexNm] && filterSubParamActions[indexNm].values.length > 0 && (
            <Fragment>
              <span className="lnb-filter__menu-txt type-count">{isSelected.title}</span>
              {filterSubParamActions[indexNm] && filterSubParamActions[indexNm].isOpen && (
                <div
                  className="lnb-filter__menu-ico type-close"
                  onClick={() =>
                    clipbookDataCatgory &&
                    setExtractExtraFilterSearch(
                      filterSubParamActions,
                      indexNm,
                      monitoringListParams,
                      clipbookIdKey,
                      isOwner,
                      isFilterSubParam
                    )
                  }
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
          className={cn('lnb-filter-depth2__list type-date')}
          initial={{
            height: 0,
          }}
          animate={{
            height: filterSubParamActions[indexNm].isOpen ? 'auto' : 0,
          }}
          transition={filterTransition}
        >
          {props.subMenus &&
            props.subMenus.map(i => (
              <li key={'filterSearchData' + i.id + i.title}>
                <button
                  type="button"
                  className={cn('lnb-filter-depth2__button', {
                    'is-selected': i.id === isSelected.id,
                  })}
                  disabled={!(i.subMenus && i.subMenus.length > 0)}
                  onClick={() => i.subMenus && i.subMenus.length > 0 && selectData(i)}
                >
                  <span className="lnb-filter__menu-txt">{i.title}</span>
                </button>
                {i.id === 'DIRECT' && (
                  <motion.ul
                    className={'position-relative pl-14 pr-14 pt-4'}
                    initial={{
                      height: 0,
                    }}
                    animate={{
                      height: isSelected.id === 'DIRECT' ? 'auto' : 0,
                    }}
                    style={{
                      overflow: overflowProperty,
                    }}
                    onAnimationComplete={latest =>
                      setOverflowProperty(() => (isSelected.id === 'DIRECT' ? 'visible' : 'hidden'))
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
                        renderDayContents={(day: number, date: Date) => (
                          <span className="range-day">{getDate(date)}</span>
                        )}
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
                        renderDayContents={(day: number, date: Date) => (
                          <span className="range-day">{getDate(date)}</span>
                        )}
                        popperPlacement="bottom-end"
                      />
                    </div>
                  </motion.ul>
                )}
              </li>
            ))}
        </motion.ul>
      )}
    </li>
  )
}

export default SearchFilterItemDate
