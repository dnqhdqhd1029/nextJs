import { Fragment, UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'
import { v4 as uuid } from 'uuid'

import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import type { PageJrnlstListDto } from '~/types/api/service'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { apiGetAutoCompleteJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { getNewsDateFormat } from '~/utils/common/date'
import { openToast } from '~/utils/common/toast'
import useDebounce from '~/utils/hooks/common/useDebounce'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { usePressBookSearchForm } from '~/utils/hooks/contents/common/usePressBookSearchForm'

interface Props {
  placeholder?: string
  checkDataLimit?: number
  isSimpleData?: boolean
  currentRef?: HTMLDivElement | null
  mediaListValueList: MbTagSearchTagItem[]
  errMsg?: string
  isJustCount?: boolean
  isDetail?: boolean
  isNoDetail?: boolean
  useDisabled?: boolean
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const ContentItem = (props: {
  isDetail?: boolean
  isJustCount?: boolean
  checkDataLimit?: number
  item: MbTagSearchResultItem
  tagItems: MbTagSearchTagItem[]
  onChangeChecked: (e: boolean, key: MbTagSearchTagItem) => void
  isMyItem: boolean
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
            disabled={
              props.isDetail
                ? Number(props.item.subData) > 0
                  ? isSelected
                    ? false
                    : props.checkDataLimit === props.tagItems?.length
                  : true
                : isSelected
                ? false
                : props.checkDataLimit === props.tagItems?.length
            }
            checked={isSelected}
            onChange={() => props.onChangeChecked(isSelected, props.item)}
          />
          <label
            htmlFor={props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            style={{ userSelect: 'none' }}
          >
            <span className="ico"></span>
            {props.isDetail ? (
              <div
                className={cn('label')}
                style={{
                  width: '100%',
                  display: 'flex',
                }}
              >
                <span style={{ width: '60%' }}>
                  {props.item.label}{' '}
                  {props?.isMyItem && (
                    <IcoSvg
                      style={{ display: 'inline-block', top: '1px' }}
                      data={icoSvgData.personLineBroken}
                    />
                  )}
                </span>
                <span
                  className="count"
                  style={{ width: '10%' }}
                >
                  {`${props.item.subData}명`}
                </span>
                <b
                  className="label-sub"
                  style={{ width: '30%' }}
                >
                  {props.item.subLabel}
                </b>
              </div>
            ) : (
              <Fragment>
                {props.item.label && (
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
                {props?.isMyItem && (
                  <span className="owner-icon">
                    <IcoSvg data={icoSvgData.personLineBroken} />
                  </span>
                )}
                {props.item.subData && props.item.subData !== '' && (
                  <span className="count">{`${props.item.subData}명`}</span>
                )}
              </Fragment>
            )}
          </label>
        </div>
      </div>
    </li>
  )
}

const PressBookSearch = (props: Props) => {
  const { inputValue, newsTagList, setNewsTagList, handleInputSearchChange, onChangeCheckedSearchData } =
    usePressBookSearchForm({
      isJustCount: props.isJustCount,
      isDetail: props.isDetail,
      isNoDetail: props.isNoDetail,
      useDisabled: props.useDisabled,
    })
  const { timeZone, userSelectGroup, userInfo } = useAppSelector(state => state.authSlice)
  const debouncedUpdateState = useDebounce(inputValue, 500)
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionSectionRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)

  const journalistGroupListFetchData = async () => {
    let newTags: MbTagSearchResultItem[] = []
    const { status, data, message } = await apiGetAutoCompleteJournalistGroup({
      page: 1,
      size: 8,
      sort: ['updateAt!desc'],
      groupId: userSelectGroup,
      title: '',
    })
    if (status === 'S') {
      const apiData = data as PageJrnlstListDto
      if (apiData.content && apiData.content.length > 0) {
        for await (const newTag of apiData.content) {
          const count = Number(newTag?.journalistCount) || 0
          const updateAtDate = moment(newTag?.updateAt || '').format('YYYY-MM-DD')
          const updater = newTag?.updater?.displayName || ''
          newTags = [
            //@ts-ignore
            ...newTags,
            {
              id: newTag.jrnlstListId?.toString() ?? uuid(),
              //@ts-ignore
              label: newTag?.title,
              subData: props.isJustCount ? count : '',
              subLabel: props.isDetail
                ? `${
                    newTag?.cuType === 'UPDATE'
                      ? getNewsDateFormat(timeZone, moment(newTag.updateAt).format('YYYY-MM-DD HH:mm'), true)
                      : getNewsDateFormat(timeZone, moment(newTag.regisAt).format('YYYY-MM-DD HH:mm'), true)
                  } ${newTag?.cuType === 'UPDATE' ? newTag.updater?.displayName : newTag.register?.displayName} ${
                    newTag?.cuType === 'UPDATE' ? '최종수정' : '생성'
                  }`
                : '',
              realLabel: newTag?.title || '',
              // @ts-ignore
              ownerId: newTag?.owner?.userId || 0,
              className: 'jrnlstListId',
            },
          ]
        }
      }
      setNewsTagList(() => newTags)
    } else {
      openToast(message?.message, 'error')
    }
  }

  const onChangeChecked = (i: boolean, key: MbTagSearchTagItem) => {
    const res = onChangeCheckedSearchData(i, key, props.mediaListValueList, props.checkDataLimit)
    props.onChangeTagList(res)
  }

  const initMediaGroup = async (i: boolean) => {
    if (i) {
      await journalistGroupListFetchData()
    }
    setIsOpen(() => i)
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
    inputValue !== '' && inputValue.length > 1 && handleInputSearchChange(inputValue)
  }, [debouncedUpdateState])

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
      onClick={() => initMediaGroup(true)}
    >
      {/* <div
        className="select-form__group"
        onClick={() => initMediaGroup(true)}
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
            {newsTagList && newsTagList.length > 0 ? (
              <>
                {newsTagList.map(e => (
                  <ContentItem
                    key={'journalistOccupationList' + e.id + e.label}
                    item={e}
                    isDetail={props.isDetail}
                    checkDataLimit={props.checkDataLimit}
                    tagItems={props.mediaListValueList}
                    onChangeChecked={(i, key) => onChangeChecked(i, key)}
                    // @ts-ignore
                    isMyItem={userInfo.userId === e.ownerId}
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

export default PressBookSearch
