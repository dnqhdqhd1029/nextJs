/**
 * @file IcoAvatar.tsx
 * @description ico avatar 컴포넌트
 */

import { CSSProperties } from 'react'
import cn from 'classnames'

import IcoSvg from './IcoSvg'

import type { Size } from '~/types/common'

export interface IcoProps {
  /** 텍스트 */
  label?: string

  /** Icon 그림 data */
  icoData: string[]

  /** Size */
  size?: Size

  /** Icon size */
  icoSize?: Size

  /** style */
  style?: CSSProperties
}

const IcoAvatar = ({ label = '', icoData, size = 's48', icoSize = 's24', style }: IcoProps) => {
  return (
    <div
      className={cn('ico-avatar__group', `size-${size}`, `icoSize-${icoSize}`)}
      style={{
        ...style,
      }}
    >
      <IcoSvg data={icoData} />
      <span className="hidden">{label}</span>
    </div>
  )
}

export default IcoAvatar
