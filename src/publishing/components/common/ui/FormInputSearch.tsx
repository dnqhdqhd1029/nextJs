/**
 * @file FormInputSearch.tsx
 * @description input search 컴포넌트
 */

import { useCallback, useEffect, useRef, useState } from 'react'

import { InputTextProps } from './common-ui'

import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

const FormInputSearch = ({ placeholder, value }: InputTextProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [iptValue, setIptValue] = useState<string | undefined>(value)
  const [onValue, setOnValue] = useState(false)

  const checkValued = useCallback(() => {
    iptValue ? setOnValue(true) : setOnValue(false)
  }, [iptValue])

  const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIptValue(e.target.value)
  }, [])

  const onClickDelete = useCallback(() => {
    if (iptValue) setIptValue('')
    checkValued()
    inputRef.current?.focus()
  }, [iptValue, checkValued])

  useEffect(() => {
    checkValued()
  }, [iptValue, checkValued])

  return (
    <>
      <div className={`ipt-search__area ${onValue ? 'is-valued' : ''}`}>
        <div className="ipt-search__group">
          <div className="ipt-search__ico">
            <IcoSvg data={icoSvgData.search} />
          </div>
          <input
            type="search"
            name=""
            id=""
            className="ipt-search"
            placeholder={placeholder}
            value={iptValue || ''}
            onChange={onChangeValue}
            ref={inputRef}
          />
          <label htmlFor="">{placeholder}</label>
          <button
            type="button"
            className="ipt-search__delete"
            onClick={onClickDelete}
          >
            {/* <IcoSvg data={icoSvgData.xCircle} /> */}
            <IcoSvg data={icoSvgData.iconCloseButton2} />
            <span className="hidden">삭제</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default FormInputSearch
