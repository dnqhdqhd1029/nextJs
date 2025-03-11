import { Fragment, UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import type { TabItem } from '~/components/common/ui/Tabs'
import { ContentItem } from '~/components/contents/common/forms/TagTotalForm/ContentItem'
import { tagPopupNaviLinks } from '~/components/contents/common/forms/TagTotalForm/defaultData'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'
import { useTagSearchForm } from '~/utils/hooks/contents/common/useTagSearchForm'

interface Props {
  tagType: TabItem
  isOpen: boolean
  category?: 'NEWS' | 'ACTION'
  originTagList: MbTagSearchTagItem[]
  tagValueList: MbTagSearchTagItem[]
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const TagSelectedBox = (props: Props) => {
  const {
    inputValue,
    inputValueErrorMessage,
    newsTagList,
    handleTagCreate,
    handleInputSearchChange,
    onChangeCheckedSearchData,
  } = useTagSearchForm({
    isOpen: props.tagType.id === 'delete' ? false : props.isOpen,
    type: props.tagType.id,
    category: props.category ? props.category : 'NEWS',
  })
  const getOpenRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [deleteTagKeyword, setDeleteTagKeyword] = useState('')
  const [deleteTagList, setDeleteTagList] = useState<MbTagSearchTagItem[]>([])

  const onChangeSearch = async (i: string) => {
    if (props.originTagList && props.originTagList.length > 0) {
      let res: MbTagSearchTagItem[] = []
      for await (const re of props.originTagList) {
        if (re.id && re.label) {
          if (re.label.toLowerCase().search(i.toLowerCase()) !== -1) {
            res = [...res, re]
          }
        }
      }
      setDeleteTagKeyword(() => i)
      setDeleteTagList(() => (res.length > 0 ? res : props.originTagList))
    }
  }

  const onChangeChecked = (i: boolean, key: MbTagSearchTagItem) => {
    const res = onChangeCheckedSearchData(i, key, props.tagValueList)
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
    if (props.tagType.id === 'delete') {
      setDeleteTagList(() => props.originTagList)
    }
  }, [props.tagType.id])

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
      style={{ top: 'unset' }}
      ref={getOpenRef}
    >
      <div
        className="select-form__group"
        onClick={() => setIsOpen(() => true)}
      >
        <FormInputText
          placeholder={
            props.tagType.id === 'add'
              ? '추가할 태그 검색 또는 새 태그 만들기'
              : props.tagType.id === 'delete'
              ? '제외할 태그 검색'
              : '대체할 태그 검색 또는 새 태그 만들기'
          }
          onChange={e =>
            props.tagType.id === 'delete' ? onChangeSearch(e.target.value) : handleInputSearchChange(e.target.value)
          }
          value={props.tagType.id === 'delete' ? deleteTagKeyword : inputValue}
          msg={inputValueErrorMessage}
          failed={inputValueErrorMessage !== ''}
        />
        <div
          className={cn('select-form-option__section')}
          style={{
            display: isOpen
              ? props.tagType.id !== 'delete'
                ? inputValue !== ''
                  ? 'block'
                  : 'none'
                : 'block'
              : 'none',
            top: 'unset',
          }}
        >
          <div className="select-form-option__area auto-complete__max-height">
            {props.tagType.id === 'delete' ? (
              <Fragment>
                {deleteTagList && deleteTagList.length > 0 ? (
                  <ul className="select-form-option__group">
                    {deleteTagList.map(e => (
                      <ContentItem
                        key={'journalistOccupationList' + e.id + e.label}
                        item={e}
                        tagItems={props.tagValueList}
                        onChangeChecked={(i, key) => onChangeChecked(i, key)}
                      />
                    ))}
                  </ul>
                ) : (
                  <Fragment>
                    {deleteTagKeyword === '' ? (
                      <div
                        className="tag-search-no-result"
                        style={{ margin: 10 }}
                      >
                        제외 할 태그가 없습니다.
                      </div>
                    ) : (
                      <div
                        className="tag-search-no-result"
                        style={{ margin: 10 }}
                      >
                        검색 결과가 없습니다.
                      </div>
                    )}
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Fragment>
                {newsTagList && newsTagList.length > 0 ? (
                  <ul className="select-form-option__group">
                    {newsTagList.map(e => (
                      <ContentItem
                        key={'journalistOccupationList' + e.id + e.label}
                        item={e}
                        tagItems={props.tagValueList}
                        onChangeChecked={(i, key) => onChangeChecked(i, key)}
                      />
                    ))}
                  </ul>
                ) : (
                  <div
                    className="tag-search-no-result"
                    style={{ margin: 10 }}
                  >
                    검색 결과가 없습니다.
                  </div>
                )}
              </Fragment>
            )}
            {inputValue !== '' && (
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
      </div>
    </div>
  )
}

export default TagSelectedBox
