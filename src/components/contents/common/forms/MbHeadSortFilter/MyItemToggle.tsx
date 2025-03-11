/**
 * @file MyItemToggle.tsx
 * @description 내 아이템 토글 기능
 */

import { ChangeEvent, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import FormInputToggle from '~/components/common/ui/FormInputToggle'

interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
  disabled?: boolean
}

const MyItemToggle = ({ onChange, checked, disabled = false }: Props) => {
  const [isChecked, setIsChecked] = useState(false)
  const randomId = uuid()

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked)
    }
  }, [checked])
  return (
    <li className="toggle">
      <FormInputToggle
        name={randomId}
        id={randomId}
        label="MY"
        reverse={true}
        onChange={onChange}
        checked={isChecked}
        disabled={disabled}
      />
    </li>
  )
}

export default MyItemToggle
