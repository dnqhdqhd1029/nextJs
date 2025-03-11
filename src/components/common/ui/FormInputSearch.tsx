/**
 * @file FormInputSearch.tsx
 * @description input search 컴포넌트
 */

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import type { InputTextProps } from './FormInputText'

import FormMsg from '~/components/common/ui/FormMsg'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import TagElement from '~/components/common/ui/TagElement'

interface Props extends InputTextProps {
  onDeleteButtonClick?: () => void
}

const FormInputSearch = ({
  placeholder,
  value = '',
  name,
  preventAutoComplete,
  onChange,
  onKeyUp,
  onKeyDown,
  onFocus,
  onBlur,
  onClick,
  getInputRef,
  id = uuid(),
  maxLength,
  className,
  succeeded,
  failed,
  msg,
  onDeleteButtonClick,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string | undefined>(value)

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      const event = { ...e, target: { ...e.target, value: e.target.value }, maxLengthError: true }
      onChange && onChange(event)
      return
    } else {
      setInputValue(e.target.value)
      onChange && onChange(e)
    }
  }

  const onClickDelete = () => {
    if (inputValue) setInputValue('')
    inputRef.current?.focus()
    onChange && onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
    onDeleteButtonClick && onDeleteButtonClick()
  }

  useEffect(() => {
    if (inputRef) {
      getInputRef && getInputRef(inputRef)
    }
  }, [inputRef])

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value)
    }
  }, [value])

  return (
    <TagElement
      tagName={preventAutoComplete ? 'form' : 'div'}
      className={cn('ipt-search__area', className, { 'is-succeeded': succeeded, 'is-failed': failed })}
      autoComplete={preventAutoComplete ? uuid() : undefined}
    >
      <div className="ipt-search__group">
        <div className="ipt-search__ico">
          <IcoSvg data={icoSvgData.search} />
        </div>
        <input
          type="search"
          ref={inputRef}
          name={name ?? id}
          id={id}
          className="ipt-search"
          placeholder={placeholder}
          value={inputValue}
          onChange={onChangeValue}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onClick}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          autoComplete={preventAutoComplete ? uuid() : undefined}
        />
        <label htmlFor={id}>{placeholder}</label>
        <button
          type="button"
          className="ipt-search__delete"
          onClick={onClickDelete}
          style={{ display: inputValue !== '' ? 'flex' : 'none' }}
        >
          <IcoSvg data={icoSvgData.iconCloseButton2} />
          <span className="hidden">삭제</span>
        </button>
      </div>
      {msg && <FormMsg msg={msg} />}
    </TagElement>
  )
}

export default FormInputSearch
