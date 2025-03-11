/**
 * @file FormButtons.tsx
 * @description 버튼 컴포넌트 모음
 */

import { ButtonProps } from './common-ui'

export const BtnTest = ({ c, eClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={c}
      onClick={eClick}
    >
      BtnTest
    </button>
  )
}
