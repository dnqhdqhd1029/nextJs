/**
 * @file SideList.tsx
 * @description 목록
 */
import { useEffect, useState } from 'react'
import cn from 'classnames'

import type { MbSideListItem } from '~/types/contents/Common'

interface Props {
  hasHeader?: boolean
  hasMyButton?: boolean
  title: string
  activeTab: string
  listItems: MbSideListItem[]
  onListChange: (tab: string) => void
}

import FormInputToggle from '~/components/common/ui/FormInputToggle'

const MbSideList = ({
  hasHeader = true,
  hasMyButton = false,
  title,
  activeTab = 'press',
  onListChange,
  listItems,
}: Props) => {
  const [items, setItems] = useState<MbSideListItem[]>(listItems)
  const [currentTab, setCurrentTab] = useState<string>('')

  const handleClick = (tab: string) => {
    onListChange && onListChange(tab)
  }

  useEffect(() => {
    if (listItems) {
      setItems(listItems)
    }
  }, [listItems])

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab)
    }
  }, [activeTab])

  return (
    <div className="lnb-search__section">
      {hasHeader ? (
        <div className="lnb-search-result__header">
          <h2 className="lnb-search-result__title">{title}</h2>
          {hasMyButton && (
            <FormInputToggle
              name="cT13"
              id="cT13"
              label="MY"
              reverse={true}
            />
          )}
        </div>
      ) : (
        <h2 className="hidden">{title}</h2>
      )}

      <ul className="lnb-search-result__list">
        {items.map(item => (
          <li key={`side-list-item-${item.id}`}>
            <button
              type="button"
              className={cn('lnb-search-result__menu', { 'is-selected': currentTab === item.id })}
              onClick={() => handleClick(item.id)}
            >
              <span className="lnb-search-result__menu-text">{item.title}</span>
              {item.count !== undefined && <span className="lnb-search-result__menu-text">{item.count}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MbSideList
