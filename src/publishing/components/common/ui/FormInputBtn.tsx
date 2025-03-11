/**
 * @file FormInputBtn.tsx
 * @description input 라디오, 체크박스 컴포넌트
 */

import { InputBtnProps } from './common-ui'

const FormInputBtn = ({ type, name, id, label, subLabel, count, checked, disabled, desc, history }: InputBtnProps) => {
  return (
    <>
      <div className={`ipt-${type}__group`}>
        <input
          type={type}
          name={name}
          id={id}
          defaultChecked={checked}
          disabled={disabled}
        />
        <label htmlFor={id}>
          <span className="ico"></span>
          {label && (
            <span className="label">
              {label} {subLabel && <b className="label-sub">{subLabel}</b>}
            </span>
          )}
          {count && <span className="count">{count}</span>}
          {desc && <span className="desc">{desc}</span>}
          {history && <span className="history">{history}</span>}
        </label>
      </div>
    </>
  )
}

export default FormInputBtn
