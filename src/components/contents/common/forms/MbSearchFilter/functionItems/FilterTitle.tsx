/**
 * @file FilterTitle.tsx
 * @description 필터 타이틀
 */

import { ReactNode } from 'react'
import cn from 'classnames'

interface Props {
  children: ReactNode
  countType?: boolean
  closeType?: boolean
}

const FilterTitle = ({ children, countType, closeType }: Props) => {
  return (
    <span className={cn('lnb-filter__menu-txt', { 'type-count': countType, 'type-close': closeType })}>{children}</span>
  )
}

export default FilterTitle
