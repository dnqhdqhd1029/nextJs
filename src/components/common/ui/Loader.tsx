/**
 * @file ComponentLoader.tsx
 * @description 로딩바
 */

import { CSSProperties } from 'react'

import type { LoadingIconSize } from './LoadingIcon'
import LoadingIcon from './LoadingIcon'

interface Props {
  height?: string
  screen?: 'full' | 'adaptive' | 'absolute'
  zIndex?: number
  top?: string
  left?: string
  size?: LoadingIconSize
  isHide?: boolean
}

const Loader = ({
  height = '80px',
  screen = 'adaptive',
  zIndex = 1,
  size = 's24',
  top,
  left,
  isHide = false,
}: Props) => {
  const isFull = screen === 'full'
  const isAbsolute = screen === 'absolute'
  const position = isFull ? 'fixed' : isAbsolute ? 'absolute' : 'relative'
  const leftPos = isFull ? 0 : isAbsolute ? '50%' : 'auto'
  const topPos = isFull ? 0 : isAbsolute ? '50%' : 'auto'
  const transform = isAbsolute ? 'translate(-50%, -50%)' : 'none'
  const styles: CSSProperties = {
    display: isHide ? 'none' : 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: isFull ? '100vh' : height,
    position: position,
    left: left ?? leftPos,
    top: top ?? topPos,
    right: isFull ? 0 : 'auto',
    bottom: isFull ? 0 : 'auto',
    zIndex: isFull ? 9999 : zIndex,
    transform: transform,
  }
  return (
    <div style={styles}>
      <LoadingIcon size={size} />
    </div>
  )
}

export default Loader
