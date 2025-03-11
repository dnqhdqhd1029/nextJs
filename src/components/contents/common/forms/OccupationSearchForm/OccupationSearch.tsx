import { UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { ContentItem } from '~/components/contents/common/forms/OccupationSearchForm/ContentItem'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'

interface Props {
  originList: SelectListOptionItem[]
  keywordParam: MbTagSearchTagItem[]
  setKeywordOccupation: (e: MbTagSearchTagItem[]) => void
}

const OccupationSearch = (props: Props) => {
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const onChngeKeywordOccupation = async (i: boolean, e: SelectListOptionItem) => {
    let dataList = [...props.keywordParam]
    if (!i) {
      dataList = [
        ...dataList,
        {
          id: e.id?.toString() ?? '',
          label: e.name ?? '',
        },
      ]
    } else {
      dataList = dataList.filter(k => k.id !== e.id)
    }
    props.setKeywordOccupation(dataList)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) setIsOpen(prevState => false)
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
      // className={cn('select-form__section select-form-input', {
      //   'is-show': isOpen,
      //   'is-selected': isOpen,
      // })}
      className={cn('select-form__group', {
        'is-show': isOpen,
        'is-selected': isOpen,
      })}
      ref={getOpenRef}
    >
      {/* <div className="select-form__group"> */}
      <button
        className="select-form__label"
        onClick={() => {
          setIsAnimating(true)
          setTimeout(() => setIsAnimating(false), 100)
          setIsOpen(() => !isOpen)
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
        // style={{ display: 'block', visibility: isOpen && !isAnimating ? 'visible' : 'hidden' }}
        style={{ display: isOpen && !isAnimating ? 'block' : 'none' }}
        ref={optionLayer}
      >
        <div className="select-form-option__area auto-complete__max-height">
          <ul className="select-form-option__group">
            <>
              {props.originList &&
                props.originList.length > 0 &&
                props.originList.map(e => (
                  <ContentItem
                    key={'journalistOccupationList' + e.id + e.name}
                    item={e}
                    tagItems={props.keywordParam}
                    onChangeChecked={(i, key) => onChngeKeywordOccupation(i, key)}
                  />
                ))}
            </>
          </ul>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default OccupationSearch
