/**
 * @file Backdrop.tsx
 * @description Backdrop 컴포넌트
 */

import { CSSProperties, ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

interface Props {
  /** 보이기 여부 */
  isOpen?: boolean

  /** Backdrop 클릭 닫기 여부 */
  backdropClose?: boolean

  /** className */
  className?: string

  /** styles */
  style?: CSSProperties

  /** 닫기 이벤트 */
  onClose?: () => void
}

const Backdrop = ({ isOpen, onClose, backdropClose, className, style }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [motionClass, setMotionClass] = useState('')

  const handleClose = () => {
    onClose && onClose()
  }

  const handleBackdropClick = () => {
    if (backdropClose) {
      handleClose()
    }
  }

  return (
    <div
      className={cn('mb-backdrop', className)}
      onClick={handleBackdropClick}
      role="presentation"
      style={style}
    />
  )
}

export default Backdrop
