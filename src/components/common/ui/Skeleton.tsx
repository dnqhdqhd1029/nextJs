/**
 * @file Skeleton.tsx
 * @description Skeleton UI
 */
import { CSSProperties } from 'react'
import cn from 'classnames'

interface Props {
  width?: string
  height?: string
  className?: string
  style?: CSSProperties
  borderRadius?: string
  shape?: 'circle' | 'rect'
  wrapperStyle?: CSSProperties
}

const Skeleton = ({
  width = '100px',
  height = '50px',
  className = '',
  style = {},
  borderRadius = '4px',
  shape = 'rect',
  wrapperStyle = {},
}: Props) => {
  return (
    <span
      style={{
        display: 'flex',
        justifyContent: 'center',
        ...wrapperStyle,
      }}
      className={cn('skeleton-wrapper')}
    >
      <span
        style={{
          width,
          height,
          borderRadius: shape === 'circle' ? '50%' : borderRadius,
          background: '#f4f4f4',
          ...style,
        }}
        className={cn(className, 'skeleton-box')}
      />
    </span>
  )
}

export default Skeleton
