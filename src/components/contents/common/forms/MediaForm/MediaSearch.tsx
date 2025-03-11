import { Fragment, RefObject, UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { getHighlightedText, getHightlightedText } from '~/utils/common/string'
import { openToast } from '~/utils/common/toast'
import useDebounce from '~/utils/hooks/common/useDebounce'
import { useMediaSearchForm } from '~/utils/hooks/contents/common/useMediaSearchForm'

interface Props {
  placeholder?: string
  highlightedString?: boolean
  checkDataLimit?: number
  isSimpleData?: boolean
  mediaListValueList: MbTagSearchTagItem[]
  errMsg?: string
  isJustCount?: boolean
  isNoDetail?: boolean
  useDisabled?: boolean
  pageDisabled?: boolean
  isAddTag?: boolean
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const ContentItem = (props: {
  highlighted: string
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
              <Fragment>
                {props.highlighted !== '' ? (
                  <div
                    className="label"
                    dangerouslySetInnerHTML={{
                      __html: `${getHighlightedText(props.item.label, props.highlighted)}`,
                    }}
                    style={{
                      width: 'auto',
                    }}
                  />
                ) : (
                  <div
                    className={cn('label')}
                    style={{
                      width: 'auto%',
                    }}
                  >
                    {props.item.label}{' '}
                    {props.item.subLabel !== '' && <b className="label-sub">{props.item.subLabel}</b>}
                  </div>
                )}
              </Fragment>
            )}
            {props.item.subData && props.item.subData !== '' && <span className="count">{props.item.subData}</span>}
          </label>
        </div>
      </div>
    </li>
  )
}

const MediaSearch = (props: Props) => {
  const { inputValue, newsTagList, handleInputSearchChange, onChangeCheckedSearchData, handleDataInputSearchChange } =
    useMediaSearchForm({
      isJustCount: props.isJustCount,
      isNoDetail: props.isNoDetail,
      useDisabled: props.useDisabled,
    })
  const debouncedUpdateState = useDebounce(inputValue, 500)
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const onChangeChecked = (i: boolean, key: MbTagSearchTagItem) => {
    const res = onChangeCheckedSearchData(i, key, props.mediaListValueList, props.checkDataLimit)
    props.onChangeTagList(res)
    if (props.isAddTag) {
      handleInputSearchChange('')
      setIsOpen(() => false)
    }
  }

  const onChangeAdd = (inputRef: RefObject<HTMLInputElement>) => {
    const value = inputRef.current?.value.trim()
    if (value) {
      let res = [...props.mediaListValueList]
      if (props.checkDataLimit === 1) {
        res = [
          {
            id: '',
            label: value,
          },
        ]
      } else {
        res = [
          ...props.mediaListValueList,
          {
            id: '',
            label: value,
          },
        ]
      }
      props.onChangeTagList(res)
      handleInputSearchChange('')
      setIsOpen(() => false)
    }
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 100)
        setIsOpen(() => false)
      }
    },
    [getOpenRef]
  )
  useEffect(() => {
    inputValue !== '' && inputValue.length > 1 && handleDataInputSearchChange(inputValue)
  }, [debouncedUpdateState])

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
      // className={cn({
      //   'is-show': isOpen,
      //   'is-selected': isOpen,
      // })}
      ref={getOpenRef}
      onClick={() => setIsOpen(() => true)}
    >
      {/* <div
        className="select-form__group"
        onClick={() => setIsOpen(() => true)}
      > */}
      <FormInputText
        placeholder={props?.placeholder || '검색'}
        addBtn={props.isAddTag}
        onAdd={e => onChangeAdd(e)}
        onChange={e => handleInputSearchChange(e.target.value)}
        msg={props?.errMsg || ''}
        disabled={props.pageDisabled}
        value={inputValue}
      />
      {inputValue !== '' && (
        <div
          className={cn(
            'select-form-option__section',
            isOptionAbove ? 'select-list__direction-up' : 'select-list__direction-down'
          )}
          style={{ display: 'block', visibility: isOpen && !isAnimating ? 'visible' : 'hidden' }}
          ref={optionLayer}
        >
          <div className="select-form-option__area auto-complete__max-height">
            <ul className="select-form-option__group">
              {newsTagList && newsTagList.length > 0 ? (
                <>
                  {newsTagList.map((e, index) => (
                    <ContentItem
                      key={'mediaOccupationList' + e.id + e.label + index}
                      item={e}
                      highlighted={props.highlightedString ? inputValue : ''}
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
      )}
      {/* </div> */}
    </div>
  )
}

export default MediaSearch
