/**
 * @file SelectList.tsx
 * @description 목록 체크형 셀렉트
 */
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import cn from 'classnames'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import type { SelectListOptionItem } from '~/types/common'
import { TimeoutRef } from '~/types/common'
import { useElementValues } from '~/utils/hooks/common/useElementValues'
import { useValidate } from '~/utils/hooks/common/useValidate'

interface Props {
  selectDesignClass?: string
  optionList: SelectListOptionItem[]
  defaultOption?: SelectListOptionItem
  activeOption?: SelectListOptionItem
  value?: string
  onChange?: (option: SelectListOptionItem) => void
  disabled?: boolean
  listAlignment?: 'left' | 'right'
  hasPendingToShow?: boolean
}

const SelectList = ({
  selectDesignClass,
  optionList,
  defaultOption,
  activeOption,
  listAlignment = 'left',
  onChange,
  value,
  disabled = false,
  hasPendingToShow,
}: Props) => {
  const { getInputRef } = useValidate()
  const { getIsElementOverflowFromScreenBottom } = useElementValues()
  const containerRef = useRef(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const timerRef: TimeoutRef = useRef(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [optionItems, setOptionItems] = useState<SelectListOptionItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentOption, setCurrentOption] = useState<SelectListOptionItem | undefined>(defaultOption ?? undefined)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [isCalcuratingCompleted, setIsCalcuratingCompleted] = useState(false)
  const [initialPositionTop, setInitialPositionTop] = useState(0)

  const handleOptionLayerShow = () => {
    if (!disabled) {
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
  }

  const handleSelectOptionItem = (item: SelectListOptionItem) => {
    setCurrentOption(item)
    setIsOpen(false)
    onChange && onChange(item)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (value === '') {
      setOptionItems(optionList)
      return
    }

    timerRef.current = setTimeout(() => {
      const filteredOptionItems = optionList.filter(item => item.name.includes(value))
      setOptionItems(filteredOptionItems)
    }, 200)
  }

  useOuterClick(containerRef, () => {
    setIsOpen(false)
  })

  useEffect(() => {
    if (activeOption) {
      setCurrentOption(activeOption)
    }
  }, [activeOption])

  useEffect(() => {
    if (!value) return
    const option = optionList.find(item => item.id === value)
    if (option) {
      setCurrentOption(option)
    } else {
      setCurrentOption(optionList[0])
    }
  }, [value])

  useEffect(() => {
    setOptionItems(optionList)
    if (hasPendingToShow) {
      return
    }
    if (optionList && optionList.length > 0) {
      if (!value) {
        setCurrentOption(optionList[0])
      } else {
        const option = optionList.find(item => item.id === value)
        if (option) {
          setCurrentOption(option)
        } else {
          setCurrentOption(optionList[0])
        }
      }
    }
  }, [optionList, hasPendingToShow])

  useEffect(() => {
    if (isOpen && optionItems.length > 0) {
      inputRef.current?.focus()
    }
  }, [isOpen])

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

  return (
    <div
      className={cn('select__section', {
        [selectDesignClass ?? '']: selectDesignClass,
        'select-type1-small': !selectDesignClass,
      })}
      ref={containerRef}
    >
      <button
        className="select__label box-shadow-none"
        onClick={handleOptionLayerShow}
        disabled={disabled}
      >
        {hasPendingToShow ? (
          <span
            className="select__label-text"
            style={{ opacity: activeOption === undefined ? 0 : 1 }}
          >
            {currentOption?.name}
          </span>
        ) : (
          <span className="select__label-text">{currentOption?.name}</span>
        )}

        <IcoSvg data={isOpen ? icoSvgData.chevronUp : icoSvgData.chevronDown} />
      </button>

      <div
        className={cn('select-option__section', `select-list__direction-${direction}`, {
          'display-block': isOpen,
          'min-width-200': optionList.length > 10,
        })}
        ref={optionLayer}
        style={{
          opacity: isCalcuratingCompleted ? 1 : 0,
          left: listAlignment === 'left' ? 0 : 'auto',
          right: listAlignment === 'right' ? 0 : 'auto',
        }}
      >
        <div className="select-option__area">
          {optionList.length > 10 && (
            <FormInputSearch
              placeholder={'검색'}
              onChange={handleSearchChange}
              getInputRef={ref => getInputRef(ref, inputRef)}
              className="form-input-inner-padding"
            />
          )}

          <ul className="select-option__group">
            {optionItems.map(item => (
              <li key={item.id}>
                <button
                  className={cn('select-option__item', { 'is-selected': currentOption?.id === item.id })}
                  onClick={() => handleSelectOptionItem(item)}
                >
                  <span className="select-option__item-text">{item.name}</span>
                  <span className="select-option__item-ico">
                    <IcoSvg data={icoSvgData.checkThick} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SelectList
