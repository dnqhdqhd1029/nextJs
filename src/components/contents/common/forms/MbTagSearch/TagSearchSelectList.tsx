/**
 * @file TagSearchSelectList.tsx
 * @description 셀렉트 형식의 목록
 */

import { useContext, useEffect, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import cn from 'classnames'
import moment from 'moment'

import { TagSearchContext } from './TagSearchContainer'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import TagSearchDateRange from '~/components/contents/common/forms/MbTagSearch/TagSearchDateRange'
import type { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { useElementValues } from '~/utils/hooks/common/useElementValues'

interface Props {
  defaultDateItemId?: string
  hasDateRange?: boolean
}

const systemDefaultStartDate = moment().subtract(1, 'months').toDate()
const systemDefaultEndDate = moment().toDate()

const TagSearchSelectList = ({ defaultDateItemId, hasDateRange }: Props) => {
  const container = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const { getIsElementOverflowFromScreenBottom } = useElementValues()
  const { nameTagItems, listItems, setNameTagItems, setIsInputFocused, resetInputValueSymbol } =
    useContext(TagSearchContext)
  const [startDate, setStartDate] = useState<Date | null>(systemDefaultStartDate)
  const [endDate, setEndDate] = useState<Date | null>(systemDefaultEndDate)
  const [defaultStartDate, setDefaultStartDate] = useState<Date | null>(systemDefaultStartDate)
  const [defaultEndDate, setDefaultEndDate] = useState<Date | null>(systemDefaultEndDate)

  const [initialPositionTop, setInitialPositionTop] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [isCalcuratingCompleted, setIsCalcuratingCompleted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<MbTagSearchResultItem>(listItems[0])

  const handleListOpen = () => {
    setIsOpen(!isOpen)

    if (!isOpen) {
      setTimeout(() => {
        const isOverflow = getIsElementOverflowFromScreenBottom(optionLayer, initialPositionTop)

        if (isOverflow) {
          setDirection('up')
        } else {
          setDirection('down')
        }

        setTimeout(() => {
          setIsCalcuratingCompleted(true)
        }, 1)
      }, 1)
    } else {
      setIsCalcuratingCompleted(false)
    }
  }

  const handleSelectItem = (item: MbTagSearchResultItem) => {
    setCurrentItem(item)

    if (item.functionType && item.functionType === 'dateRange') {
      const label = `${moment(startDate).format('YYYY.MM.DD')} ~ ${moment(endDate).format('YYYY.MM.DD')}`

      const newItem: MbTagSearchTagItem = { id: 'DIRECT', label }
      setNameTagItems([newItem])
    } else {
      setIsOpen(false)
      const newItem: MbTagSearchTagItem = { id: item.id, label: item.label }
      setNameTagItems([newItem])
    }
  }

  const handleStartDateChange = (date: Date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date: Date) => {
    setEndDate(date)
  }

  useEffect(() => {
    if (resetInputValueSymbol) {
      setCurrentItem(listItems[0])
    }
  }, [resetInputValueSymbol])

  useEffect(() => {
    if (nameTagItems.length > 0) {
      const item = listItems.find(item => item.id === nameTagItems[0].id)
      if (item) {
        setCurrentItem(item)
      }
    } else {
      if (hasDateRange && defaultDateItemId) {
        const defaultItem = listItems.find(item => item.id === defaultDateItemId)
        setCurrentItem(defaultItem || listItems[0])
      }
    }
  }, [nameTagItems])

  useEffect(() => {
    if (!defaultDateItemId || defaultDateItemId === '') {
      return
    }

    const dDate = defaultDateItemId.split('~')

    if (dDate.length !== 2) {
      return
    }

    const sDate = moment(dDate[0]?.trim())
    const eDate = moment(dDate[1]?.trim())

    if (sDate && eDate) {
      setStartDate(moment(sDate).toDate())
      setEndDate(moment(eDate).toDate())

      setDefaultStartDate(moment(sDate).toDate())
      setDefaultEndDate(moment(eDate).toDate())
    }
  }, [defaultDateItemId])

  useOuterClick(container, () => {
    setIsOpen(false)
    setIsInputFocused(false)
  })

  useEffect(() => {
    if (optionLayer.current) {
      const element = optionLayer.current
      setIsOpen(true)
      setTimeout(() => {
        setInitialPositionTop(element.getBoundingClientRect().top)
        setIsOpen(false)
      }, 1)
    }
  }, [optionLayer])

  useEffect(() => {
    if (!hasDateRange) {
      return
    }

    const label = `${moment(startDate).format('YYYY.MM.DD')} ~ ${moment(endDate).format('YYYY.MM.DD')}`

    const newItem: MbTagSearchTagItem = { id: 'DIRECT', label }
    setNameTagItems([newItem])
  }, [startDate, endDate, hasDateRange])

  return (
    <>
      <div
        style={{ position: 'relative' }}
        ref={container}
      >
        <button
          type="button"
          className="button-select-style__button"
          onClick={handleListOpen}
        >
          <span className="button-select-style__button-txt">{currentItem ? currentItem.label : '선택'}</span>
          <span className="button-select-style__button-ico">
            <IcoSvg data={icoSvgData.chevronDown} />
          </span>
        </button>
        <div
          className={cn('select-form-option__section', `select-list__direction-${direction}`)}
          style={{ display: isOpen ? 'block' : 'none', opacity: isCalcuratingCompleted ? 1 : 0 }}
          ref={optionLayer}
        >
          <div
            className={cn('select-form-option__area', {
              'overflow-visible': hasDateRange,
              'height-auto': hasDateRange,
            })}
          >
            <ul className="select-form-option__group">
              {listItems.map(item => (
                <li key={item.id}>
                  <button
                    className={cn('select-form-option__item', {
                      'is-selected': currentItem && currentItem.id === item.id && currentItem.id !== 'value0',
                    })}
                    onClick={() => handleSelectItem(item)}
                  >
                    <span className="select-form-option__item-text">
                      {item.label} <span className="count-font__small-gray">{item.subLabel && item.subLabel}</span>
                    </span>
                  </button>

                  <TagSearchDateRange
                    isOpen={item.functionType === 'dateRange' && currentItem && currentItem.id === item.id}
                    defaultStartDate={defaultStartDate}
                    defaultEndDate={defaultEndDate}
                    onStartDateChange={handleStartDateChange}
                    onEndDateChange={handleEndDateChange}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default TagSearchSelectList
