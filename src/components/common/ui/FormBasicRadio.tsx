/**
 * @file FormBasicRadio.tsx
 * @description 기본 라디오 input
 */
import { CSSProperties, useEffect, useState } from 'react'

const FormBasicRadio = (props: any) => {
  const [style, setStyle] = useState<CSSProperties>({})
  const [className, setClassName] = useState<string>('')
  const [inputProps, setInputProps] = useState<any>({})

  useEffect(() => {
    if (props) {
      const { style, className, ...inputProps } = props
      setClassName(className)
      setStyle(style)
      setInputProps(inputProps)
    }
  }, [props])
  return (
    <div
      className={`mb-basic-form__container ` + className}
      style={style}
    >
      <label
        htmlFor={props.id}
        className="mb-basic-form__label"
      >
        <input
          type="radio"
          checked={props.checked}
          onChange={props.onChange}
          {...inputProps}
        />
        <span className="radio-icon"></span>
        {props.label && <span className="mb-basic-form__text">{props.label}</span>}
      </label>
    </div>
  )
}

export default FormBasicRadio
