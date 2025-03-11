/**
 * @file TagInputOnly.tsx
 * @description 검색어만 입력
 */

import { ChangeEvent, RefObject, useContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { TagSearchContext } from './TagSearchContainer'

import FormInputText from '~/components/common/ui/FormInputText'
import type { MbTagSearchTagItem } from '~/types/contents/Common'

interface Props {
  receivedTagItems?: MbTagSearchTagItem[]
  errorMessage?: string
  getInputRef?: (ref: RefObject<HTMLInputElement>) => void
}

const TagInputOnly = ({ receivedTagItems, getInputRef, errorMessage }: Props) => {
  const { originId, resetInputValueSymbol, setNameTagItems, nameTagItems, setIsInputFocused } =
    useContext(TagSearchContext)
  const [inpValue, setInpValue] = useState<string>('')
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('')
  const [isFirstLoadCompleted, setIsFirstLoadCompleted] = useState<boolean>(false)

  const handleFocus = () => {
    setIsInputFocused(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInpValue(value)

    if (value === '') {
      setNameTagItems([])
      return
    }

    setInputErrorMessage('')

    const newTagItem: MbTagSearchTagItem = {
      label: e.target.value.trim(),
      id: `tag-input-only-${originId}-${uuid()}`,
    }

    setNameTagItems([newTagItem])
  }

  useEffect(() => {
    if (resetInputValueSymbol) {
      setNameTagItems([])
    }
  }, [resetInputValueSymbol])

  useEffect(() => {
    if (isFirstLoadCompleted) {
      return
    }

    if (receivedTagItems && receivedTagItems.length > 0) {
      setIsFirstLoadCompleted(true)
      setInpValue('헬로 월드')
    } else {
      setInpValue('')
    }
  }, [receivedTagItems])

  useEffect(() => {
    if (inpValue === undefined) {
      return
    }

    console.log('>> [TagInputOnly] inpValue: ', inpValue)
  }, [inpValue])

  useEffect(() => {
    setInputErrorMessage(errorMessage || '')
  }, [errorMessage])

  useEffect(() => {
    if (nameTagItems.length === 0) {
      setInpValue('')
    }
  }, [nameTagItems])

  return (
    <FormInputText
      id={`${originId}-input-only`}
      onChange={handleChange}
      onFocus={handleFocus}
      value={inpValue}
      getInputRef={getInputRef}
      failed={inputErrorMessage !== ''}
      msg={inputErrorMessage}
    />
  )
}

export default TagInputOnly
