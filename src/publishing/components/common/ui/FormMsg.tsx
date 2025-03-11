/**
 * @file FormMsg.tsx
 * @description Form 메세지 영역
 */

import { InputTextProps } from './common-ui'

const FormMsg = ({ msg }: InputTextProps) => {
  return (
    <div className="form-msg__group">
      <p className="form-msg">{msg}</p>
    </div>
  )
}

export default FormMsg
