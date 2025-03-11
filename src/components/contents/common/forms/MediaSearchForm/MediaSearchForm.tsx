/**
 * @file MediaIndustrySearchForm.tsx
 */
import { ChangeEvent, RefObject, UIEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import FormBasicRadio from '~/components/common/ui/FormBasicRadio'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import Loader from '~/components/common/ui/Loader'
import {
  AUTO_COMPLETE_COUNT,
  DEBOUNCE_DELAY_TIME,
  EMAIL_PATTERN,
  ENGLISH_NUMBER_SPECIAL_CHARACTERS_PATTERN,
} from '~/constants/common'
import type { TimeoutRef } from '~/types/common'
import { MbTagSearchResultItem, MbTagSearchTagItem, TagSearchListType } from '~/types/contents/Common'
import { PressMediaSearchResultItem } from '~/types/contents/PressMedia'
import { useGetMediaFieldType } from '~/utils/api/media/useGetMediaFieldType'
import { openToast } from '~/utils/common/toast'
import { useSearchJournalistName } from '~/utils/hooks/contents/pressMedia/useSearchJournalistName'
import { useSearchMediaName } from '~/utils/hooks/contents/pressMedia/useSearchMediaName'

interface Props {
  originId: string
  inputErrorMessage?: string
  isAddTag?: boolean
  validateType?: string
  checkDataLimit?: number
  notArray?: boolean
  tagPressList: MbTagSearchTagItem[]
  useDisabled?: boolean
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const MediaIndustrySearchForm = (props: Props) => {
  const timerRef: TimeoutRef = useRef(null)
  const getFamilyRef = useRef<HTMLDivElement>(null)
  const getInputRef = useRef<HTMLInputElement>(null)
  const [onFocus, setOnFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [highlightedString, resolveHighlightedString] = useState<string>('')
  const [hasMoreItem, setHasMoreItem] = useState<boolean>(true)
  const [tagSearchList, setTagSearchList] = useState<TagSearchListType[]>([])
  const [tagList, setTagList] = useState<MbTagSearchTagItem[]>([])
  const [searchResultItems, setSearchResultItems] = useState<MbTagSearchResultItem[]>([])
  const [isSelected, setIsSelected] = useState<string>('')
  const className = 'mediaIdList'

  // 매체명 Hook
  const { refetch: refetchMediaFieldType } = useGetMediaFieldType(
    {
      type: 'INDUSTRY',
    },
    {
      enabled: false,
    }
  )
  const { setMediaName, setMediaNameCount, handleMediaNameAutoCompleteResult } = useSearchMediaName({
    tagSearchList,
    setTagSearchList,
    afterLoadComplete: async (data, countArrayName) => {
      const size = data.length ?? 0

      let newResultItemList: MbTagSearchResultItem[] = []
      for await (const mbTagSearchResultItem of data) {
        const checkedData = tagList.find(
          tag => (tag.id === mbTagSearchResultItem.mediaId?.toString() ?? uuid()) && tag.className === className
        )
        const newResultItem: MbTagSearchResultItem = {
          id: mbTagSearchResultItem.mediaId?.toString() ?? uuid(),
          label: `${mbTagSearchResultItem.name} - ${mbTagSearchResultItem.subcategory}` ?? '',
          checked: !!checkedData,
          isDisabled: !!props.useDisabled ? (!!mbTagSearchResultItem.flagEmail ? false : true) : false,
        }
        if (checkedData) {
          setIsSelected(() => mbTagSearchResultItem.mediaId?.toString() ?? uuid())
        }
        newResultItemList = [...newResultItemList, newResultItem]
      }

      setSearchResultItems(() => newResultItemList)

      if (size < countArrayName && size > 0) {
        setHasMoreItem(() => false)
      } else {
        setHasMoreItem(() => true)
      }

      setIsLoading(() => false)
    },
  })

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
        if (props.notArray) {
          res = [
            {
              id: filtered.id,
              label: filtered.label,
              className: className,
            },
          ]
        }
      }
    }
    console.log('')
    setTagList(() => res)
    props.onChangeTagList(res)
  }

  const onChangeSelectedSearchData = (e: string) => {
    let res: MbTagSearchTagItem[] = []
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
      if (props.notArray) {
        res = [
          {
            id: filtered.id,
            label: filtered.label,
            className: className,
          },
        ]
      }
      setIsSelected(() => filtered.id.toString())
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
      setMediaNameCount(prev => prev + AUTO_COMPLETE_COUNT)
      setTimeout(() => {
        handleMediaNameAutoCompleteResult()
      }, 100)
    }
  }

  const handleTagAdd = async (inputRef: RefObject<HTMLInputElement>) => {
    const value = inputRef.current?.value.trim()

    if (!value || value === '') {
      return
    }

    switch (props.validateType) {
      case 'email':
        if (!EMAIL_PATTERN.test(value)) {
          setTimeout(() => {
            inputRef.current?.focus()
          }, 10)
          return
        }
        break
    }
    let res: MbTagSearchTagItem[] = [
      ...tagList,
      {
        id: '',
        label: value,
        className: className,
      },
    ]
    if (props.notArray) {
      res = [
        {
          id: '',
          label: value,
          className: className,
        },
      ]
    }

    setInputValue('')
    setTagList(() => res)
    inputRef.current?.focus()
    props.onChangeTagList(res)
  }

  const plusHandleTagAdd = async () => {
    let res: MbTagSearchTagItem[] = [
      ...tagList,
      {
        id: '',
        label: inputValue,
        className: className,
      },
    ]
    if (props.notArray) {
      res = [
        {
          id: '',
          label: inputValue,
          className: className,
        },
      ]
    }

    setInputValue('')
    setTagList(() => res)
    props.onChangeTagList(res)
  }

  const handleNameSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    console.log('e.target.value', e.target.value)
    console.log('value', value)
    setOnFocus(() => true)
    setInputValue(() => value)
    resolveHighlightedString(() => value.trim())

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
      setMediaName(value)
      setMediaNameCount(AUTO_COMPLETE_COUNT)
    }, DEBOUNCE_DELAY_TIME)
  }

  const handleNameInputFocus = () => {
    setOnFocus(() => true)
    setIsLoading(() => false)
  }

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
    if (props.notArray) {
      setIsSelected(() => (props.tagPressList.length > 0 ? props.tagPressList[0].id : ''))
    }
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
            onAdd={e => handleTagAdd(e)}
            addBtn={props.isAddTag}
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
                          {props.notArray ? (
                            <FormBasicRadio
                              name={e.id}
                              id={`${props.originId}-${e.id}`}
                              label={e.label}
                              subLabel={e.subLabel as string}
                              highlightedString={highlightedString}
                              onChange={() => onChangeSelectedSearchData(e.id)}
                              checked={isSelected === e.id.toString()}
                            />
                          ) : (
                            <FormInputBtn
                              type="checkbox"
                              id={`${props.originId}-${e.id}`}
                              label={e.label}
                              subLabel={e.subLabel as string}
                              checkDataLimit={props.checkDataLimit}
                              checkDataLimitDisable={
                                props.checkDataLimit === props.tagPressList.length ? 'action' : 'non'
                              }
                              onClickEvent={() =>
                                props.checkDataLimit &&
                                props.checkDataLimit === props.tagPressList.length &&
                                openToast(
                                  `${props.checkDataLimit}개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요`,
                                  'warning'
                                )
                              }
                              checkDataLength={props.tagPressList.length}
                              highlightedString={highlightedString}
                              checked={e.checked}
                              onChange={i => onChangeCheckedSearchData(e.id, i)}
                              disabled={e.isDisabled}
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </>
                ) : (
                  <div className="tag-search-no-result">검색 결과가 없습니다.</div>
                )}
              </ul>
            )}
            {inputValue !== '' && props.isAddTag && (
              <div className="select-form-footer__group">
                <button
                  type="button"
                  className="select-form-footer__button button-tag height__auto pt-7 pb-7"
                  onClick={() => plusHandleTagAdd()}
                >
                  {`"${inputValue}" 개인 추가 미디어 만들기`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaIndustrySearchForm
