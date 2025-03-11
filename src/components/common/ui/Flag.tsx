/**
 * @file Flag.tsx
 * @description Flag 컴포넌트
 */

import cn from 'classnames'

export interface Props {
  /** 내용 */
  label: string

  /** 색상 */
  color?: 'gray-500'

  /** 사이즈 */
  size?: 's' | 'es'
}

const Flag = ({ label, color = 'gray-500', size = 's' }: Props) => {
  return (
    <div className={cn('flag__group', `colors-${color}`, `size-${size}`)}>
      <span className={cn('flag__label', `size-${size}`)}>{label}</span>
    </div>
  )
}

export default Flag
