/**
 * @file ClipbookSearchForm.tsx
 */
import { ChangeEvent, RefObject, UIEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import FormInputText from '~/components/common/ui/FormInputText'
import Loader from '~/components/common/ui/Loader'
import { BaseResponseCommonObject, type PageClipBookDto, PageTagDto } from '~/types/api/service'
import { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { useGetClipbooks } from '~/utils/api/clipbook/useGetClipbooks'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

interface Props {
  originId: string
  inputErrorMessage?: string
  validateType?: string
  isAddTag?: boolean
  tagPressList: MbTagSearchTagItem[]
  onChangeTagList: (e: MbTagSearchTagItem[]) => void
}

const ClipbookSearchForm = (props: Props) => {
  const { userSelectGroup } = useAppSelector(state => state.authSlice)

  const getFamilyRef = useRef<HTMLDivElement>(null)
  const getInputRef = useRef<HTMLInputElement>(null)
  const [onFocus, setOnFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [highlightedString, resolveHighlightedString] = useState<string>('')
  const [hasMoreItem, setHasMoreItem] = useState<boolean>(true)
  const [tagList, setTagList] = useState<MbTagSearchTagItem[]>([])
  const [searchResultItems, setSearchResultItems] = useState<MbTagSearchResultItem[]>([])
  const className = 'clipbookIdList'

  const { data: getClipbookListData, refetch: refetchGetClipbookList } = useGetClipbooks(
    {
      page: 1,
      size: 9999999,
      sort: 'updateAt!desc',
      title: inputValue,
      groupId: userSelectGroup,
    },
    {
      enabled: true,
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
      setTimeout(() => {
        refetchGetClipbookList()
      }, 100)
    }
  }

  const handleTagAdd = async (inputRef: RefObject<HTMLInputElement>) => {
    const value = inputRef.current?.value.trim()

    if (!value || value === '') {
      return
    }
    let res: MbTagSearchTagItem[] = [
      ...tagList,
      {
        id: value,
        label: value,
        className: className,
      },
    ]
    setInputValue('')
    setTagList(() => res)
    inputRef.current?.focus()
    props.onChangeTagList(res)
  }

  const handleNameSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setOnFocus(() => true)
    setInputValue(() => value)
    resolveHighlightedString(() => value.trim())
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

  useEffect(() => {
    if (!getClipbookListData) return
    const { status, data: apiData, message } = getClipbookListData as BaseResponseCommonObject
    if (status === 'S') {
      const res = apiData as PageClipBookDto
      if (res.content && res.content.length > 0) {
        const newTags = res.content?.map(item => {
          const checkedData = tagList.find(
            tag => (tag.id === item.clipBookId?.toString() ?? uuid()) && tag.className === className
          )
          return {
            id: item.clipBookId?.toString() ?? uuid(),
            label: `${item.title}` ?? '',
            checked: !!checkedData,
          }
        })
        setSearchResultItems(() => newTags ?? [])
      }
    } else {
      openToast(message?.message, 'error')
    }
  }, [getClipbookListData])

  return (
    <div className="select-form__section select-form-input">
      <div
        className="select-form__group"
        ref={getFamilyRef}
      >
        <div className={cn('ipt-text__group', 'container-type')}>
          <FormInputText
            value={inputValue}
            getInputRef={() => getInputRef.current}
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
                          <FormInputBtn
                            type="checkbox"
                            id={`${props.originId}-${e.id}`}
                            label={e.label}
                            subLabel={e.subLabel as string}
                            highlightedString={highlightedString}
                            checked={e.checked}
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

export default ClipbookSearchForm
