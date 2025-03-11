/**
 * @file MediaListGroupSearchForm.tsx
 * @description 보도자료 설정 - 미디어목록
 */
import { ChangeEvent, UIEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import moment from 'moment/moment'
import { v4 as uuid } from 'uuid'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import Loader from '~/components/common/ui/Loader'
import {
  AUTO_COMPLETE_COUNT,
  DEBOUNCE_DELAY_TIME,
  ENGLISH_NUMBER_SPECIAL_CHARACTERS_PATTERN,
  USESTATE_DELAY_TIME,
} from '~/constants/common'
import type { BaseResponseCommonObject, PageMediaListDto } from '~/types/api/service'
import type { TimeoutRef } from '~/types/common'
import { MbTagSearchResultItem, MbTagSearchTagItem, TagSearchListType } from '~/types/contents/Common'
import { useGetMediaGroup } from '~/utils/api/groupList/media/useGetMediaGroup'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

interface Props {
  originId: string
  isNoDetail?: boolean
  isSimpleData?: boolean
  isJustCount?: boolean
  inputErrorMessage?: string
  tagPressList: MbTagSearchTagItem[]
  isResultListItemReactNode?: boolean
  useDisabled?: boolean
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const MediaListGroupSearchForm = (props: Props) => {
  const { userSelectGroup: storeUserSelectGroup } = useAppSelector(state => state.authSlice)
  const timerRef: TimeoutRef = useRef(null)
  const getFamilyRef = useRef<HTMLDivElement>(null)
  const getInputRef = useRef<HTMLInputElement>(null)
  const [onFocus, setOnFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [highlightedString, resolveHighlightedString] = useState<string>('')
  const [hasMoreItem, setHasMoreItem] = useState<boolean>(true)
  const [tagList, setTagList] = useState<MbTagSearchTagItem[]>([])
  const [searchResultItems, setSearchResultItems] = useState<MbTagSearchResultItem[]>([])
  const [mediaGroupListTitle, setMediaGroupListTitle] = useState<string>('')
  const [mediaGroupListCount, setMediaGroupListCount] = useState<number>(AUTO_COMPLETE_COUNT)
  const className = 'mediaListIdList'

  // 미디어 목록
  const { data: mediaGroupListFetchData, refetch: refetchMediaListGroup } = useGetMediaGroup(
    {
      page: 1,
      size: mediaGroupListCount,
      sort: ['title!asc'],
      groupId: storeUserSelectGroup ?? -1,
      title: mediaGroupListTitle,
    },
    {
      enabled: false,
    }
  )

  const onChangeCheckedSearchData = (e: string, i: ChangeEvent<HTMLInputElement>) => {
    let res: MbTagSearchTagItem[] = []
    if (!i.target.checked) {
      res = tagList.filter(item => item.id !== e)
    } else {
      const filtered = searchResultItems.find(item => item.id === e)
      if (filtered) {
        if (props.isSimpleData) {
          res = [
            ...tagList,
            {
              id: filtered.id,
              label: `${filtered.realLabel} ${filtered.subData}`,
              className: className,
            },
          ]
        } else {
          res = [
            ...tagList,
            {
              id: filtered.id,
              label: filtered.label,
              subData: filtered.subData,
              className: className,
            },
          ]
        }
      }
    }
    setTagList(() => res)
    props.onChangeTagList(res)
  }

  const handleListScroll = (e: UIEvent<HTMLDivElement>) => {
    const containerHeight = e.currentTarget.clientHeight
    const scrollHeight = e.currentTarget.scrollHeight
    const scrollTop = e.currentTarget.scrollTop
    const scrollBottom = scrollHeight - scrollTop - containerHeight
    const isBottomOfScroll = scrollBottom <= 15

    if (isBottomOfScroll && !isLoading && hasMoreItem) {
      setMediaGroupListCount(prev => prev + AUTO_COMPLETE_COUNT)
      setTimeout(() => {
        refetchMediaListGroup()
      }, USESTATE_DELAY_TIME)
    }
  }

  const handleNameSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setOnFocus(() => true)
    setInputValue(() => value)
    //resolveHighlightedString(() => value.trim())

    //@ts-ignore
    const isComposing = e.nativeEvent?.isComposing
    if (isComposing !== undefined) {
      if (!isComposing) {
        if (value !== '' && !ENGLISH_NUMBER_SPECIAL_CHARACTERS_PATTERN.test(value)) {
          setIsLoading(() => false)
          return false
        }
      }
    }

    setIsLoading(() => true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(async () => {
      setMediaGroupListTitle(value)
      setMediaGroupListCount(AUTO_COMPLETE_COUNT)
      setTimeout(() => {
        refetchMediaListGroup()
      }, USESTATE_DELAY_TIME)
    }, DEBOUNCE_DELAY_TIME)
  }

  const handleNameInputFocus = () => {
    setOnFocus(() => true)
    setIsLoading(() => false)
  }

  const setListComplete = async () => {
    const { status, data } = mediaGroupListFetchData as BaseResponseCommonObject
    const { content } = data as PageMediaListDto

    if (status === 'S') {
      if (content && content?.length > 0) {
        let newMediaGroupListData: MbTagSearchResultItem[] = []
        for await (const newMediaGroupListDatum of content) {
          const checkedData = tagList.find(
            tag => (tag.id === newMediaGroupListDatum.mediaListId?.toString() ?? uuid()) && tag.className === className
          )
          const count = newMediaGroupListDatum.mediaCount
          const updateAtDate = moment(newMediaGroupListDatum.updateAt).format('YYYY-MM-DD')
          const updater = newMediaGroupListDatum.updater?.displayName
          const newResultItem = {
            id: newMediaGroupListDatum.mediaListId?.toString() ?? uuid(),
            //@ts-ignore
            label: (
              <div className="display-flex justify-content__space-between full-width">
                <span
                  className="display-flex justify-content__space-between"
                  style={{ width: '60%' }}
                >
                  <span>{newMediaGroupListDatum.title}</span>
                  {props?.isJustCount ? (
                    <span>{`${count}개`}</span>
                  ) : (
                    <span>{`${count}개(이메일 ${newMediaGroupListDatum?.emailCount}개)`}</span>
                  )}
                </span>
                {!props.isNoDetail && <span>{`${updateAtDate} ${updater} 수정`}</span>}
              </div>
            ),
            subData: `${count}개(이메일 ${newMediaGroupListDatum?.emailCount}개)`,
            realLabel: newMediaGroupListDatum.title,
            checked: !!checkedData,
            isDisabled: !!props.useDisabled ? !count : false,
          }
          //@ts-ignore
          newMediaGroupListData = [...newMediaGroupListData, newResultItem]
        }

        setSearchResultItems(() => newMediaGroupListData)
      } else {
        setSearchResultItems(() => [])
      }
    } else {
      setSearchResultItems(() => [])
    }
    setIsLoading(() => false)
  }

  useEffect(() => {
    if (mediaGroupListFetchData === undefined) return
    setListComplete()
  }, [mediaGroupListFetchData])

  useEffect(() => {
    const handleInteraction = (e: Event) =>
      getFamilyRef?.current && !getFamilyRef.current.contains(e.target as HTMLElement) && setOnFocus(() => false)

    document.addEventListener('click', handleInteraction)
    return () => document.removeEventListener('click', handleInteraction)
  }, [getFamilyRef])

  useEffect(() => {
    inputValue === '' && setOnFocus(() => false)
  }, [inputValue])

  useEffect(() => {
    setTagList(() => props.tagPressList)
  }, [props.tagPressList.length])

  useEffect(() => {
    setSearchResultItems(prev => {
      let newItems = [...prev]

      newItems.map(item => {
        item.checked = !!tagList.find(tag => (tag.id === item.id?.toString() ?? uuid()) && tag.className === className)
      })

      return newItems
    })
  }, [tagList.length])

  return (
    <div className="select-form__section select-form-input">
      <div
        className="select-form__group"
        ref={getFamilyRef}
      >
        <div className={cn('ipt-text__group', 'container-type')}>
          <FormInputText
            value={inputValue}
            getInputRef={() => getInputRef}
            onChange={e => handleNameSearchChange(e)}
            failed={props.inputErrorMessage !== ''}
            msg={props.inputErrorMessage}
            onFocus={() => handleNameInputFocus()}
          />
        </div>

        <div
          className="select-form-option__section"
          style={{ display: onFocus ? 'block' : 'none', top: 'unset' }}
        >
          <div
            className="select-form-option__area auto-complete__max-height"
            onScroll={e => handleListScroll(e)}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <ul className="select-form-option__group">
                {searchResultItems.length > 0 ? (
                  <>
                    {searchResultItems.map((e, index) => (
                      <li key={index}>
                        <div className="select-form-option__item-input">
                          <FormInputBtn
                            type="checkbox"
                            id={`${props.originId}-${e.id}`}
                            label={e.label}
                            subLabel={e.subLabel as string}
                            highlightedString={highlightedString}
                            isLabelNode={props.isResultListItemReactNode}
                            checked={e.checked}
                            onChange={i => onChangeCheckedSearchData(e.id, i)}
                            disabled={e.isDisabled}
                          />
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  <div className="tag-search-no-result">검색 결과가 없습니다.</div>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaListGroupSearchForm
