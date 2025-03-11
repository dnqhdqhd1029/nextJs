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
import { getCurrencyFormat } from '~/utils/common/number'

interface Props {
  /** 디폴트 값 */
  value?: SelectListOptionItem

  /** option 변경 이벤트 */
  onChange?: (option: SelectListOptionItem) => void

  /** option 배열 */
  options: SelectListOptionItem[]

  /** disabled */
  disabled?: boolean

  /** direction */
  listDirection?: 'up' | 'down'

  /** children */
  children?: ReactNode

  isLoadingForm?: boolean

  failed?: boolean

  listMaxHeight?: number

  msg?: string
  isCheckBox?: boolean
  onClickList?: (e: boolean) => void
}

const Select = ({
  value,
  onChange,
  options,
  children,
  disabled,
  failed = false,
  msg = '',
  isLoadingForm = false,
  isCheckBox = false,
  // listMaxHeight = 406,
  listMaxHeight = 254,
  // listMaxHeight = 318,
  listDirection,
  onClickList,
}: Props) => {
  const container = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const [listOptions, setListOptions] = useState<SelectListOptionItem[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<SelectListOptionItem>(options[0])
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleChange = (e: MouseEvent<HTMLButtonElement>, option: SelectListOptionItem) => {
    setSelectedOption(option)
    setIsOpen(false)
    onChange && onChange(option)
  }

  const handleClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 100)
    setIsOpen(!isOpen)
    onClickList && onClickList(!isOpen)
  }

  useEffect(() => {
    if (options) {
      setListOptions(options)
      if (value) {
        const findOption = options.find(option => option.id === value.id)
        if (findOption) {
          setSelectedOption(findOption)
        } else {
          setSelectedOption(options[0])
        }
      } else {
        setSelectedOption(options[0])
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
    if (container.current && optionLayer.current) {
      const selectRect = container.current.getBoundingClientRect()
      const dropdownRect = optionLayer.current.getBoundingClientRect()
      if (selectRect.bottom + dropdownRect.height >= window.innerHeight) {
        setIsOptionAbove(true)
      } else {
        setIsOptionAbove(false)
      }
    }
  }, [isOpen, container.current])

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
        <div className={'select-form__section select-form-btn'}>
          <div
            className={cn('select-form__group', {
              'is-show': isOpen,
              'is-danger': failed,
              'is-selected': !failed,
            })}
            ref={container}
          >
            {/* <div className="select-form__group"> */}
            <button
              className="select-form__label"
              onClick={handleClick}
              disabled={buttonDisabled}
            >
              <span
                className={cn('select-form__label-text', {
                  'not-selected': selectedOption.id === '',
                })}
              >
                {selectedOption.name}
              </span>
              <IcoSvg data={icoSvgData.chevronDown} />
            </button>

            <div
              className={cn(
                'select-form-option__section',
                isOptionAbove ? 'select-list__direction-up' : 'select-list__direction-down'
              )}
              style={{ display: 'block', visibility: isOpen && !isAnimating ? 'visible' : 'hidden' }}
              ref={optionLayer}
            >
              {children ? (
                <>{children}</>
              ) : (
                <>
                  {listOptions && listOptions.length > 0 && (
                    <div
                      className="select-form-option__area"
                      // className="select-form-option__area auto-complete__max-height"
                      style={{ maxHeight: listMaxHeight }}
                    >
                      <ul className="select-form-option__group">
                        {listOptions.map((option, index) => (
                          <li key={index}>
                            <button
                              className={cn('select-form-option__item', {
                                'is-selected': option.id === selectedOption.id,
                              })}
                              onClick={e => handleChange(e, option)}
                            >
                              <span className="select-form-option__item-text">
                                {option.name}
                                {option.extra && option.extra !== '' && (
                                  <span
                                    className="count-font__small-gray"
                                    style={{ paddingLeft: 5 }}
                                  >
                                    {getCurrencyFormat(option.extra)}
                                  </span>
                                )}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {/* </div> */}
          {msg !== '' && <FormMsg msg={msg} />}
        </div>
      )}
    </>
  )
}

export default Select
