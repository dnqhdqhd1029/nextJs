/**
 * @file TabsItem.tsx
 * @description 탭의 아이템 컴포넌트
 */

import { memo, MouseEvent, MutableRefObject } from 'react'
import cn from 'classnames'

import type { TabItem } from './Tabs'

export interface TabsItemType extends TabItem {
  index: number
}

interface Props {
  /** 탭 아이템 */
  item: TabsItemType

  /** 현재 선택된 index */
  activeIndex: number

  refs: MutableRefObject<HTMLLIElement[]>

  handleClick: (e: MouseEvent<HTMLButtonElement>, item: TabsItemType) => void
}

const TabsItem = ({ activeIndex, item, refs, handleClick }: Props) => {
  return (
    <li
      className={cn({ 'is-tab-active': item.index === activeIndex })}
      key={item.index}
      ref={ref => (refs.current[item.index] = ref as HTMLLIElement)}
    >
      <button
        type="button"
        className="tabs-menu__btn"
        onClick={e => handleClick(e, item)}
      >
        <span className="tabs-menu__name">{item.title}</span>
        {item.count && <span className="tabs-menu__number">{item.count}</span>}
      </button>
    </li>
  )
}

export default memo(TabsItem)
