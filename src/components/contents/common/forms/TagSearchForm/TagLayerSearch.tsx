import { Fragment, UIEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
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
  errMsg?: string
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const ContentItem = (props: {
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

const TagLayerSearch = (props: Props) => {
  const {
    inputValue,
    inputValueErrorMessage,
    newsTagList,
    handleInputSearchChange,
    onChangeCheckedSearchData,
    handleTagCreate,
  } = useTagSearchForm({
    isOpen: props.isOpen,
    category: props.category ? props.category : 'NEWS',
  })
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

  const filteredContentList = useMemo(() => {
    return newsTagList.filter(e => e.label === inputValue)
  }, [newsTagList, inputValue])

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
      className={cn('select-form__section select-form-editor', {
        'is-show': isOpen,
        'is-selected': isOpen,
      })}
      ref={getOpenRef}
    >
      <div className={`select-form__group`}>
        <button
          className="select__label"
          onClick={() => setIsOpen(prevState => !prevState)}
        >
          <span className="hidden">편집</span>
          <b className="ico">
            <IcoSvg data={icoSvgData.pencilFill2} />
          </b>
          <b className="arrow">
            <IcoSvg data={icoSvgData.chevronDown} />
          </b>
        </button>
        {props.isOpen && (
          <div
            className={cn('select-form-option__section')}
            style={{
              transition: 'all 0.3s',
              width: '230px',
              display: isOpen ? 'block' : 'none',
              top: isOpen && isOptionAbove ? 'auto' : '100%',
              bottom: isOpen && isOptionAbove ? '100%' : 'auto',
            }}
            ref={optionSectionRef}
          >
            <FormInputSearch
              placeholder={props?.placeholder || '검색'}
              value={inputValue}
              onChange={e => handleInputSearchChange(e.target.value)}
              msg={inputValueErrorMessage}
              failed={inputValueErrorMessage !== ''}
            />
            <div className="select-form-option__area auto-complete__max-height">
              {newsTagList && newsTagList.length > 0 ? (
                <ul className="select-form-option__group">
                  {newsTagList.map(e => (
                    <ContentItem
                      key={'journalistOccupationList' + e.id + e.label}
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
              {inputValue !== '' && (
                <div className="select-form-footer__group">
                  {filteredContentList.length === 1 ? (
                    <Fragment>
                      {filteredContentList[0].label !== inputValue && (
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
                    <Fragment>
                      {filteredContentList.length === 0 && (
                        <button
                          type="button"
                          className="select-form-footer__button button-tag height__auto pt-7 pb-7"
                          onClick={() => handleTagCreate(inputValue)}
                        >
                          {`"${inputValue}" 새 태그 만들기`}
                        </button>
                      )}
                    </Fragment>
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

export default TagLayerSearch
