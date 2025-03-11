/**
 * @file FormInputText.tsx
 * @description input text 컴포넌트
 */

import { InputTextProps } from './common-ui'

import FormMsg from '~/components/common/ui/FormMsg'
import { IcoRequired } from '~/publishing/components/common/ui/IcoGroup'

const FormTitle = ({ title, required, tooltip, msg, children }: InputTextProps) => {
  return (
    <div className="form-title__group">
      {title} {tooltip && children} {required && <IcoRequired />}
      {msg && (
        <FormMsg
          msg={msg}
          type={'error'}
        />
      )}
    </div>
  )
}

export default FormTitle
