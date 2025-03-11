/**
 * @file SearchResultList.tsx
 * @description 검색 결과 목록
 */

import { ChangeEvent, RefObject, UIEvent, useContext, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import _ from 'lodash'
import { debounce } from 'throttle-debounce'

import { TagSearchContext } from './TagSearchContainer'
import SearchResultListItem from './TagSearchResultListItem'

import FormInputSearch from '~/components/common/ui/FormInputSearch'
import Loader from '~/components/common/ui/Loader'
import { DEBOUNCE_DELAY_TIME } from '~/constants/common'
import { TimeoutRef } from '~/types/common'
import type { MbTagSearchResultItem } from '~/types/contents/Common'
import { usePatterTest } from '~/utils/hooks/common/usePatternTest'

interface Props {
  hasCheckStatus?: boolean
  hasSearchInput?: boolean
  tagDeleteHook?: (item: MbTagSearchResultItem) => Promise<boolean>
  tagAddHook?: (item: MbTagSearchResultItem) => Promise<boolean>
  onListScroll?: (e: UIEvent<HTMLDivElement>) => void
  isDataLoading?: boolean
  searchPopupButtonTitle?: string
  isResultListItemReactNode?: boolean
}

const SearchResultList = ({
  hasCheckStatus,
  hasSearchInput,
  tagDeleteHook,
  tagAddHook,
  onListScroll,
  isDataLoading,
  searchPopupButtonTitle,
  isResultListItemReactNode = false,
}: Props) => {
  const {
    isInputFocused,
    highlightedString,
    isLoading,
    listItems,
    setListItems,
    nameTagItems,
    setNameTagItems,
    hasExpandedPopup,
    setIsExapandedTagListPopupOpen,
    receivedTagItems,
    combinedFunctionType,
    title,
  } = useContext(TagSearchContext)

  const optionLayer = useRef<HTMLDivElement>(null)

  const timerRef: TimeoutRef = useRef(null)
  const [isApiDataLoading, setIsApiDataLoading] = useState(false)
  const [filteredItems, setFilteredItems] = useState<MbTagSearchResultItem[]>(listItems)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [innerSearchTerm, setInnerSearchTerm] = useState('')
  const { test } = usePatterTest()

  const handleItemCheckStatusChange = (e: ChangeEvent<HTMLInputElement>, item: MbTagSearchResultItem) => {
    const checked = e.target.checked
    const id = item.id

    const newListItems = _.cloneDeep(listItems).map(prevItem => {
      if (prevItem.id === id) {
        return {
          ...prevItem,
          checked,
        }
      } else {
        return prevItem
      }
    })

    setListItems(newListItems)

    let newNameTagItems = _.cloneDeep(nameTagItems)
    if (checked) {
      const sameIdItem = newNameTagItems.find(prevItem => prevItem.id === item.id)
      if (!sameIdItem) {
        newNameTagItems = [
          ...newNameTagItems,
          { id: item.id, label: item.label, subData: item.subData, realLabel: item.realLabel },
        ]
      }
    } else {
      newNameTagItems = newNameTagItems.filter(prevItem => prevItem.id !== item.id)
    }

    setNameTagItems(newNameTagItems)
  }

  const handleSearchChange = debounce(DEBOUNCE_DELAY_TIME, (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    const checkPatternTest = test(value)

    if (!checkPatternTest) {
      return
    }

    setInnerSearchTerm(value)

    let newfilteredItems: MbTagSearchResultItem[] = _.cloneDeep(listItems)

    if (value !== '') {
      newfilteredItems = newfilteredItems.filter(item => {
        return item.label.includes(value)
      })
    }

    setFilteredItems(() => [...newfilteredItems])
  })

  const getInputRef = (ref: RefObject<HTMLInputElement>) => {
    inputRef.current = ref.current
  }

  const handleTagDeleteHook = async (item: MbTagSearchResultItem): Promise<boolean> => {
    if (tagDeleteHook) {
      return await tagDeleteHook(item)
    } else {
      return Promise.resolve(true)
    }
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    onListScroll && onListScroll(e)
  }

  useEffect(() => {
    if (listItems.length > 0) {
      if (hasSearchInput) {
        setFilteredItems(listItems)
      }
    } else {
      setFilteredItems([])
    }
  }, [listItems])

  useEffect(() => {
    if (hasSearchInput) {
      if (!isInputFocused) {
        setFilteredItems(prev => {
          return _.cloneDeep(prev).filter(item => {
            const sameIdItem = nameTagItems.find(tagItem => tagItem.id === item.id)
            if (sameIdItem) {
              return {
                ...item,
                checked: true,
              }
            }
            return item
          })
        })
      } else {
        if (combinedFunctionType !== 'inputSearch') {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }
      }
    }
  }, [isInputFocused])

  // justMounted, receivedTagItems, hasSearchInput이 true일 경우,
  // receivedTagItems와 listItems의 id가 동일한 항목을 찾아 checked 상태를 true로 변경한다.
  useEffect(() => {
    if (receivedTagItems && receivedTagItems.length > 0 && hasSearchInput) {
      const newFilteredItems = _.cloneDeep(filteredItems).map(item => {
        const sameIdItem = receivedTagItems.find(prevItem => prevItem.id === item.id)
        if (sameIdItem) {
          return {
            ...item,
            checked: true,
          }
        }
        return item
      })
      setFilteredItems(newFilteredItems)
    }
  }, [receivedTagItems])

  return (
    <div
      style={{ display: isInputFocused ? 'block' : 'none' }}
      className="select-form-option__outer-container"
    >
      <div
        className={cn('select-form-option__section')}
        style={{ display: highlightedString === '' ? 'none' : 'block', top: 0 }}
        // style={{ display: 'block', top: 0 }}
        ref={optionLayer}
      >
        {hasSearchInput && listItems.length > 10 && !isLoading && (
          <FormInputSearch
            placeholder={'검색'}
            onChange={handleSearchChange}
            getInputRef={getInputRef}
          />
        )}
        <div
          className="select-form-option__area auto-complete__max-height"
          onScroll={handleScroll}
        >
          {!isLoading && !isApiDataLoading && (
            <>
              {listItems.length > 0 ? (
                <ul className="select-form-option__group">
                  <>
                    {hasSearchInput ? (
                      <>
                        {filteredItems.length > 0 ? (
                          <>
                            {filteredItems.map(item => (
                              <SearchResultListItem
                                key={item.id}
                                item={item}
                                hasSearchInput={hasSearchInput}
                                hasCheckStatus={hasCheckStatus}
                                highlightedString={innerSearchTerm}
                                onItemCheckStatusChange={handleItemCheckStatusChange}
                                tagDeleteHook={handleTagDeleteHook}
                                tagAddHook={tagAddHook}
                                isResultListItemReactNode={isResultListItemReactNode}
                              />
                            ))}
                          </>
                        ) : (
                          <div className="tag-search-no-result">검색 결과가 없습니다.</div>
                        )}
                      </>
                    ) : (
                      <>
                        {listItems.map(item => (
                          <SearchResultListItem
                            key={item.id}
                            item={item}
                            hasSearchInput={hasSearchInput}
                            hasCheckStatus={hasCheckStatus}
                            highlightedString={highlightedString}
                            onItemCheckStatusChange={handleItemCheckStatusChange}
                            tagDeleteHook={handleTagDeleteHook}
                            tagAddHook={tagAddHook}
                            isResultListItemReactNode={isResultListItemReactNode}
                          />
                        ))}
                      </>
                    )}
                  </>
                </ul>
              ) : (
                <div className="tag-search-no-result">검색 결과가 없습니다.</div>
              )}
              {hasExpandedPopup && (
                <div className="select-form-footer__group">
                  <button
                    type="button"
                    className="select-form-footer__button"
                    onClick={() => setIsExapandedTagListPopupOpen && setIsExapandedTagListPopupOpen(true)}
                  >
                    {searchPopupButtonTitle ? searchPopupButtonTitle : `${title} 그룹별 선택하기`}
                  </button>
                </div>
              )}
            </>
          )}
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  )
}

export default SearchResultList
