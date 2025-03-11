/**
 * @file FilterChildItemHasSub.tsx
 * @description 3뎁스가 있는 2뎁스 아이템
 */

import { ChangeEvent, MouseEvent } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'

import FilterGrandChildItem from './FilterGrandChildItem'

import { filterTransition } from '~/components/contents/common/forms/MbSearchFilter'
import FilterDropdownIcon from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterDropdownIcon'
import FilterTitle from '~/components/contents/common/forms/MbSearchFilter/functionItems/FilterTitle'
import type { MbSearchFilterItem } from '~/types/contents/Common'

interface Props {
  parentItem: MbSearchFilterItem
  childItem: MbSearchFilterItem
  onChildItemToggleDropdown: (
    e: MouseEvent<HTMLButtonElement>,
    parentItem: MbSearchFilterItem,
    childItem: MbSearchFilterItem
  ) => void
  onGrandChildCheckboxChange: (
    e: ChangeEvent<HTMLInputElement>,
    parentItem: MbSearchFilterItem,
    childItem: MbSearchFilterItem,
    grandChildItem: MbSearchFilterItem
  ) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const FilterChildItemHasSub = ({
  parentItem,
  childItem,
  onChildItemToggleDropdown,
  onGrandChildCheckboxChange,
  onChange,
}: Props) => {
  return (
    <li>
      <button
        type="button"
        className="lnb-filter-depth2__button"
        onClick={e => onChildItemToggleDropdown(e, parentItem, childItem)}
      >
        <FilterTitle>{childItem.title}</FilterTitle>
        {childItem.count && <FilterTitle countType>{childItem.count}</FilterTitle>}
        {childItem.subItems && childItem.subItems?.length > 0 && (
          <FilterDropdownIcon isOpen={childItem.checked ?? false} />
        )}
      </button>
      {childItem.subItems && (
        <motion.ul
          className={cn('lnb-filter-depth3__list overflow-hidden')}
          initial={{
            height: 0,
          }}
          animate={{
            height: childItem.checked ? 'auto' : 0,
          }}
          transition={filterTransition}
        >
          {/*{childItem.subItems.length > 10 && <FilterSearchItem onChange={onChange && onChange} />}*/}

          {childItem.subItems.map(grandChildItem => (
            <FilterGrandChildItem
              key={grandChildItem.id}
              childItem={childItem}
              grandChildItem={grandChildItem}
              onGrandChildCheckboxChange={(e, childItem, grandChildItem) =>
                onGrandChildCheckboxChange(e, parentItem, childItem, grandChildItem)
              }
            />
          ))}
        </motion.ul>
      )}
    </li>
  )
}

export default FilterChildItemHasSub
