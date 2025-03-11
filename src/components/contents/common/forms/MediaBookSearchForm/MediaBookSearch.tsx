import { Fragment, UIEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'
import { v4 as uuid } from 'uuid'

import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import type { PageMediaListDto } from '~/types/api/service'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { apiGetAutoCompleteMediaGroup, apiGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { getNewsDateFormat } from '~/utils/common/date'
import { openToast } from '~/utils/common/toast'
import useDebounce from '~/utils/hooks/common/useDebounce'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useMediaBookSearchForm } from '~/utils/hooks/contents/common/useMediaBookSearchForm'

interface Props {
  placeholder?: string
  checkDataLimit?: number
  isSimpleData?: boolean
  mediaListValueList: MbTagSearchTagItem[]
  errMsg?: string
  isJustCount?: boolean
  isNoDetail?: boolean
  useDisabled?: boolean
  isDetail?: boolean
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
                ? Number(props.item.realLabel) > 0
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
                <p style={{ width: '50%' }}>
                  {props.item.label}{' '}
                  {props?.isMyItem && (
                    <IcoSvg
                      style={{ display: 'inline-block', top: '1px' }}
                      data={icoSvgData.personLineBroken}
                    />
                  )}
                </p>
                <span
                  className="count"
                  style={{ width: '20%' }}
                >
                  {props.item.subData}
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
                {props.isJustCount && <span className="count">{`${props.item.subData}개`}</span>}
              </Fragment>
            )}
          </label>
        </div>
      </div>
    </li>
  )
}

const MediaBookSearch = (props: Props) => {
  const { inputValue, newsTagList, setNewsTagList, handleInputSearchChange, onChangeCheckedSearchData } =
    useMediaBookSearchForm({
      isJustCount: props.isJustCount,
      isDetail: props.isDetail,
      isNoDetail: props.isNoDetail,
      useDisabled: props.useDisabled,
    })
  const { userSelectGroup, timeZone, userInfo } = useAppSelector(state => state.authSlice)
  const debouncedUpdateState = useDebounce(inputValue, 500)
  const getOpenRef = useRef<HTMLDivElement>(null)
  const optionLayer = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOptionAbove, setIsOptionAbove] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const mediaGroupListFetchData = async () => {
    let newTags: MbTagSearchResultItem[] = []
    const { status, data, message } = await apiGetAutoCompleteMediaGroup({
      page: 1,
      size: 8,
      sort: ['updateAt!desc'],
      groupId: userSelectGroup,
      title: '',
    })
    if (status === 'S') {
      const apiData = data as PageMediaListDto
      if (apiData.content && apiData.content.length > 0) {
        for await (const newTag of apiData.content) {
          const count = Number(newTag?.mediaCount) || 0
          const updateAtDate = moment(newTag?.updateAt || '').format('YYYY-MM-DD')
          const updater = newTag?.updater?.displayName || ''
          newTags = [
            //@ts-ignore
            ...newTags,
            {
              id: newTag.mediaListId?.toString() ?? uuid(),
              //@ts-ignore
              label: newTag?.title,
              subData: props.isJustCount ? count : `${count}개(이메일 ${newTag?.emailCount || 0}개)`,
              subLabel: props.isDetail
                ? `${
                    newTag?.cuType === 'UPDATE'
                      ? getNewsDateFormat(timeZone, moment(newTag.updateAt).format('YYYY-MM-DD HH:mm'), true)
                      : getNewsDateFormat(timeZone, moment(newTag.regisAt).format('YYYY-MM-DD HH:mm'), true)
                  } ${newTag?.cuType === 'UPDATE' ? newTag.updater?.displayName : newTag.register?.displayName} ${
                    newTag?.cuType === 'UPDATE' ? '최종수정' : '생성'
                  }`
                : '',
              realLabel: count.toString(),
              // @ts-ignore
              ownerId: newTag?.owner?.userId || 0,
              className: 'mediaListId',
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
      await mediaGroupListFetchData()
    }
    setIsOpen(() => i)
  }

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 100)
        initMediaGroup(false)
      }
    },
    [getOpenRef]
  )

  useEffect(() => {
    inputValue !== '' && inputValue.length > 1 && handleInputSearchChange(inputValue)
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
        className="select-form__group"
        onClick={() => initMediaGroup(true)}
      >
        <FormInputText
          placeholder={props?.placeholder || '검색'}
          onChange={e => handleInputSearchChange(e.target.value)}
          value={inputValue}
        />
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
                  {newsTagList.map(e => (
                    <ContentItem
                      key={'journalistOccupationList' + e.id + e.label}
                      item={e}
                      isDetail={props.isDetail}
                      isJustCount={props.isJustCount}
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
      </div>
      {props.errMsg !== '' && <FormMsg msg={props.errMsg} />}
    </div>
  )
}

export default MediaBookSearch
