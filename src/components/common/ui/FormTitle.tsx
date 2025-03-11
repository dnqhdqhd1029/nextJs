/**
 * @file FormInputText.tsx
 * @description input text 컴포넌트
 */

import type { InputTextProps } from '~/components/common/ui/FormInputText'
import { IcoRequired } from '~/components/common/ui/IcoGroup'

type Props = Pick<InputTextProps, 'title' | 'required' | 'tooltip' | 'children'>

const FormTitle = ({ title = '', required, tooltip, children }: Props) => {
  return (
    <div className="form-title__group">
      <span dangerouslySetInnerHTML={{ __html: title }} /> {tooltip && children} {required && <IcoRequired />}
    </div>
  )
}

export default FormTitle
