import { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'

interface Props {
  idKey: string
  additionalParam: MbTagSearchTagItem[]
  toneList: SelectListOptionItem[]
  onAction: (i: boolean, e: SelectListOptionItem) => void
}

const ContentItem = (props: {
  idKey: string
  item: SelectListOptionItem
  tagItems: MbTagSearchTagItem[]
  onChangeChecked: (e: boolean, key: SelectListOptionItem) => void
}) => {
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    const find = props.tagItems.find(e => e.id === props.item.id)
    setIsSelected(() => !!find)
  }, [props.tagItems.length])

  return (
    <li id={props.idKey + props.item.id + 'checkbox_toneList_li'}>
      <div
        className="select-form-option__item-input"
        id={props.idKey + props.item.id + 'checkbox_toneList_div'}
      >
        <FormInputBtn
          type="checkbox"
          name={props.idKey + props.item.id + 'checkbox_toneList'}
          id={props.idKey + props.item.id + 'checkbox_toneList'}
          checkDataLimit={30}
          checkDataLimitDisable={30 === props.tagItems.length ? 'action' : 'non'}
          label={props.item.name}
          onClickEvent={() =>
            30 === props.tagItems.length &&
            openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
          }
          onChange={() => props.onChangeChecked(isSelected, props.item)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}
const ToneContentForm = (props: Props) => {
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) {
        setIsOpen(() => false)
      }
    },
    [getOpenRef]
  )

  useEffect(() => {
    if (getOpenRef.current && optionLayer.current) {
      const selectRect = getOpenRef.current.getBoundingClientRect()
      const dropdownRect = optionLayer.current.getBoundingClientRect()
      if (selectRect.bottom + dropdownRect.height >= window.innerHeight) {
        setIsOptionAbove(true)
      } else {
        setIsOptionAbove(false)
      }
    }
  }, [isOpen, getOpenRef.current])

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
      <button
        className="select-form__label"
        onClick={() => {
          setIsAnimating(true)
          setTimeout(() => setIsAnimating(false), 100)
          setIsOpen(!isOpen)
        }}
      >
        <span className="select-form__label-text">선택</span>
        <IcoSvg data={icoSvgData.chevronDown} />
      </button>
      <div
        className={cn(
          'select-form-option__section',
          'select-list__direction-up'
          // isOptionAbove ? 'select-list__direction-up' : 'select-list__direction-down'
        )}
        style={{ display: 'block', visibility: isOpen && !isAnimating ? 'visible' : 'hidden' }}
        ref={optionLayer}
      >
        <div className="select-form-option__area">
          <ul className="select-form-option__group">
            {props.toneList &&
              props.toneList.length > 0 &&
              props.toneList.map(e => {
                if (e.id !== '') {
                  return (
                    <ContentItem
                      key={props.idKey + 'toneList' + e.id + e.name}
                      item={e}
                      idKey={props.idKey}
                      tagItems={props.additionalParam}
                      onChangeChecked={(i, key) => props.onAction(i, key)}
                    />
                  )
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ToneContentForm
