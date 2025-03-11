/**
 * @file Pagination.tsx
 * @description Pagination 컴포넌트
 */

import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import cn from 'classnames'

import IcoSvg from './IcoSvg'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { SIZE_OPTIONS } from '~/constants/common'
import { useElementValues } from '~/utils/hooks/common/useElementValues'

export interface Props {
  /** 선택할 수 있는 size option array */
  option?: number[]

  /** 현재 선택된 size */
  value?: number

  /** 모양 */
  type?: 'small' | 'medium'

  /**
   * Option을 선택했을 때 실행되는 함수
   * @param {number} option 선택한 size
   * @returns
   */
  onSelectSize?: (option: number) => void
}

const Pagination = ({ option = SIZE_OPTIONS, value = 10, onSelectSize, type = 'medium' }: Props) => {
  const { getIsElementOverflowFromScreenBottom } = useElementValues()
  const optionLayer = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [currentValue, setCurrentValue] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [isCalcuratingCompleted, setIsCalcuratingCompleted] = useState(false)
  const [initialPositionTop, setInitialPositionTop] = useState(0)

  const handleSelectOption = (e: MouseEvent<HTMLButtonElement>, item: number) => {
    setCurrentValue(item)
    setIsOpen(false)
    onSelectSize && onSelectSize(item)
  }

  const handleOpenOptionList = () => {
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

  useEffect(() => {
    const isExist = option.find(item => item === value)
    if (!isExist) return
    setCurrentValue(value)
  }, [value])

  useOuterClick(containerRef, () => {
    setIsOpen(false)
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

  return (
    <div className="pagination__group cate-n4">
      <div
        className={cn('select__section', `select-type1-${type}`, 'select-line')}
        ref={containerRef}
      >
        <button
          className="select__label"
          onClick={() => handleOpenOptionList()}
          ref={triggerRef}
        >
          <span className="select__label-text">{currentValue}개</span>
          <IcoSvg data={icoSvgData.chevronDown} />
        </button>

        <div
          className={cn('select-option__section', `select-list__direction-${direction}`, {
            'display-block': isOpen,
          })}
          ref={optionLayer}
          style={{
            opacity: isCalcuratingCompleted ? 1 : 0,
          }}
        >
          <div className="select-option__area">
            <ul className="select-option__group">
              {option.map((item, index) => (
                <li key={index}>
                  <button
                    className={cn('select-option__item', { 'is-selected': currentValue === item })}
                    onClick={e => handleSelectOption(e, item)}
                  >
                    <span className="select-option__item-text">{item}개</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination
