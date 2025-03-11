/**
 * @file SearchInput.tsx
 * @description 검색어 입력 부분
 */
import { ChangeEvent, FocusEvent, KeyboardEvent, RefObject, useContext, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import FormInputText from '~/components/common/ui/FormInputText'
import { TagSearchContext } from '~/components/contents/common/forms/MbTagSearch/TagSearchContainer'
import { DEBOUNCE_DELAY_TIME, ENGLISH_NUMBER_SPECIAL_CHARACTERS_PATTERN } from '~/constants/common'
import { usePatterTest } from '~/utils/hooks/common/usePatternTest'

interface Props {
  getInputRef?: (ref: RefObject<HTMLInputElement>) => void
  onDeliverChangeEventToExternal?: (value: string) => void
  isTagAddButtonInInputSearch?: boolean
  onTagAddButtonClick?: (value: string) => void
}

const SearchInput = ({
  getInputRef,
  onDeliverChangeEventToExternal,
  isTagAddButtonInInputSearch,
  onTagAddButtonClick,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    timerRef,
    resetInputValueSymbol,
    setIsInputFocused,
    setIsLoading,
    isLoading,
    listItems,
    setHighlightedString,
    onInputSearchChange,
    inputErrorMessage,
    originId,
    searchInputContainerRef,
    setListItems,
    nameTagItems,
    setNameTagItems,
  } = useContext(TagSearchContext)
  const { test } = usePatterTest()
  const [value, setValue] = useState<string>('')
  const [hadAddButton, setHadAddButton] = useState<boolean>(false)

  const handleNameInputFocus = () => {
    setIsInputFocused(true)
    setIsLoading(false)
  }

  const handleNameSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()

    onDeliverChangeEventToExternal && onDeliverChangeEventToExternal(e.target.value)

    setValue(value)
    setHighlightedString(value)

    //@ts-ignore
    const isComposing = e.nativeEvent?.isComposing
    if (isComposing !== undefined) {
      if (!isComposing) {
        if (value !== '' && !ENGLISH_NUMBER_SPECIAL_CHARACTERS_PATTERN.test(value)) {
          setIsLoading(false)
          return false
        }
      }
    }

    setIsLoading(true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(async () => {
      onInputSearchChange && onInputSearchChange(value)
    }, DEBOUNCE_DELAY_TIME)
  }

  const handleGetInputRef = (ref: RefObject<HTMLInputElement>) => {
    inputRef.current = ref.current
    getInputRef && getInputRef(ref)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key
    // const isSpecialKey = SPECIAL_KEYS.includes(key)
    // const isWritableCharacter = KOREAN_ENGLISH_NUMBER_PATTERN.test(key)
    // const isBackspace = key === 'Backspace'

    // if ((isWritableCharacter || isBackspace) && !isSpecialKey) {
    //   setIsLoading(true)
    // } else {
    //   setIsLoading(false)
    // }
    if (key === 'Enter') {
      return false
    }
  }

  const handleAddButton = (ref: RefObject<HTMLInputElement>) => {
    const refValue = ref.current?.value.trim()
    if (refValue && refValue !== '') {
      setIsInputFocused(false)
      onTagAddButtonClick && onTagAddButtonClick(refValue)

      const isDuplicated = nameTagItems.filter(item => item.label === refValue && item.subData === 'USER').length > 0
      if (!isDuplicated) {
        setNameTagItems([...nameTagItems, { label: refValue, id: refValue, subData: 'USER' }])
      }
    }
  }

  const handleNameInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const currentElement = (e.nativeEvent.relatedTarget as HTMLElement) ?? e.target
    const parentElement = document.getElementById(`${originId}`)

    if (!parentElement?.contains(currentElement)) {
      setIsInputFocused(false)
    }
  }

  useEffect(() => {
    if (resetInputValueSymbol) {
      setValue('')
    }
  }, [resetInputValueSymbol])

  useEffect(() => {
    if (inputErrorMessage !== '') {
      setValue('')
      setHighlightedString('')
      setIsLoading(false)
      onInputSearchChange && onInputSearchChange('')
    }
  }, [inputErrorMessage])

  useEffect(() => {
    if (isTagAddButtonInInputSearch === undefined) {
      return
    }

    setHadAddButton(isTagAddButtonInInputSearch)
  }, [isTagAddButtonInInputSearch])

  return (
    <div
      className={cn('ipt-text__group', 'container-type')}
      ref={searchInputContainerRef}
    >
      <FormInputText
        id={`${originId}-search-input`}
        onChange={handleNameSearchChange}
        onKeyDown={handleKeyDown}
        onFocus={handleNameInputFocus}
        onBlur={handleNameInputBlur}
        getInputRef={handleGetInputRef}
        failed={inputErrorMessage !== ''}
        msg={inputErrorMessage}
        value={value}
        addBtn={hadAddButton}
        onAdd={handleAddButton}
      />
    </div>
  )
}

export default SearchInput
