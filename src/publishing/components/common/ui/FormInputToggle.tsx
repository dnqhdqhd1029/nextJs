/**
 * @file FormInputToggle.tsx
 * @description input 토글버튼 컴포넌트
 */

import { InputBtnProps } from './common-ui'
import FormTitle from './FormTitle'

const FormInputToggle = ({ title, name, id, label, checked, disabled, required, tooltip, reverse }: InputBtnProps) => {
  return (
    <>
      <div className={`ipt-btn__section ${reverse ? 'type-reverse' : ''}`}>
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
            defaultChecked={checked}
            disabled={disabled}
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
