/**
 * @file TagSearchContainer.tsx
 * @description 검색어 입력, 셀렉트를 선택 등을 하여 태그 추가하는 모듈
 */

import { createContext, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { useOuterClick } from 'react-outer-click'
import { v4 as uuid } from 'uuid'

import TagAddInput from '~/components/contents/common/forms/MbTagSearch/TagAddInput'
import TagInputOnly from '~/components/contents/common/forms/MbTagSearch/TagInputOnly'
import TagSearchButton from '~/components/contents/common/forms/MbTagSearch/TagSearchButton'
import TagSearchExpandedTagListPopup from '~/components/contents/common/forms/MbTagSearch/TagSearchExpandedTagListPopup'
import TagSearchInput from '~/components/contents/common/forms/MbTagSearch/TagSearchInput'
import TagSearchResultList from '~/components/contents/common/forms/MbTagSearch/TagSearchResultList'
import TagSearchSelectList from '~/components/contents/common/forms/MbTagSearch/TagSearchSelectList'
import TagSearchTagList from '~/components/contents/common/forms/MbTagSearch/TagSearchTagList'
import TagSearchTitle from '~/components/contents/common/forms/MbTagSearch/TagSearchTitle'
import { setTagSearchFocusId } from '~/stores/modules/common/commonVariables'
import type { TimeoutRef } from '~/types/common'
import type { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'
import { getComponent } from '~/utils/common/component'
import { useAppDispatch, useAppSelector } from '~/utils/hooks/common/useRedux'

interface TagSearchContextProps {
  originId?: string
  setOriginId?: (value: string) => void

  title: string | undefined

  timerRef: TimeoutRef

  searchInputContainerRef?: RefObject<HTMLDivElement>
  setSearchInputContainerRef?: (ref: RefObject<HTMLDivElement>) => void

  resetInputValueSymbol: string
  setResetInputValueSymbol: (value: string) => void

  nameTagItems: MbTagSearchTagItem[]
  setNameTagItems: (newItems: MbTagSearchTagItem[]) => void

  listItems: MbTagSearchResultItem[]
  setListItems: (newItems: MbTagSearchResultItem[]) => void

  isInputFocused: boolean
  setIsInputFocused: (value: boolean) => void

  highlightedString: string
  setHighlightedString: (value: string) => void

  isLoading: boolean
  setIsLoading: (value: boolean) => void

  onInputSearchChange?: (value: string) => void

  hasExpandedPopup?: boolean
  isExapandedTagListPopupOpen?: boolean
  setIsExapandedTagListPopupOpen?: (value: boolean) => void

  outerClickEvent?: string
  setOuterClickEvent?: (value: string) => void

  hasTooltip?: boolean
  tooltipNode?: ReactNode

  receivedTagItems?: MbTagSearchTagItem[]

  inputErrorMessage?: string
  setInputErrorMessage?: (value: string) => void

  isReceivedTagItemsLoaded?: boolean
  setIsReceivedTagItemsLoaded?: (value: boolean) => void

  combinedFunctionType?: string
  setCombinedFunctionType?: (value: string) => void

  isTagFocused: boolean
  setIsTagFocused: (value: boolean) => void
}

const TagSearchInputType = (<TagSearchInput />).type
const TagAddInputType = (<TagAddInput />).type
const TagInputOnlyType = (<TagInputOnly />).type
const TagSearchSelectListType = (<TagSearchSelectList />).type
const TagSearchButtonType = (<TagSearchButton />).type
const FormTitleType = (<TagSearchTitle />).type
const TagSearchResultListType = (<TagSearchResultList />).type
const TagSearchTagListType = (<TagSearchTagList />).type
const TagSearchExpandedTagListPopupType = (<TagSearchExpandedTagListPopup />).type

export const TagSearchContext = createContext<TagSearchContextProps>({
  originId: '',
  setOriginId: () => {},
  title: '',
  resetInputValueSymbol: '',
  setResetInputValueSymbol: () => {},
  timerRef: { current: null },
  nameTagItems: [],
  setNameTagItems: () => {},
  listItems: [],
  setListItems: () => {},
  isInputFocused: true,
  setIsInputFocused: () => {},
  highlightedString: '',
  setHighlightedString: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isExapandedTagListPopupOpen: false,
  setIsExapandedTagListPopupOpen: () => {},
  outerClickEvent: '',
  setOuterClickEvent: () => {},
  hasTooltip: false,
  tooltipNode: <></>,
  receivedTagItems: [],
  inputErrorMessage: '',
  setInputErrorMessage: () => {},
  isReceivedTagItemsLoaded: false,
  setIsReceivedTagItemsLoaded: () => {},
  combinedFunctionType: '',
  setCombinedFunctionType: () => {},
  isTagFocused: false,
  setIsTagFocused: () => {},
})

interface Props {
  children: ReactNode

  /** 제목 */
  title?: string

  /** 검색 결과 아이템 */
  searchResultItems?: MbTagSearchResultItem[]

  stringForReset?: string

  /** 검색어 input change 이벤트 */
  onInputSearchChange?: (value: string) => void

  /** 태그 데이터 변경됨 */
  onTagListChange: (tagItems: MbTagSearchTagItem[]) => void

  /** 리셋됨 */
  onResetCompleted?: () => void

  receivedTagItems: MbTagSearchTagItem[]

  hasTooltip?: boolean
  tooltipNode?: ReactNode

  errorMessage?: string

  /** 확장 팝업 오픈함 **/
  onExpandedPopupOpen?: (isOpen: boolean) => void

  /** 기능 타입 **/
  functionType?: string

  onlyErrorMessage?: string
}

const TagSearchContainer = ({
  searchResultItems,
  onInputSearchChange,
  onTagListChange,
  onResetCompleted,
  children,
  stringForReset,
  title,
  receivedTagItems,
  hasTooltip,
  tooltipNode,
  errorMessage,
  onExpandedPopupOpen,
  functionType,
  onlyErrorMessage,
}: Props) => {
  const dispatch = useAppDispatch()
  const storeTagSearchFocusId = useAppSelector(state => state.commonVariables.tagSearchFocusId)
  const timerRef: TimeoutRef = useRef(null)
  const searchInputContainerRef = useRef<HTMLDivElement>(null)
  const [originId, resolveOriginId] = useState<string>(uuid())
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, resolveIsLoading] = useState<boolean>(false)
  const [isInputFocused, resolveIsFocused] = useState<boolean>(false)
  const [highlightedString, resolveHighlightedString] = useState<string>('')
  const [nameTagItems, resolveNameTagItems] = useState<MbTagSearchTagItem[]>([])
  const [listItems, resolveListItems] = useState<MbTagSearchResultItem[]>([])
  const [inputErrorMessage, resolveInputErrorMessage] = useState<string>('')
  const [isExapandedTagListPopupOpen, resolveIsExapandedTagListPopupOpen] = useState<boolean>(false)
  const [resetInputValueSymbol, resolveResetInputValueSymbol] = useState<string>('')
  const [outerClickEvent, resolveOuterClickEvent] = useState<string>('')
  const [isReceivedTagItemsLoaded, resolveIsReceivedTagItemsLoaded] = useState<boolean>(false)
  const [combinedFunctionType, resolveCombinedFunctionType] = useState<string>('')
  const [isTagFocused, resolveIsTagFocused] = useState<boolean>(false)
  const [onlyErrorMessageText, setOnlyErrorMessageText] = useState<string>('')

  const titleComponent = getComponent(children, FormTitleType)
  const inputComponent = getComponent(children, TagSearchInputType)
  const inputOnlyComponent = getComponent(children, TagInputOnlyType)
  const addInputComponent = getComponent(children, TagAddInputType)
  const buttonComponent = getComponent(children, TagSearchButtonType)
  const selectListComponent = getComponent(children, TagSearchSelectListType)
  const resultListComponent = getComponent(children, TagSearchResultListType)
  const tagListComponent = getComponent(children, TagSearchTagListType)
  const expandedTagListPopupComponent = getComponent(children, TagSearchExpandedTagListPopupType)

  const hasExpandedPopup = expandedTagListPopupComponent.length === 1

  const setIsTagFocused = (value: boolean) => {
    if (value) {
      // value가 true이면, redux store의 tagSearchFocusId를 originId로 변경한다.
      dispatch(setTagSearchFocusId(originId))
    }
    resolveIsTagFocused(value)
  }

  const setOriginId = (value: string) => {
    resolveOriginId(value)
  }

  const setCombinedFunctionType = (value: string) => {
    resolveCombinedFunctionType(value)
  }

  const setResetInputValueSymbol = (value: string) => {
    resolveResetInputValueSymbol(() => value)
  }

  const setNameTagItems = (newItems: MbTagSearchTagItem[]) => {
    resolveNameTagItems(() => [...newItems])
    onTagListChange && onTagListChange([...newItems])
  }

  const setListItems = (newItems: MbTagSearchResultItem[]) => {
    resolveListItems(() => [...newItems])
  }

  const setIsInputFocused = (value: boolean) => {
    if (value) {
      // value가 true이면, redux store의 tagSearchFocusId를 originId로 변경한다.
      dispatch(setTagSearchFocusId(originId))
    }
    resolveIsFocused(() => value)
  }

  const setHighlightedString = (value: string) => {
    const val = value.trim()
    resolveHighlightedString(val)
  }

  const setIsLoading = (value: boolean) => {
    resolveIsLoading(value)
  }

  const setIsExapandedTagListPopupOpen = (value: boolean) => {
    setIsInputFocused(false)
    resolveIsExapandedTagListPopupOpen(value)
    onExpandedPopupOpen && onExpandedPopupOpen(value)
  }

  const setOuterClickEvent = (value: string) => {
    resolveOuterClickEvent(value)
  }

  const setInputErrorMessage = (value: string) => {
    resolveInputErrorMessage(value)
  }

  const setIsReceivedTagItemsLoaded = (value: boolean) => {
    resolveIsReceivedTagItemsLoaded(value)
  }

  const resetAll = () => {
    resolveNameTagItems(() => [])
    resolveListItems(() => [])
    resolveHighlightedString('')
    resolveIsFocused(false)
    resolveIsLoading(false)
    resolveIsExapandedTagListPopupOpen(false)
    resolveResetInputValueSymbol(new Date().getTime().toString())

    onResetCompleted && onResetCompleted()
  }

  useEffect(() => {
    if (searchResultItems) {
      resolveListItems(() => {
        return [...searchResultItems].map(item => {
          const sameIdItem = nameTagItems.find(tagItem => tagItem.id === item.id)
          if (sameIdItem) {
            return {
              ...item,
              checked: true,
            }
          } else {
            return {
              ...item,
              checked: false,
            }
          }
        })
      })
      resolveIsLoading(false)
    }
  }, [searchResultItems])

  useEffect(() => {}, [listItems])

  useEffect(() => {
    if (stringForReset) {
      resetAll()
    }
  }, [stringForReset])

  /**
   * receivedTagItems 내려오면 nameTagItem에 적용시킨다.
   * receivedTagItems.length가 0이면 초기화된다.
   */
  useEffect(() => {
    if (receivedTagItems) {
      resolveNameTagItems(() => [...receivedTagItems])
      setIsReceivedTagItemsLoaded(true)

      const newListItems = listItems.map(item => {
        const sameIdItem = receivedTagItems.find(tagItem => tagItem.id === item.id)
        if (sameIdItem) {
          return {
            ...item,
            checked: true,
          }
        } else {
          return {
            ...item,
            checked: false,
          }
        }
      })
      setListItems(newListItems)
    }
  }, [receivedTagItems])

  useEffect(() => {
    setInputErrorMessage(errorMessage ?? '')
    if (errorMessage !== '') {
      setIsInputFocused(false)
    }
  }, [errorMessage])

  useEffect(() => {
    if (functionType) {
      setCombinedFunctionType(functionType)
    }
  }, [functionType])

  // 현재 포커싱되어 있는 tagSearch가 자신이 아니라면, isInputFocused를 false로 변경한다.
  useEffect(() => {
    if (storeTagSearchFocusId !== '') {
      if (storeTagSearchFocusId !== originId) {
        setIsInputFocused(false)
      }
    }
  }, [storeTagSearchFocusId, originId])

  useEffect(() => {
    if (onlyErrorMessage !== undefined) {
      setOnlyErrorMessageText(onlyErrorMessage)
    }
  }, [onlyErrorMessage])

  useEffect(() => {
    if (originId === '') {
      setOriginId(uuid() + uuid())
    }
  }, [])

  /**
   * 컴포넌트 바깥쪽 클릭 이벤트
   */
  useOuterClick(containerRef, () => {
    resolveIsFocused(false)
    resolveOuterClickEvent(new Date().getTime().toString())
  })

  return (
    <TagSearchContext.Provider
      value={{
        originId,
        setOriginId,
        title,
        resetInputValueSymbol,
        timerRef,
        listItems,
        nameTagItems,
        isInputFocused,
        isLoading,
        highlightedString,
        isExapandedTagListPopupOpen,
        hasExpandedPopup,
        outerClickEvent,
        onInputSearchChange,
        setResetInputValueSymbol,
        setListItems,
        setHighlightedString,
        setNameTagItems,
        setIsInputFocused,
        setIsLoading,
        setIsExapandedTagListPopupOpen,
        setOuterClickEvent,
        hasTooltip,
        tooltipNode,
        receivedTagItems,
        setInputErrorMessage,
        inputErrorMessage,
        isReceivedTagItemsLoaded,
        setIsReceivedTagItemsLoaded,
        combinedFunctionType,
        setCombinedFunctionType,
        isTagFocused,
        setIsTagFocused,
        searchInputContainerRef,
      }}
    >
      <div
        className="select-form__section select-form-input"
        ref={containerRef}
        id={originId}
      >
        <div className="select-form__group">
          {titleComponent && titleComponent}
          {inputComponent && inputComponent}
          {inputOnlyComponent && inputOnlyComponent}
          {addInputComponent && addInputComponent}
          {selectListComponent && selectListComponent}
          {buttonComponent && buttonComponent}
          {resultListComponent && resultListComponent}
        </div>
        {onlyErrorMessageText !== undefined && onlyErrorMessageText !== '' && (
          <div className="form-msg__group">
            <p className="form-msg is-failed">{onlyErrorMessageText}</p>
          </div>
        )}
        {tagListComponent && tagListComponent}
        {expandedTagListPopupComponent && expandedTagListPopupComponent}
      </div>
    </TagSearchContext.Provider>
  )
}

export default TagSearchContainer

TagSearchContainer.SearchTitle = TagSearchTitle
TagSearchContainer.SearchInput = TagSearchInput
TagSearchContainer.InputOnly = TagInputOnly
TagSearchContainer.AddInput = TagAddInput
TagSearchContainer.SearchButton = TagSearchButton
TagSearchContainer.SearchResultList = TagSearchResultList
TagSearchContainer.SearchTagList = TagSearchTagList
TagSearchContainer.ExpandedTagListPopup = TagSearchExpandedTagListPopup
TagSearchContainer.SearchSelectList = TagSearchSelectList
