/**
 * @file FormInputBtn.tsx
 * @description input 라디오, 체크박스 컴포넌트
 */

import { InputBtnProps } from './common-ui'
import FormInputBtn from './FormInputBtn'
import FormMsg from './FormMsg'
import FormTitle from './FormTitle'

{
  /* 
    [D] 개발 필요
          1. 유효성 검사 성공 : is-succeeded
          2. 유효성 검사 실패 : is-failed
  */
}
const FormInputBtnList = ({
  type,
  name,
  id,
  title,
  required,
  tooltip,
  label,
  msg,
  succeeded,
  failed,
}: InputBtnProps) => {
  const arr = [0, 1, 2]
  return (
    <div className={`ipt-btn__section ${succeeded ? 'is-succeeded' : ''} ${failed ? 'is-failed' : ''}`}>
      {title && (
        <FormTitle
          title={title}
          required={required}
          tooltip={tooltip}
        />
      )}
      <ul className="ipt-btn__list--row">
        {arr.map(a => {
          return (
            <li key={a}>
              <FormInputBtn
                type={type}
                name={name}
                id={`${id}${a}`}
                label={`${label}${a}`}
              />
            </li>
          )
        })}
      </ul>
      {msg && <FormMsg msg={msg} />}
    </div>
  )
}

export default FormInputBtnList
