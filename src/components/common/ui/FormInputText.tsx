/**
 * @file FormInputText.tsx
 * @description input text 컴포넌트
 */

import {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import FormMsg from './FormMsg'
import FormTitle from './FormTitle'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import TagElement from '~/components/common/ui/TagElement'

export interface InputTextProps {
  extraInputType?: string
  onChangeExtra?: (e: string) => void

  /** Input element title property */
  title?: string

  /** Input element name property */
  name?: string

  /** Input element id property */
  id?: string

  /** Input element type property */
  inputType?: string

  /** Input element placeholder property */
  placeholder?: string

  /** Input element value property */
  value?: string

  /** Input element required property */
  required?: boolean

  /** Tooltip 여부 */
  tooltip?: boolean

  /** Tooltip children */
  children?: ReactNode

  /** Input element disabled property */
  disabled?: boolean

  /** 표시될 msg */
  msg?: string

  /** Succeeded style 여부 */
  succeeded?: boolean

  /** Failed style 여부 */
  failed?: boolean

  /** Add button 여부 */
  addBtn?: boolean

  /** Input element defaultValue property */
  defaultValue?: string

  /** autoComplete */
  preventAutoComplete?: boolean

  /** className */
  className?: string

  /** maxLength */
  maxLength?: number

  /** minusBtn */
  minusBtn?: boolean

  /** readonly **/
  readonly?: boolean

  /** add 버튼 클릭 */
  onAdd?: (inputRef: RefObject<HTMLInputElement>) => void

  /** inputRef */
  getInputRef?: (inputRef: RefObject<HTMLInputElement>) => void

  /** style */
  style?: CSSProperties

  /**
   * Input onChange event
   * @param {ChangeEvent<HTMLInputElement>} e 이벤트 객체
   * @returns
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void

  /**
   * Input onClick event
   * @param {MouseEvent<HTMLInputElement>} e 이벤트 객체
   * @returns
   */
  onClick?: (e: MouseEvent<HTMLInputElement>) => void

  /**
   * Input onFocus event
   * @param {FocusEvent<HTMLInputElement>} e 이벤트 객체
   * @returns
   */
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void

  /**
   * Input onBlur event
   * @param {FocusEvent<HTMLInputElement>} e 이벤트 객체
   * @returns
   */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void

  /**
   * Input onKeyup event
   * @param {KeyboardEvent<HTMLInputElement>} e 이벤트 객체
   * @returns
   */
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void

  /**
   * Input onKeydown event
   * @param {KeyboardEvent<HTMLInputElement>} e 이벤트 객체
   * @returns
   */
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void

  onInput?: (e: ChangeEvent<HTMLInputElement>) => void
}

const FormInputText = forwardRef(
  (
    {
      title,
      inputType = 'text',
      placeholder,
      value = '',
      name,
      required,
      tooltip,
      disabled,
      msg,
      succeeded,
      failed,
      children,
      addBtn,
      style,
      preventAutoComplete,
      onKeyUp,
      onKeyDown,
      onChange,
      onClick,
      onFocus,
      onBlur,
      getInputRef,
      id = uuid(),
      defaultValue,
      maxLength,
      onAdd,
      minusBtn,
      readonly,
      onInput,
      extraInputType,
      onChangeExtra,
    }: InputTextProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>(defaultValue ?? '')
    const [isPasswordView, setIsPasswordView] = useState(false)
    const [currentInputType, setCurrentInputType] = useState(inputType)

    const normalPhoneFormat = async (phoneNumber: string) => {
      if (phoneNumber.length <= 11) {
        return phoneNumber.replace(/[^0-9]/g, '')
        // .replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        // .replace(/(\-{1,2})$/g, '')
      } else {
        return inputValue
      }
    }
    const phoneFormat = async (phoneNumber: string) => {
      if (phoneNumber.length <= 11) {
        return phoneNumber.replace(/[^0-9]/g, '')
        // .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        // .replace(/(\-{1,2})$/g, '')
      } else {
        return inputValue
      }
    }

    const businessNmFormat = async (phoneNumber: string) => {
      if (phoneNumber.length <= 12) {
        return phoneNumber
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, '$1-$2-$3')
          .replace(/(\-{1,2})$/g, '')
      } else {
        return inputValue
      }
    }
    const onChangeValue = async (e: ChangeEvent<HTMLInputElement>) => {
      if (extraInputType && extraInputType === 'phone') {
        const phone = await phoneFormat(e.target.value)
        setInputValue(phone)
        onChangeExtra && onChangeExtra(phone)
      } else if (extraInputType && extraInputType === 'normalPhone') {
        const phone = await normalPhoneFormat(e.target.value)
        setInputValue(phone)
        onChangeExtra && onChangeExtra(phone)
      } else if (extraInputType && extraInputType === 'businessNm') {
        const businessNm = await businessNmFormat(e.target.value)
        setInputValue(businessNm)
        onChangeExtra && onChangeExtra(businessNm)
      } else {
        setInputValue(e.target.value)
        onChange && onChange(e)
      }
    }

    const onInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      onInput && onInput(e)
    }

    const onClickDelete = () => {
      if (inputValue) setInputValue('')
      inputRef.current?.focus()
      onChange && onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
      onChangeExtra && onChangeExtra('')
    }

    const handleAddButton = () => {
      onAdd && onAdd(inputRef)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown && onKeyDown(e)
      if (e.key === 'Enter' && (addBtn || (!addBtn && id.includes('-input-add')))) {
        if (inputRef.current?.value !== '') {
          onAdd && onAdd(inputRef)
        }
      }
    }

    useEffect(() => {
      if (inputType === 'password') {
        if (isPasswordView) {
          setCurrentInputType('text')
        } else {
          setCurrentInputType('password')
        }
      }
    }, [isPasswordView])

    useEffect(() => {
      setInputValue(value)
    }, [value])

    useEffect(() => {
      if (inputRef) {
        getInputRef && getInputRef(inputRef)
      }
    }, [inputRef])

    return (
      <TagElement
        tagName={preventAutoComplete ? 'form' : 'div'}
        className={cn('ipt-text__area', { 'is-succeeded': succeeded, 'is-failed': failed })}
        ref={ref}
        autoComplete={preventAutoComplete ? uuid() : undefined}
        style={style}
      >
        {title && (
          <FormTitle
            title={title}
            required={required}
            tooltip={tooltip}
          >
            {children}
          </FormTitle>
        )}

        <div className={cn({ 'type-add': addBtn || minusBtn })}>
          <div className="ipt-text__group">
            {preventAutoComplete && (
              <>
                <input
                  type="text"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                />
                <input
                  type="password"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                />
              </>
            )}

            <input
              type={currentInputType}
              ref={inputRef}
              name={name ?? id}
              id={id}
              className="ipt-text"
              placeholder={placeholder}
              value={inputValue}
              required={required}
              disabled={disabled}
              onChange={onChangeValue}
              onKeyUp={onKeyUp}
              onClick={onClick}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={handleKeyDown}
              onInput={onInputValue}
              readOnly={readonly}
              maxLength={maxLength}
            />
            <label htmlFor={id}></label>
            {inputType !== 'password' && !disabled && !readonly && (
              <button
                type="button"
                className="ipt-text__delete"
                onClick={onClickDelete}
                style={{ display: inputValue !== '' ? 'flex' : 'none' }}
              >
                <IcoSvg data={icoSvgData.iconCloseButton2} />
                <span className="hidden">삭제</span>
              </button>
            )}

            {inputType === 'password' && (
              <button
                type="button"
                className={cn('ipt-text__view', { 'is-off': !isPasswordView })}
                onClick={() => setIsPasswordView(!isPasswordView)}
              >
                <span className="ipt-text__view-ico"></span>
                <span className="hidden">삭제</span>
              </button>
            )}
          </div>

          {addBtn && (
            <div className="type-add__button">
              <Button
                label={'버튼'}
                cate={'default-ico-only'}
                size={'m'}
                color={'outline-form'}
                icoLeft={true}
                disabled={disabled}
                icoLeftData={icoSvgData.plusLg}
                onClick={handleAddButton}
              />
            </div>
          )}
        </div>

        {msg && <FormMsg msg={msg} />}
      </TagElement>
    )
  }
)

export default FormInputText
