/**
 * @file JournalListGroupSearchForm.tsx
 * @description 보도자료 설정 - 언론인목록
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
import type { BaseResponseCommonObject, PageJrnlstListDto } from '~/types/api/service'
import type { TimeoutRef } from '~/types/common'
import { MbTagSearchResultItem, MbTagSearchTagItem, TagSearchListType } from '~/types/contents/Common'
import { useGetJournalistGroup } from '~/utils/api/groupList/journalist/useGetJournalistGroup'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

interface Props {
  originId: string
  isNoDetail?: boolean
  isSimpleData?: boolean
  inputErrorMessage?: string
  tagPressList: MbTagSearchTagItem[]
  isResultListItemReactNode?: boolean
  useDisabled?: boolean
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const JournalListGroupSearchForm = (props: Props) => {
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
  const [journalistListGroupTitle, setJournalistListTitle] = useState<string>('')
  const [journalistListGroupCount, setJournalistListCount] = useState<number>(AUTO_COMPLETE_COUNT)
  const className = 'jrnstListIdList'

  // 언론인 목록
  const { data: journalistGroupListFetchData, refetch: refetchJournalListGroup } = useGetJournalistGroup(
    {
      page: 1,
      size: journalistListGroupCount,
      sort: ['title!asc'],
      groupId: storeUserSelectGroup ?? -1,
      title: journalistListGroupTitle,
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
        res = [
          ...tagList,
          {
            id: filtered.id,
            label: filtered.label,
            className: className,
          },
        ]
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
      setJournalistListCount(prev => prev + AUTO_COMPLETE_COUNT)
      setTimeout(() => {
        refetchJournalListGroup()
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
      setJournalistListTitle(value)
      setJournalistListCount(AUTO_COMPLETE_COUNT)
      setTimeout(() => {
        refetchJournalListGroup()
      }, USESTATE_DELAY_TIME)
    }, DEBOUNCE_DELAY_TIME)
  }

  const handleNameInputFocus = () => {
    setOnFocus(() => true)
    setIsLoading(() => false)
  }

  const setListComplete = async () => {
    const { status, data } = journalistGroupListFetchData as BaseResponseCommonObject
    const { content } = data as PageJrnlstListDto

    if (status === 'S') {
      if (content && content?.length > 0) {
        let newJournalistGroupListData: MbTagSearchResultItem[] = []
        for await (const newJournalistGroupListDatum of content) {
          const checkedData = tagList.find(
            tag =>
              tag.id === (newJournalistGroupListDatum.jrnlstListId?.toString() ?? uuid()) && tag.className === className
          )
          const count = newJournalistGroupListDatum.journalistCount
          const updateAtDate = moment(newJournalistGroupListDatum.updateAt).format('YYYY-MM-DD')
          const updater = newJournalistGroupListDatum.updater?.displayName
          const newResultItem = {
            id: newJournalistGroupListDatum.jrnlstListId?.toString() ?? uuid(),
            label: (
              <div className="display-flex justify-content__space-between full-width">
                <span
                  className="display-flex justify-content__space-between"
                  style={{ width: '60%' }}
                >
                  <span>{newJournalistGroupListDatum.title}</span>&nbsp;
                  <span>{`${count}명`}</span>
                </span>
              </div>
            ),
            subData: `${count}명`,
            realLabel: newJournalistGroupListDatum.title,
            checked: !!checkedData,
            isDisabled: !!props.useDisabled ? (!!count ? false : true) : false,
          }
          //@ts-ignore
          newJournalistGroupListData = [...newJournalistGroupListData, newResultItem]
        }

        setSearchResultItems(() => newJournalistGroupListData)
      } else {
        setSearchResultItems(() => [])
      }
    } else {
      setSearchResultItems(() => [])
    }
    setIsLoading(() => false)
  }

  useEffect(() => {
    if (journalistGroupListFetchData === undefined) return
    setListComplete()
  }, [journalistGroupListFetchData])

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
        item.checked = !!tagList.find(tag => tag.id === (item.id?.toString() ?? uuid()) && tag.className === className)
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
                            checked={e.checked}
                            disabled={e.isDisabled}
                            isLabelNode={props.isResultListItemReactNode}
                            onChange={i => onChangeCheckedSearchData(e.id, i)}
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

export default JournalListGroupSearchForm
