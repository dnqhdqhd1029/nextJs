/**
 * @file FormMsg.tsx
 * @description Form 메세지 영역
 */

import cn from 'classnames'

import type { InputTextProps } from './FormInputText'

interface Props extends InputTextProps {
  type?: 'error' | 'success'
  msg?: string
}

const FormMsg = ({ msg = '', type }: Props) => {
  return (
    <div className="form-msg__group">
      <p
        className={cn('form-msg', {
          'is-failed': type === 'error',
          'is-succeeded': type === 'success',
        })}
      >
        {msg}
      </p>
    </div>
  )
}

export default FormMsg
