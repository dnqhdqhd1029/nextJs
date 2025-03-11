/**
 * @file SearchResultList.tsx
 * @description 검색 결과 목록
 */

import { ChangeEvent, useContext, useMemo } from 'react'
import cn from 'classnames'

import { TagSearchContext } from './TagSearchContainer'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import type { MbTagSearchResultItem, MbTagSearchTagItem } from '~/types/contents/Common'

interface Props {
  item: MbTagSearchResultItem
  hasSearchInput?: boolean
  highlightedString: string
  hasCheckStatus?: boolean
  onItemCheckStatusChange: (e: ChangeEvent<HTMLInputElement>, item: MbTagSearchResultItem) => void
  tagDeleteHook?: (item: MbTagSearchResultItem) => Promise<boolean>
  tagAddHook?: (item: MbTagSearchResultItem) => Promise<boolean>
  isResultListItemReactNode?: boolean
}

const SearchResultListItem = ({
  item,
  hasCheckStatus = true,
  highlightedString,
  onItemCheckStatusChange,
  tagDeleteHook,
  tagAddHook,
  isResultListItemReactNode = false,
}: Props) => {
  const { originId, nameTagItems, setNameTagItems, setIsInputFocused } = useContext(TagSearchContext)
  const currentItem = useMemo(() => {
    return nameTagItems[0]
  }, [nameTagItems])

  const handleSelectItem = (item: MbTagSearchResultItem) => {
    const newItem: MbTagSearchTagItem = { id: item.id, label: item.label }
    setNameTagItems([newItem])
    setIsInputFocused && setIsInputFocused(false)
  }

  const handleCheckStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    onItemCheckStatusChange(e, item)
  }

  const changeEventHook = async (e: ChangeEvent<HTMLInputElement>): Promise<boolean> => {
    if (tagAddHook && e.target.checked) {
      return await tagAddHook(item)
    } else if (tagDeleteHook && !e.target.checked) {
      return await tagDeleteHook(item)
    } else {
      return Promise.resolve(true)
    }
  }

  return (
    <>
      {hasCheckStatus ? (
        <li>
          <div className={cn('select-form-option__item-input')}>
            <FormInputBtn
              type="checkbox"
              id={`${originId}-${item.id}`}
              label={item.label}
              subLabel={item.subLabel as string}
              highlightedString={highlightedString}
              checked={item.checked}
              onChange={handleCheckStatusChange}
              changeEventHook={changeEventHook}
              isLabelNode={isResultListItemReactNode}
            />
          </div>
        </li>
      ) : (
        <li
          key={`${originId}-${item.id}`}
          className={cn('select-form-option__item', { 'is-active': currentItem && currentItem.id === item.id })}
        >
          <button
            className="select-form-option__item"
            onClick={() => handleSelectItem(item)}
          >
            <span className="select-form-option__item-text">
              {item.label} <span className="count-font__small-gray">{item.subLabel && item.subLabel}</span>
            </span>
          </button>
        </li>
      )}
    </>
  )
}

export default SearchResultListItem
