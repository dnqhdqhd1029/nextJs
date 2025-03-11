/**
 * @file Select.tsx
 * @description 간단한 이름을 받아 출력하는 컴포넌트
 */

import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import cn from 'classnames'

import FormMsg from '~/components/common/ui/FormMsg'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Loader from '~/components/common/ui/Loader'
import type { SelectListOptionItem } from '~/types/common'
import { useElementValues } from '~/utils/hooks/common/useElementValues'

interface PartitionOptions {
  id: string
  name: string
  subOptions: SelectListOptionItem[]
}

interface Props {
  /** 디폴트 값 */
  value?: SelectListOptionItem

  /** option 변경 이벤트 */
  onChange?: (option: SelectListOptionItem) => void

  /** option 배열 */
  options: Array<PartitionOptions>

  /** disabled */
  disabled?: boolean

  /** direction */
  listDirection?: 'up' | 'down'

  /** children */
  children?: ReactNode

  isLoadingForm?: boolean

  failed?: boolean

  msg?: string
  isCheckBox?: boolean
  onClickList?: (e: boolean) => void
}

const PartitionSelect = ({
  value,
  onChange,
  options,
  children,
  disabled,
  failed = false,
  msg = '',
  isLoadingForm = false,
  isCheckBox = false,
  listDirection,
  onClickList,
}: Props) => {
  const defaultOption: SelectListOptionItem = { id: '', name: '선택' }
  const container = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const { getIsElementOverflowFromScreenBottom } = useElementValues()
  const [listOptions, setListOptions] = useState<Array<PartitionOptions>>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<SelectListOptionItem>(defaultOption)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [isCalcuratingCompleted, setIsCalcuratingCompleted] = useState(false)
  const [initialPositionTop, setInitialPositionTop] = useState(0)

  const handleChange = (e: MouseEvent<HTMLButtonElement>, option: SelectListOptionItem) => {
    setSelectedOption(option)
    setIsOpen(false)
    onChange && onChange(option)
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
    onClickList && onClickList(!isOpen)
    if (!isOpen) {
      setTimeout(() => {
        const isOverflow = getIsElementOverflowFromScreenBottom(optionLayer, initialPositionTop)

        if (!listDirection) {
          if (isOverflow) {
            setDirection('up')
          } else {
            setDirection('down')
          }
        } else {
          setDirection(listDirection)
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
    if (options) {
      setListOptions(options)
      if (value) {
        const findOption = options
          .map(option => option.subOptions)
          .flat()
          .find(option => option.id === value.id)
        if (findOption) {
          setSelectedOption(findOption)
        } else {
          setSelectedOption(defaultOption)
        }
      } else {
        setSelectedOption(defaultOption)
      }
    }
  }, [options, value])

  useEffect(() => {
    setButtonDisabled(disabled ?? false)
  }, [disabled])

  useOuterClick(container, () => {
    setIsOpen(false)
    onClickList && onClickList(false)
  })

  useEffect(() => {
    if (optionLayer.current) {
      const element = optionLayer.current
      setIsOpen(true)
      onClickList && onClickList(true)
      setTimeout(() => {
        setInitialPositionTop(element.getBoundingClientRect().top)
        setIsOpen(false)
        onClickList && onClickList(false)
      }, 1)
    }
  }, [optionLayer])

  if (!isLoadingForm) {
    if (listOptions.length === 0 && selectedOption === undefined) {
      return null
    }
  }

  return (
    <>
      {isLoadingForm ? (
        <>
          <div
            className={'select-form__section select-form-btn'}
            ref={container}
          >
            <div className="select-form__group">
              <button
                className="select-form__label loading-form"
                onClick={handleClick}
                disabled={buttonDisabled}
              >
                <Loader size={'s18'} />
                <IcoSvg data={icoSvgData.chevronDown} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          className={cn('select-form__section select-form-btn', {
            'is-show': isOpen,
            'is-danger': failed,
            'is-selected': !failed,
          })}
          ref={container}
        >
          <div className="select-form__group">
            <button
              className="select-form__label"
              onClick={handleClick}
              disabled={buttonDisabled}
            >
              <span className="select-form__label-text">{selectedOption.name}</span>
              <IcoSvg data={icoSvgData.chevronDown} />
            </button>

            <div
              className={cn('select-form-option__section', `select-list__direction-${direction}`)}
              style={{ display: isOpen ? 'block' : 'none', opacity: isCalcuratingCompleted ? 1 : 0 }}
              ref={optionLayer}
            >
              {children ? (
                <>{children}</>
              ) : (
                <>
                  {listOptions && listOptions.length > 0 && (
                    <div className="select-form-option__area">
                      <ul className="select-form-option__group">
                        {listOptions.map((option, index) => (
                          <li key={index}>
                            <span className="select-form-option__item-text pl-12">{option.name}</span>
                            <div className="select-form-option__area overflow-hidden">
                              <ul className="select-form-option__group">
                                {option.subOptions.map((subOption, index) => (
                                  <li key={`${subOption.id}_index`}>
                                    <button
                                      className={cn('select-form-option__item', {
                                        'is-selected': subOption.id === selectedOption.id,
                                      })}
                                      onClick={e => {
                                        value?.id !== subOption.id && handleChange(e, subOption)
                                      }}
                                    >
                                      {subOption.id === selectedOption.id && <IcoSvg data={icoSvgData.chevronDown} />}
                                      <span
                                        className={cn('select-form-option__item-text', {
                                          'pl-5': subOption.id === selectedOption.id,
                                          'pl-19': subOption.id !== selectedOption.id,
                                        })}
                                      >
                                        {subOption.name}
                                      </span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {msg !== '' && <FormMsg msg={msg} />}
        </div>
      )}
    </>
  )
}

export default PartitionSelect
