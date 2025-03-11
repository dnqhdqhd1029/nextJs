/**
 * @file FormInputToggle.tsx
 * @description input 토글버튼 컴포넌트
 */

import { ChangeEvent, useEffect, useState } from 'react'
import cn from 'classnames'

import FormTitle from '~/components/common/ui/FormTitle'
import type { InputBtnProps } from '~/types/common'

const FormInputToggle = ({
  title,
  name,
  id,
  label,
  checked,
  disabled,
  required,
  tooltip,
  reverse,
  onChange,
}: InputBtnProps) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
    onChange && onChange(e)
  }

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked)
    }
  }, [checked])

  return (
    <>
      <div className={cn('ipt-btn__section', { 'type-reverse': reverse })}>
        {title && (
          <FormTitle
            title={title}
            required={required}
            tooltip={tooltip}
          />
        )}
        <div className="ipt-toggle__group">
          <input
            type="checkbox"
            name={name}
            id={id}
            disabled={disabled}
            onChange={handleChange}
            checked={isChecked}
          />
          <label htmlFor={id}>
            <span className="ico"></span>
            {label && <span className="label">{label}</span>}
          </label>
        </div>
      </div>
    </>
  )
}

export default FormInputToggle
