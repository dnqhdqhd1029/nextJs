/**
 * @file TagInputAdd.tsx
 * @description 태그 입력해서 추가하기
 */

import { ChangeEvent, RefObject, useContext, useEffect, useRef, useState } from 'react'

import { TagSearchContext } from './TagSearchContainer'

import FormInputText from '~/components/common/ui/FormInputText'
import { EMAIL_PATTERN, EMAIL_PATTERN_DESCRIPTION } from '~/constants/common'
import type { MbTagSearchTagItem } from '~/types/contents/Common'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'

interface Props {
  validateType?: string
  isLimitTagLength?: boolean
  maxTagLimitTitle?: string
  maxTagLimit?: number
  errorMessage?: string
  getInputRef?: (ref: RefObject<HTMLInputElement>) => void
  tagAddHook?: (item: MbTagSearchTagItem) => Promise<boolean>
}

const TagInputAdd = ({
  validateType,
  isLimitTagLength,
  maxTagLimitTitle,
  maxTagLimit,
  errorMessage: errorMsg,
  getInputRef,
  tagAddHook,
}: Props) => {
  const { originId, resetInputValueSymbol } = useContext(TagSearchContext)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { nameTagItems, setNameTagItems } = useContext(TagSearchContext)
  const [value, setValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>(errorMsg ?? '')

  const handleTagAdd = async (inputRef: RefObject<HTMLInputElement>) => {
    const value = inputRef.current?.value.trim()

    if (!value || value === '') {
      return
    }

    setErrorMessage('')

    // validateType이 있으면 해당 타입에 맞게 정규식으로 검사
    switch (validateType) {
      case 'email':
        const arrEmail = value.split(',').filter((email: string) => !!email.trim())
        let isEmailCheck = true
        arrEmail.forEach((email: string) => {
          if (!EMAIL_PATTERN.test(email.trim())) {
            isEmailCheck = false
          }
        })
        if (!isEmailCheck) {
          setErrorMessage(EMAIL_PATTERN_DESCRIPTION)
          setTimeout(() => {
            inputRef.current?.focus()
          }, 10)
          return
        }
        break
    }

    setErrorMessage('')

    if (validateType === 'email') {
      // 이메일 로직 새로
      let arrEmail = value
        .split(',')
        .filter((email: string) => !!email.trim())
        .filter((email: string) => !nameTagItems.some(nameTag => nameTag.id.trim() === email.trim()))
        .reduce((acc: Array<string>, cur: string) => {
          if (!acc.some(accEamil => accEamil.trim() === cur.trim())) {
            acc.push(cur)
          }
          return acc
        }, [])

      if (!!arrEmail.length) {
        if (isLimitTagLength || nameTagItems.length + arrEmail.length > (Number(maxTagLimit) ?? 20)) {
          openToast(
            `${maxTagLimitTitle}은 최대 ${getCurrencyFormat(Number(maxTagLimit) ?? 0)}개까지 입력 가능합니다.`,
            'error'
          )
          return
        }

        const newItem: Array<MbTagSearchTagItem> = arrEmail.map((email: string) => {
          return {
            id: email,
            label: email,
          }
        })

        setNameTagItems([...nameTagItems, ...newItem])
        setValue('')
        inputRef.current?.focus()
      }
    } else {
      const sameIdItem = nameTagItems.find(prevItem => prevItem.label === value)
      if (!sameIdItem) {
        if (isLimitTagLength) {
          openToast(
            `${maxTagLimitTitle}은 최대 ${getCurrencyFormat(Number(maxTagLimit) ?? 0)}개까지 입력 가능합니다.`,
            'error'
          )
          return
        }

        const newItem: MbTagSearchTagItem = { id: value, label: value }

        if (tagAddHook) {
          try {
            const result = await tagAddHook(newItem)
            if (!result) {
              return
            }
          } catch (error) {
            console.error(error)
            return
          }
        }

        setNameTagItems([...nameTagItems, newItem])
        setValue('')
        inputRef.current?.focus()
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setErrorMessage('')
    }
    setValue(e.target.value)
  }

  const handleGetInputRef = (ref: RefObject<HTMLInputElement>) => {
    inputRef.current = ref.current
    getInputRef && getInputRef(ref)
  }

  useEffect(() => {
    if (resetInputValueSymbol) {
      setValue('')
    }
  }, [resetInputValueSymbol])

  useEffect(() => {
    if (errorMsg === undefined) {
      return
    }

    setErrorMessage(errorMsg)
  }, [errorMsg])

  return (
    <FormInputText
      id={`${originId}-input-add`}
      addBtn={false}
      onAdd={handleTagAdd}
      getInputRef={handleGetInputRef}
      onChange={handleChange}
      value={value}
      failed={errorMessage !== ''}
      msg={errorMessage}
    />
  )
}

export default TagInputAdd
