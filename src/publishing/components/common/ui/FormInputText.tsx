/**
 * @file FormInputText.tsx
 * @description input text 컴포넌트
 */

import { useCallback, useEffect, useRef, useState } from 'react'

import { InputTextProps } from './common-ui'
import FormMsg from './FormMsg'
import FormTitle from './FormTitle'

import Button from '~/publishing/components/common/ui/Button'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'

const FormInputText = ({
  title,
  inputType,
  placeholder,
  value,
  required,
  tooltip,
  disabled,
  msg,
  succeeded,
  failed,
  children,
  addBtn,
  minusBtn,
  readonly,
}: InputTextProps) => {
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
      {/* 
          [P] 작업
                1. value 있을 때 : is-valued 추가
          
          [D] 개발 필요
                1. 유효성 검사 성공 : is-succeeded
                2. 유효성 검사 실패 : is-failed
        */}
      <div
        className={`ipt-text__area ${onValue ? 'is-valued' : ''} ${succeeded ? 'is-succeeded' : ''} ${
          failed ? 'is-failed' : ''
        } ${title ? '' : 'type-no-title'}`}
      >
        {title && (
          <FormTitle
            title={title}
            required={required}
            tooltip={tooltip}
          >
            {children && children}
          </FormTitle>
        )}

        <div className={`${addBtn || minusBtn ? 'type-add' : ''}`}>
          <div className="ipt-text__group">
            <input
              type={inputType}
              name=""
              id=""
              className="ipt-text"
              placeholder={placeholder}
              value={iptValue || ''}
              required={required}
              disabled={disabled}
              readOnly={readonly}
              onChange={onChangeValue}
              ref={inputRef}
            />
            <label htmlFor=""></label>
            {inputType !== 'password' && (
              <button
                type="button"
                className="ipt-text__delete"
                onClick={onClickDelete}
              >
                {/* <IcoSvg data={icoSvgData.xCircle} /> */}
                <IcoSvg data={icoSvgData.iconCloseButton2} />
                <span className="hidden">삭제</span>
              </button>
            )}

            {inputType === 'password' && (
              <button
                type="button"
                className="ipt-text__view is-off"
                onClick={() => console.log('클릭 시 is-off 클래스 삭제 -> 아이콘 변경')}
              >
                <span className="ipt-text__view-ico"></span>
                <span className="hidden">삭제</span>
              </button>
            )}
          </div>

          {(addBtn || minusBtn) && (
            <div className="type-add__button">
              <Button
                label={'버튼'}
                cate={'default-ico-only'}
                size={'m'}
                color={'outline-form'}
                icoLeft={true}
                icoLeftData={addBtn ? icoSvgData.plusLg : icoSvgData.dashLg}
              />
            </div>
          )}
        </div>

        {msg && <FormMsg msg={msg} />}
      </div>
    </>
  )
}

FormInputText.defaultProps = {
  inputType: 'text',
  readonly: false,
}

export default FormInputText
