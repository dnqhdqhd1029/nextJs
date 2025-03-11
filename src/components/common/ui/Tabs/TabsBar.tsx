/**
 * @file TabsBar.tsx
 * @description 탭 하단 선택바
 */

import { memo } from 'react'
import cn from 'classnames'

interface Props {
  isAllSet: boolean
  barLeft: number
  barWidth: number
  motionClass: string
}

const TabsBar = ({ isAllSet, barLeft, barWidth, motionClass }: Props) => {
  return (
    <div
      className={cn('tabs-bar__line', { [`${motionClass}`]: isAllSet })}
      style={{
        left: `${barLeft}px`,
        width: `${barWidth}px`,
      }}
    />
  )
}

export default memo(TabsBar)
