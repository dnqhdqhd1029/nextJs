import { UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { useClipbookSearchForm } from '~/utils/hooks/contents/common/useClipbookSearchForm'

interface Props {
  placeholder?: string
  currentRef?: HTMLDivElement | null
  clipbookValueList: MbTagSearchTagItem[]
  errMsg?: string
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const ContentItem = (props: {
  item: MbTagSearchTagItem
  tagItems: MbTagSearchTagItem[]
  onChangeChecked: (e: boolean, key: MbTagSearchTagItem) => void
}) => {
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    const find = props.tagItems.find(e => e.id === props.item.id)
    setIsSelected(() => !!find)
  }, [props.tagItems.length])

  return (
    <li>
      <div className="select-form-option__item-input">
        <FormInputBtn
          type="checkbox"
          name={props.item.id + 'ClipbookSearch_checkbox_mediagroupFieldContentList'}
          id={props.item.id + 'ClipbookSearch_checkbox_mediagroupFieldContentList'}
          label={props.item.label}
          onChange={() => props.onChangeChecked(isSelected, props.item)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}

const ClipbookSearch = (props: Props) => {
  const { inputValue, clipbookList, handleInputSearchChange, onChangeCheckedSearchData } = useClipbookSearchForm()
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionSectionRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)

  const onChangeChecked = (i: boolean, key: MbTagSearchTagItem) => {
    const res = onChangeCheckedSearchData(i, key, props.clipbookValueList)
    props.onChangeTagList(res)
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
    if (optionSectionRef.current && props.currentRef) {
      const divRect = props.currentRef.getBoundingClientRect()
      const dropdownRect = optionSectionRef.current.getBoundingClientRect()
      const spaceBelow = divRect.height - dropdownRect.bottom
      setIsOptionAbove(() => dropdownRect.bottom - spaceBelow > 200)
    }
  }, [isOpen, optionSectionRef.current])

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
      onClick={() => setIsOpen(() => true)}
    >
      {/* <div
        className="select-form__group"
        onClick={() => setIsOpen(() => true)}
      > */}
      <FormInputText
        placeholder={props?.placeholder || '검색'}
        onChange={e => handleInputSearchChange(e.target.value)}
        value={inputValue}
      />
      <div
        className={cn('select-form-option__section')}
        style={{
          transition: 'all 0.3s',
          display: isOpen ? 'block' : 'none',
          top: isOpen && isOptionAbove ? 'auto' : '100%',
          bottom: isOpen && isOptionAbove ? '100%' : 'auto',
        }}
        ref={optionSectionRef}
      >
        <div className="select-form-option__area auto-complete__max-height">
          <ul className="select-form-option__group">
            {clipbookList && clipbookList.length > 0 ? (
              <>
                {clipbookList.map(e => (
                  <ContentItem
                    key={'journalistOccupationList' + e.id + e.label}
                    item={e}
                    tagItems={props.clipbookValueList}
                    onChangeChecked={(i, key) => onChangeChecked(i, key)}
                  />
                ))}
              </>
            ) : (
              <div className="tag-search-no-result">검색 결과가 없습니다.</div>
            )}
          </ul>
        </div>
      </div>
      {/* </div> */}
      {props.errMsg !== '' && <FormMsg msg={props.errMsg} />}
    </div>
  )
}

export default ClipbookSearch
