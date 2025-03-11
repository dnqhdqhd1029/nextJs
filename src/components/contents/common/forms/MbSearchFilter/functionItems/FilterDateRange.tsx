/**
 * @file FilterDateRange.tsx
 * @description 날짜 선택
 */
import { useState } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import DatePickerRange from '~/components/common/ui/DatePickerRange'
import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'

interface Props {
  isOpen: boolean
  liClassName?: string
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
  defaultStartDate?: Date | null
  defaultEndDate?: Date | null
  portalId?: string
}

const FilterDateRange = ({
  isOpen,
  liClassName,
  onStartDateChange,
  onEndDateChange,
  defaultEndDate = null,
  defaultStartDate = null,
  portalId,
}: Props) => {
  const [overflowProperty, setOverflowProperty] = useState('hidden')
  // eslint-disable-next-line
  const handleAnimationComplete = (latest: any, isOpen: boolean) => {
    if (isOpen) {
      setOverflowProperty('visible')
    } else {
      setOverflowProperty('hidden')
    }
  }

  // eslint-disable-next-line
  const handleAnimationStart = (latest: any, isOpen: boolean) => {
    if (!isOpen) {
      setOverflowProperty('hidden')
    }
  }
  return (
    <motion.ul
      className={cn('lnb-filter-depth2__list display-block')}
      initial={{
        height: 0,
      }}
      animate={{
        height: isOpen ? 'auto' : 0,
      }}
      style={{
        overflow: overflowProperty,
      }}
      onAnimationComplete={latest => handleAnimationComplete(latest, isOpen)}
      onAnimationStart={latest => handleAnimationStart(latest, isOpen)}
      transition={filterTransition}
    >
      <li className={liClassName}>
        <DatePickerRange
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
          portalId={portalId}
        />
      </li>
    </motion.ul>
  )
}

export default FilterDateRange
