/**
 * @file Flag.tsx
 * @description Flag 컴포넌트
 */

import { FlagsProps } from './common-ui'

const Flag = ({ label, color, size }: FlagsProps) => {
  return (
    <div className={`flag__group colors-${color} size-${size}`}>
      <span className={`flag__label size-${size}`}>{label}</span>
    </div>
  )
}

Flag.defaultProps = {
  label: '플래그명을 적어주세요',
}

export default Flag
