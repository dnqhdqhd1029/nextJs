import { Fragment, UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'
import { useTagSearchForm } from '~/utils/hooks/contents/common/useTagSearchForm'

interface Props {
  isOpen: boolean
  checkDataLimit?: number
  category?: 'NEWS' | 'ACTION'
  placeholder?: string
  currentRef?: HTMLDivElement | null
  tagValueList: MbTagSearchTagItem[]
  isAdd?: boolean
  errMsg?: string
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const ContentItem = (props: {
  idKey: string
  checkDataLimit?: number
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
    <li id={props.idKey + props.item.id}>
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
            name={props.idKey + props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            id={props.idKey + props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            disabled={isSelected ? false : props.checkDataLimit === props.tagItems?.length}
            checked={isSelected}
            onChange={() => props.onChangeChecked(isSelected, props.item)}
          />
          <label
            htmlFor={props.idKey + props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            style={{ userSelect: 'none' }}
          >
            <span className="ico"></span>
            {props.item.label && (
              <div
                className={cn('label')}
                style={{
                  width: 'auto',
                }}
              >
                {props.item.label}
              </div>
            )}
            {/*{count && <span className="count">{count}</span>}*/}
          </label>
        </div>
      </div>
    </li>
  )
}

const TagSearch = (props: Props) => {
  const {
    inputValue,
    inputValueErrorMessage,
    newsTagList,
    handleTagCreate,
    handleInputSearchChange,
    onChangeCheckedSearchData,
  } = useTagSearchForm({
    isOpen: props.isOpen,
    category: props.category ? props.category : 'NEWS',
  })
  const tagSearchIdKey = `TagSearch-${uuid()}`
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionSectionRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const onChangeCheckedProps = (i: boolean, key: MbTagSearchTagItem) => {
    const res = onChangeCheckedSearchData(i, key, props.tagValueList, props.checkDataLimit)
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
      // className={cn('select-form__section select-form-input', {
      //   'is-show': isOpen,
      //   'is-selected': isOpen,
      // })}
      className={cn({
        'is-show': isOpen,
        'is-selected': isOpen,
      })}
      ref={getOpenRef}
    >
      <div
        className={`select-form__group`}
        onClick={() => setIsOpen(() => true)}
      >
        <FormInputText
          placeholder={props?.placeholder || '검색'}
          onChange={e => handleInputSearchChange(e.target.value)}
          value={inputValue}
          msg={inputValueErrorMessage}
          failed={inputValueErrorMessage !== ''}
        />
        {props.isOpen && (
          <div
            className={cn('select-form-option__section')}
            style={{
              transition: 'all 0.3s',
              display: isOpen ? 'block' : 'none',
              top: isOpen ? 'auto' : '100%',
              bottom: isOpen ? '100%' : 'auto',
              // top: isOpen && isOptionAbove ? 'auto' : '100%',
              // bottom: isOpen && isOptionAbove ? '100%' : 'auto',
            }}
            ref={optionSectionRef}
          >
            <div
              className="select-form-option__area auto-complete__max-height"
              id={`TagSearch-${uuid()}`}
            >
              {newsTagList && newsTagList.length > 0 ? (
                <ul className="select-form-option__group">
                  {newsTagList.map(e => (
                    <ContentItem
                      key={'journalistOccupationList' + e.id + e.label}
                      idKey={tagSearchIdKey}
                      item={e}
                      checkDataLimit={props.checkDataLimit}
                      tagItems={props.tagValueList}
                      onChangeChecked={(i, key) => onChangeCheckedProps(i, key)}
                    />
                  ))}
                </ul>
              ) : (
                <Fragment>
                  {inputValue !== '' && <div className="tag-search-no-result">검색 결과가 없습니다.</div>}
                </Fragment>
              )}
              {props.isAdd && inputValue !== '' && (
                <div className="select-form-footer__group">
                  {newsTagList && newsTagList.length === 1 ? (
                    <Fragment>
                      {newsTagList[0].label !== inputValue && (
                        <button
                          type="button"
                          className="select-form-footer__button button-tag height__auto pt-7 pb-7"
                          onClick={() => handleTagCreate(inputValue)}
                        >
                          {`"${inputValue}" 새 태그 만들기`}
                        </button>
                      )}
                    </Fragment>
                  ) : (
                    <button
                      type="button"
                      className="select-form-footer__button button-tag height__auto pt-7 pb-7"
                      onClick={() => handleTagCreate(inputValue)}
                    >
                      {`"${inputValue}" 새 태그 만들기`}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {props.errMsg !== '' && <FormMsg msg={props.errMsg} />}
    </div>
  )
}

export default TagSearch
