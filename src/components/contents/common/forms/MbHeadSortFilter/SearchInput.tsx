/**
 * @file SearchInput.tsx
 * @description 검색 input
 */

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Portal from '~/components/common/utils/Portal'
import { useValidate } from '~/utils/hooks/common/useValidate'

interface Props {
  searchPortalSelector: string
  isSearchShow: boolean
  onClose: () => void
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  searchValue?: string
}

const SearchInput = ({
  searchPortalSelector,
  isSearchShow,
  onClose,
  onChange,
  disabled = false,
  searchValue,
  onKeyDown,
}: Props) => {
  const { getInputRef } = useValidate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [isSearchLayerShow, setIsSearchLayerShow] = useState(false)
  const [isDisabled, setIsDisabled] = useState(disabled)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onChange && onChange(e)
  }

  const handleClose = () => {
    setInputValue('')
    onChange && onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)

    onKeyDown &&
      //@ts-ignore
      onKeyDown({
        key: 'Enter',
        target: {
          value: '',
        },
      } as KeyboardEvent<HTMLInputElement>)
    onClose()
  }

  useEffect(() => {
    if (searchValue) {
      setInputValue(searchValue)
      if (searchValue !== '') {
        setIsSearchLayerShow(true)
      }
    } else {
      setInputValue('')
    }
  }, [searchValue])

  useEffect(() => {
    setIsSearchLayerShow(isSearchShow)
    if (isSearchShow) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 20)
    }
  }, [isSearchShow])

  useEffect(() => {
    setIsDisabled(disabled)
  }, [disabled])

  return (
    <Portal targetElementSelector={searchPortalSelector}>
      <div className={cn('search-result__search', { 'display-none': !isSearchLayerShow })}>
        <FormInputSearch
          placeholder={'검색'}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          getInputRef={ref => getInputRef(ref, inputRef)}
        />
        <Button
          label={'닫기'}
          cate={'ico-only'}
          size={'s'}
          color={'transparent'}
          icoLeft={true}
          icoLeftData={icoSvgData.iconCloseButton2}
          icoSize={16}
          onClick={handleClose}
          disabled={isDisabled}
        />
      </div>
    </Portal>
  )
}

export default SearchInput
