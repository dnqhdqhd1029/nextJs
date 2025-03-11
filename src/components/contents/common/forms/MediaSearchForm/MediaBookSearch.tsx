import { UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'
import { useMediaBookSearchForm } from '~/utils/hooks/contents/common/useMediaBookSearchForm'

interface Props {
  placeholder?: string
  checkDataLimit?: number
  isSimpleData?: boolean
  currentRef?: HTMLDivElement | null
  mediaListValueList: MbTagSearchTagItem[]
  errMsg?: string
  isJustCount?: boolean
  isNoDetail?: boolean
  useDisabled?: boolean
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const ContentItem = (props: {
  checkDataLimit?: number
  item: MbTagSearchResultItem
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
        <div
          className={cn(`ipt-${'checkbox'}__group`)}
          onClick={() =>
            !isSelected &&
            props.checkDataLimit === props.tagItems?.length &&
            openToast(
              `${props.checkDataLimit}개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요`,
              'warning'
            )
          }
        >
          <input
            type={'checkbox'}
            name={props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            id={props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            disabled={isSelected ? false : props.checkDataLimit === props.tagItems?.length}
            checked={isSelected}
            onChange={() => props.onChangeChecked(isSelected, props.item)}
          />
          <label
            htmlFor={props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            style={{ userSelect: 'none' }}
          >
            <span className="ico"></span>
            {props.item.label && (
              <div
                className={cn('label')}
                style={{
                  width: '100%',
                }}
              >
                {props.item.label} {props.item.subLabel !== '' && <b className="label-sub">{props.item.subLabel}</b>}
              </div>
            )}
            {props.item.subData && props.item.subData !== '' && <span className="count">{props.item.subData}</span>}
          </label>
        </div>
      </div>
    </li>
  )
}

const MediaBookSearch = (props: Props) => {
  const { inputValue, newsTagList, handleInputSearchChange, onChangeCheckedSearchData } = useMediaBookSearchForm({
    isJustCount: props.isJustCount,
    isNoDetail: props.isNoDetail,
    useDisabled: props.useDisabled,
  })
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionSectionRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)

  const onChangeChecked = (i: boolean, key: MbTagSearchTagItem) => {
    const res = onChangeCheckedSearchData(i, key, props.mediaListValueList, props.checkDataLimit)
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
      className={cn('select-form__section select-form-input', {
        'is-show': isOpen,
        'is-selected': isOpen,
      })}
      ref={getOpenRef}
    >
      <div
        className="select-form__group"
        onClick={() => setIsOpen(() => true)}
      >
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
              {newsTagList && newsTagList.length > 0 ? (
                <>
                  {newsTagList.map(e => (
                    <ContentItem
                      key={'journalistOccupationList' + e.id + e.label}
                      item={e}
                      checkDataLimit={props.checkDataLimit}
                      tagItems={props.mediaListValueList}
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
      </div>
      {props.errMsg !== '' && <FormMsg msg={props.errMsg} />}
    </div>
  )
}

export default MediaBookSearch
