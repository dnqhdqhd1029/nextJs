/**
 * @file TagSearchContainer.tsx
 * @description 태그 검색
 */

import { ChangeEvent, ReactNode, RefObject, UIEvent, useEffect, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import FormInputText from '~/components/common/ui/FormInputText'
import TagSearchContainer from '~/components/contents/common/forms/MbTagSearch/TagSearchContainer'
import type {
  MbSearchTagFunctionTypes,
  MbTagSearchExpandedItemObject,
  MbTagSearchExpandedTagItem,
  MbTagSearchResultItem,
  MbTagSearchTagItem,
} from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'

interface Props {
  /** 제목 */
  title?: string

  /**
   * 모든 태그 아이템을 삭제하기 위해 useEffect에 사용할 랜덤 텍스트
   * 이전 값과 다르게 하기 위해 new Date().getTime().toString()를 이용한다.
   * */
  stringForReset?: string

  /**
   * 태그 아이템이 변경될 때 호출되는 콜백 함수
   * @param {MbTagSearchTagItem[]} tagItems 태그 아이템 목록
   */
  onTagListChange: (tagItems: MbTagSearchTagItem[]) => void

  /** 시작할 때 표시되는 태그 아이템 */
  storedTagItems?: MbTagSearchTagItem[]

  initTagItems?: MbTagSearchTagItem[]

  /** storedTagItems가 지속적으로 업데이트되는 case flag */
  willStoredTagItemsUpdate?: boolean

  /** TagSearch 조합의 기능 이름(ex. searchInput, buttonSearch 등등) */
  functionType: MbSearchTagFunctionTypes

  /** 제목에 툴팁이 필요할 경우 사용할 ReactNode */
  tooltipNode?: ReactNode

  /** 결과 목록에 사용할 데이터 */
  searchListData?: MbTagSearchResultItem[]

  /** 제목에 required 마크 표시 */
  required?: boolean

  /** input에 입력할 내용을 validate해야 할 경우. (ex. email 타입) */
  validateType?: string

  /** 태그 갯수를 제한해야 할 경우 */
  maxTagLimit?: number

  /** maxTagLimit와 같이 사용. 현재 태그 갯수 */
  currentSetTagItemLength?: number

  /**
   * maxTagLimit와 같이 사용 가능.
   * "이메일"은 5개까지 추가 가능합니다.
   * 위와 같은 문구에 쓰일 아이템 이름(ex. 이메일)
   */
  maxTagLimitTitle?: string

  /** input에 에러 메시지 표시가 필요할 경우 사용 */
  errorMessage?: string

  /** 모든 태그 삭제 기능을 사용하지 않을 경우 true로 설정 */
  preventDeletingAllTags?: boolean

  /** input의 ref */
  getInputRef?: (ref: RefObject<HTMLInputElement>) => void

  /**
   * input의 change event의 value 값을 알아야 할 때 사용.
   * @param {string} value input의 value 값
   */
  onInputSearchChange?: (value: string) => void

  /**
   * 태그 아이템을 삭제 시도할 때 호출되는 middleware hook 함수
   * @param {MbTagSearchTagItem} tagItem 삭제할 태그 아이템
   */
  tagDeleteHook?: (tagItem: MbTagSearchTagItem) => Promise<boolean>

  /**
   * 태그 아이템을 추가하기 전의 검증 함수
   *
   */
  tagAddHook?: (tagItem: MbTagSearchTagItem) => Promise<boolean>

  /**
   * 태그 결과 목록 스크롤 이벤트
   * @param {UIEvent<HTMLDivElement, UIEvent>} e 스크롤 이벤트
   */
  onListScroll?: (e: UIEvent<HTMLDivElement>, title: string) => void

  /** mediaFieldUpperItems */
  receivedUpperItems?: MbTagSearchExpandedItemObject

  /** mediaFieldLowerItems */
  receivedLowerItems?: MbTagSearchExpandedItemObject

  /**
   * 확장 팝업 오픈
   * @param {boolean} isOpen 확장 팝업 오픈 여부
   */
  onExpandedPopupOpen?: (isOpen: boolean, title: string) => void

  /** 현재 확장 팝업 타이틀 */
  expandedPopupTitle?: string

  /**
   * 확장 팝업에서 상위 아이템 태그 선택
   * @param {MbTagSearchExpandedTagItem} item 선택한 상위 아이템
   * @param {string} title 선택한 상위 아이템의 타이틀
   */
  onSelectExpandedPopupUpperItem?: (item: MbTagSearchExpandedTagItem, title: string) => void

  /**
   * 버튼 형식의 셀렉트에서 클릭 이벤트
   */
  onSelectButtonClick?: (isOpen: boolean) => void

  /**
   * 날짜 형식일 경우 기본 선택 날짜
   */
  defaultDateItemId?: string

  /**
   * visiblity 설정
   */
  isHidden?: boolean

  /** searchPopupButtonTitle */
  searchPopupButtonTitle?: string

  /** inputSearch 타입에서 button으로 tag add 가능할 때 */
  isTagAddButtonInInputSearch?: boolean

  /** inputSearch 타입에서 tag add button event */
  onTagAddButtonClick?: (value: string) => void

  /** errorMessage만 보여주고 style은 변경시키지 않음 */
  onlyErrorMessage?: string

  /** 태그 리스트 가리기 */
  hideTagList?: boolean

  /** 날짜 형식일 경우 */
  hasDateRange?: boolean

  /** 결과 목록 아이템을 ReactNode로 받음 */
  isResultListItemReactNode?: boolean
}

const MbTagSearch = <T,>({
  onTagListChange,
  stringForReset,
  title,
  storedTagItems,
  initTagItems,
  willStoredTagItemsUpdate,
  searchListData,
  functionType,
  tooltipNode,
  required,
  validateType,
  maxTagLimit,
  currentSetTagItemLength,
  maxTagLimitTitle,
  errorMessage,
  getInputRef,
  onInputSearchChange,
  tagDeleteHook,
  tagAddHook,
  preventDeletingAllTags,
  onListScroll,
  receivedUpperItems,
  receivedLowerItems,
  onExpandedPopupOpen,
  onSelectExpandedPopupUpperItem,
  onSelectButtonClick,
  defaultDateItemId,
  isHidden = false,
  searchPopupButtonTitle,
  isTagAddButtonInInputSearch = false,
  onTagAddButtonClick,
  onlyErrorMessage,
  hideTagList = false,
  hasDateRange,
  isResultListItemReactNode = false,
}: Props) => {
  const [searchResultItems, setSearchResultItems] = useState<MbTagSearchResultItem[]>([])
  const [receivedTagItems, setReceivedTagItems] = useState<MbTagSearchTagItem[]>([])
  const [inputErrorMessage, setInputErrorMessage] = useState<string>(errorMessage ?? '')
  const [upperItems, setUpperItems] = useState<MbTagSearchExpandedItemObject>()
  const [lowerItems, setLowerItems] = useState<MbTagSearchExpandedItemObject>()
  const [isAlreadySavedStoreTags, setIsAlreadySavedStoreTags] = useState(false)
  const [willUpdateStoredTagItems, setWillUpdateStoredTagItems] = useState(false)
  const [isTagListHidden, setIsTagListHidden] = useState(false)
  const [defaultDateText, setDefaultDateText] = useState<string>('')
  const [currentTagItems, setCurrentTagItems] = useState<MbTagSearchTagItem[]>([])

  const [tagInputValue, setTagInputValue] = useState<string>('')

  const isLimitTagLength = useMemo(() => {
    if (!maxTagLimit || !currentSetTagItemLength) {
      return false
    }
    return currentSetTagItemLength === maxTagLimit
  }, [maxTagLimit, currentSetTagItemLength])

  const handleInputSearchChange = (value: string) => {
    if (onInputSearchChange) {
      onInputSearchChange && onInputSearchChange(value)
    } else {
      const filteredItems = searchListData?.filter(item => item.label.includes(value)) ?? []
      if (title === '그룹') {
        setSearchResultItems(() => [...filteredItems])
      } else {
        setSearchResultItems(() => [...filteredItems])
      }
    }
  }

  const handleExpandedPopupOpen = (isOpen: boolean) => {
    onExpandedPopupOpen && onExpandedPopupOpen(isOpen, title ?? '')
  }

  const handleSelectUpperItem = (item: MbTagSearchExpandedTagItem, title: string) => {
    onSelectExpandedPopupUpperItem && onSelectExpandedPopupUpperItem(item, title)
  }

  const handleSelectButtonClick = (isOpen: boolean) => {
    onSelectButtonClick && onSelectButtonClick(isOpen)
  }

  const handleTagAddHook = async (tagItem: MbTagSearchTagItem) => {
    if (maxTagLimit !== undefined) {
      const currentTagCount = currentTagItems.length
      if (currentTagCount >= maxTagLimit) {
        openToast(maxTagLimitTitle ?? `${title}은(는) ${maxTagLimit}개까지 선택할 수 있습니다.`, 'warning')
        return false
      }
    }
    if (tagAddHook) {
      return tagAddHook(tagItem)
    } else {
      return true
    }
  }

  const handleTagListChange = (tagItems: MbTagSearchTagItem[]) => {
    onTagListChange && onTagListChange(tagItems)
    setCurrentTagItems(() => [...tagItems])
  }

  const handleTagInputOnlyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTagInputValue(value)

    if (value === '') {
      onTagListChange([
        {
          label: '',
          id: '',
        },
      ])
      return
    }

    setInputErrorMessage('')

    const newTagItem: MbTagSearchTagItem = {
      label: e.target.value.trim(),
      id: `tag-input-only-${title}-${uuid()}`,
    }

    onTagListChange([newTagItem])
  }

  // useEffect(() => {
  //   if (!!!storedTagItems?.length && !isAlreadySavedStoreTags && !initTagItems) {
  //     // if (storedTagItems.length > 0) {
  //     //   setReceivedTagItems(() => [...storedTagItems])

  //     //   if (functionType === 'inputOnly' && storedTagItems[0]?.label) {
  //     //     setTagInputValue(() => storedTagItems[0].label)
  //     //   }
  //     // } else {
  //     // }
  //     setReceivedTagItems(() => [])

  //     if (!willUpdateStoredTagItems) {
  //       setIsAlreadySavedStoreTags(() => true)
  //     }
  //   }
  // }, [storedTagItems, isAlreadySavedStoreTags, willUpdateStoredTagItems])

  useEffect(() => {
    if (initTagItems && !isAlreadySavedStoreTags) {
      setReceivedTagItems(() => [...initTagItems])
      setIsAlreadySavedStoreTags(() => true)
    }
  }, [initTagItems])

  useEffect(() => {
    if (!!storedTagItems?.length && !isAlreadySavedStoreTags) {
      if (storedTagItems.length > 0) {
        setReceivedTagItems(() => [...storedTagItems])

        if (functionType === 'inputOnly' && storedTagItems[0]?.label) {
          setTagInputValue(() => storedTagItems[0].label)
        }
      }
      setIsAlreadySavedStoreTags(() => true)
    }
  }, [storedTagItems])

  useEffect(() => {
    if (searchListData) {
      setSearchResultItems(() => [...searchListData])
    }
  }, [searchListData])

  useEffect(() => {
    setInputErrorMessage(() => errorMessage ?? '')
  }, [errorMessage])

  // 팝업용 상위, 하위 아이템 설정
  useEffect(() => {
    if (receivedUpperItems?.title !== title) {
      return
    }

    if (receivedUpperItems) {
      setUpperItems(receivedUpperItems)
    }
    if (receivedLowerItems) {
      setLowerItems(receivedLowerItems)
    }
  }, [receivedUpperItems, receivedLowerItems])

  useEffect(() => {
    setIsTagListHidden(hideTagList)
  }, [hideTagList])

  // useEffect(() => {
  //   if (willStoredTagItemsUpdate !== undefined) {
  //     setWillUpdateStoredTagItems(willStoredTagItemsUpdate)
  //   }
  // }, [willStoredTagItemsUpdate])

  useEffect(() => {
    if (defaultDateItemId === undefined) {
      return
    }

    setDefaultDateText(defaultDateItemId)
  }, [defaultDateItemId])

  useEffect(() => {
    setTagInputValue('')
  }, [stringForReset])

  if (isHidden) {
    return null
  }

  return (
    <>
      <TagSearchContainer
        searchResultItems={searchResultItems}
        onInputSearchChange={handleInputSearchChange}
        onTagListChange={handleTagListChange}
        stringForReset={stringForReset}
        title={title}
        receivedTagItems={receivedTagItems}
        hasTooltip={!!tooltipNode}
        tooltipNode={tooltipNode}
        errorMessage={inputErrorMessage}
        onExpandedPopupOpen={handleExpandedPopupOpen}
        functionType={functionType}
        onlyErrorMessage={onlyErrorMessage}
      >
        <TagSearchContainer.SearchTitle required={required} />

        {functionType === 'inputSearch' && (
          <TagSearchContainer.SearchInput
            getInputRef={getInputRef}
            isTagAddButtonInInputSearch={isTagAddButtonInInputSearch}
            onTagAddButtonClick={onTagAddButtonClick}
          />
        )}
        {functionType === 'inputSearch' && (
          <TagSearchContainer.SearchResultList
            hasSearchInput
            tagDeleteHook={tagDeleteHook}
            tagAddHook={handleTagAddHook}
            onListScroll={e => onListScroll && onListScroll(e, title ?? '')}
            isResultListItemReactNode={isResultListItemReactNode}
          />
        )}
        {functionType === 'inputSearch' && !isTagListHidden && (
          <TagSearchContainer.SearchTagList
            preventDeletingAllTags={preventDeletingAllTags}
            tagDeleteHook={tagDeleteHook}
          />
        )}

        {functionType === 'inputSearchPopup' && <TagSearchContainer.SearchInput getInputRef={getInputRef} />}
        {functionType === 'inputSearchPopup' && (
          <TagSearchContainer.SearchResultList
            tagDeleteHook={tagDeleteHook}
            onListScroll={e => onListScroll && onListScroll(e, title ?? '')}
            searchPopupButtonTitle={searchPopupButtonTitle}
            isResultListItemReactNode={isResultListItemReactNode}
          />
        )}
        {functionType === 'inputSearchPopup' && !isTagListHidden && (
          <TagSearchContainer.SearchTagList
            preventDeletingAllTags={preventDeletingAllTags}
            tagDeleteHook={tagDeleteHook}
          />
        )}
        {functionType === 'inputSearchPopup' && (
          <TagSearchContainer.ExpandedTagListPopup
            upperItems={upperItems}
            lowerItems={lowerItems}
            tagDeleteHook={tagDeleteHook}
            tagAddHook={handleTagAddHook}
            onSelectUpperItem={handleSelectUpperItem}
          />
        )}

        {functionType === 'buttonSelectPopup' && (
          <TagSearchContainer.SearchButton onSelectButtonClick={handleSelectButtonClick} />
        )}
        {functionType === 'buttonSelectPopup' && !isTagListHidden && (
          <TagSearchContainer.SearchTagList
            preventDeletingAllTags={preventDeletingAllTags}
            tagDeleteHook={tagDeleteHook}
          />
        )}
        {functionType === 'buttonSelectPopup' && (
          <TagSearchContainer.ExpandedTagListPopup
            upperItems={upperItems}
            lowerItems={lowerItems}
            tagDeleteHook={tagDeleteHook}
            tagAddHook={handleTagAddHook}
            onSelectUpperItem={handleSelectUpperItem}
          />
        )}

        {functionType === 'buttonSelectSearch' && (
          <TagSearchContainer.SearchButton onSelectButtonClick={handleSelectButtonClick} />
        )}
        {functionType === 'buttonSelectSearch' && (
          <TagSearchContainer.SearchResultList
            hasSearchInput
            tagDeleteHook={tagDeleteHook}
            onListScroll={e => onListScroll && onListScroll(e, title ?? '')}
            isResultListItemReactNode={isResultListItemReactNode}
          />
        )}
        {functionType === 'buttonSelectSearch' && !isTagListHidden && (
          <TagSearchContainer.SearchTagList
            preventDeletingAllTags={preventDeletingAllTags}
            tagDeleteHook={tagDeleteHook}
          />
        )}

        {functionType === 'inputTagAdd' && (
          <TagSearchContainer.AddInput
            validateType={validateType}
            isLimitTagLength={isLimitTagLength}
            maxTagLimitTitle={maxTagLimitTitle}
            maxTagLimit={maxTagLimit}
            getInputRef={getInputRef}
            tagAddHook={tagAddHook}
            errorMessage={inputErrorMessage}
          />
        )}
        {functionType === 'inputTagAdd' && !isTagListHidden && (
          <TagSearchContainer.SearchTagList
            preventDeletingAllTags={preventDeletingAllTags}
            tagDeleteHook={tagDeleteHook}
          />
        )}

        {functionType === 'buttonSelectList' && (
          <TagSearchContainer.SearchSelectList
            defaultDateItemId={defaultDateText}
            hasDateRange={hasDateRange}
          />
        )}
        {functionType === 'buttonSelectList' && hasDateRange && (
          <TagSearchContainer.SearchTagList
            hasDateRange={hasDateRange}
            preventDeletingAllTags={preventDeletingAllTags}
            tagDeleteHook={tagDeleteHook}
          />
        )}
      </TagSearchContainer>
      {functionType === 'inputOnly' && (
        <FormInputText
          id={`mb-tag-input-only-${title}-${uuid()}`}
          onChange={handleTagInputOnlyChange}
          value={tagInputValue}
          getInputRef={getInputRef}
          failed={inputErrorMessage !== ''}
          msg={inputErrorMessage}
          style={{
            marginTop: '-14px',
          }}
        />
      )}
    </>
  )
}

export default MbTagSearch
