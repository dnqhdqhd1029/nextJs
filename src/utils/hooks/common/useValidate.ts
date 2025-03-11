/**
 * @file useValidate.ts
 * @description form input validation hook
 */

import { ChangeEvent, Dispatch, KeyboardEvent, MutableRefObject, RefObject, SetStateAction } from 'react'

export const useValidate = () => {
  const handleFormInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFunc: Dispatch<SetStateAction<string>> | Function,
    setErrorFunc?: Dispatch<SetStateAction<string>> | Function
  ) => {
    const value = e.target.value.trim()
    setErrorFunc && setErrorFunc('')
    setFunc(value)
  }

  const handleFormTextAreaChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    setFunc: Dispatch<SetStateAction<string>> | Function,
    setErrorFunc?: Dispatch<SetStateAction<string>> | Function
  ) => {
    setErrorFunc && setErrorFunc('')
    setFunc(e.target.value)
  }

  const handleLimitValueLengthToMaxCount = (
    e: KeyboardEvent<HTMLInputElement>,
    maxCount: number,
    setFunc: Dispatch<SetStateAction<string>> | Function,
    setErrorFunc: Dispatch<SetStateAction<string>> | Function,
    errorMessage: string
  ) => {
    const value = e.currentTarget.value
    if (e.key !== 'Backspace') {
      if (value.length >= maxCount) {
        e.preventDefault()
        setErrorFunc && setErrorFunc(errorMessage)
        setFunc(value.slice(0, maxCount))
      } else {
        setErrorFunc('')
      }
    }
  }

  const getInputRef = (ref: RefObject<HTMLInputElement>, targetRef: MutableRefObject<HTMLInputElement | null>) => {
    if (!ref.current) return
    targetRef.current = ref.current
  }

  return {
    handleFormInputChange,
    handleFormTextAreaChange,
    handleLimitValueLengthToMaxCount,
    getInputRef,
  }
}
