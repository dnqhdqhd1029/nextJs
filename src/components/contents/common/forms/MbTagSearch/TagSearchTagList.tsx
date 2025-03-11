/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file TagList.tsx
 * @description 태그 리스트
 */

import { useContext, useEffect, useMemo } from 'react'
import cn from 'classnames'
import _ from 'lodash'

import { TagSearchContext } from './TagSearchContainer'

import Button from '~/components/common/ui/Button'
import Tag from '~/components/common/ui/Tag'
import type { MbTagSearchTagItem } from '~/types/contents/Common'

interface Props {
  tagDeleteHook?: (item: MbTagSearchTagItem) => Promise<boolean>
  preventDeletingAllTags?: boolean
  hasDateRange?: boolean
  onDeleteAll?: () => void
}

const TagList = ({ tagDeleteHook, preventDeletingAllTags, hasDateRange, onDeleteAll }: Props) => {
  const { title, listItems, setNameTagItems, setListItems, nameTagItems, setIsInputFocused, setIsTagFocused } =
    useContext(TagSearchContext)

  const isNotDirectDateNameTag = useMemo(() => {
    return hasDateRange && nameTagItems.length > 0 && nameTagItems[0].id !== 'DIRECT'
  }, [nameTagItems])

  const handleFocus = () => {
    setIsInputFocused(false)
    setIsTagFocused(true)
  }

  /**
   * 태그 닫기 버튼 클릭 이벤트
   * @param {MbTagSearchTagItem} item - 닫기 버튼을 클릭한 태그 아이템
   * @returns
   */
  const handleTagClose = async (item: MbTagSearchTagItem) => {
    if (tagDeleteHook) {
      const isDelete = await tagDeleteHook(item)
      if (!isDelete) return
      funcTagClose(item)
    } else {
      funcTagClose(item)
    }
  }

  const funcTagClose = (item: MbTagSearchTagItem) => {
    const newTagItems = _.cloneDeep(nameTagItems).filter(tagItem => tagItem.id !== item.id)

    setNameTagItems(newTagItems)

    const newListItem = _.cloneDeep(listItems).map(prevItem => {
      if (prevItem.id === item.id) {
        return {
          ...prevItem,
          checked: false,
        }
      } else {
        return prevItem
      }
    })

    setListItems(newListItem)
  }

  /**
   * 태그 전체 닫기 버튼 클릭 이벤트
   * @returns
   */
  const handleTagCloseAll = () => {
    setNameTagItems([])

    const newListItem = _.cloneDeep(listItems).map(prevItem => {
      return {
        ...prevItem,
        checked: false,
      }
    })

    setListItems(newListItem)
    onDeleteAll && onDeleteAll()
  }

  useEffect(() => {
    if (title === '기간') {
      // console.log('>> [TagSearchTagList] nameTagItems', title, nameTagItems)
    }
  }, [nameTagItems])

  return (
    <div className={cn('tags__section', { 'display-none': isNotDirectDateNameTag })}>
      <ul className="tags__list">
        {nameTagItems.map((tag, index) => {
          return (
            <li key={`mb-tag-search-list-item-${index}-${tag.label}`}>
              {tag.subData && tag.realLabel ? (
                <Tag
                  //@ts-ignore
                  label={
                    <span>
                      {tag.realLabel} <span className="color-gray">{tag.subData}</span>
                    </span>
                  }
                  cate={tag.type ? tag.type : 'n3'}
                  shape={'round'}
                  close={!tag.deleteDisabled}
                  onFocus={handleFocus}
                  onClose={() => handleTagClose(tag)}
                  className={tag.className ?? ''}
                />
              ) : (
                <Tag
                  label={tag.label}
                  cate={tag.type ? tag.type : 'n3'}
                  shape={'round'}
                  close={!tag.deleteDisabled}
                  onFocus={handleFocus}
                  onClose={() => handleTagClose(tag)}
                  className={tag.className ?? ''}
                />
              )}
            </li>
          )
        })}
      </ul>
      {nameTagItems.length > 1 && !preventDeletingAllTags && (
        <div className="tags__delete">
          <Button
            label={'모두 제거'}
            cate={'link-text'}
            size={'s'}
            color={'body-link'}
            onClick={handleTagCloseAll}
            onFocus={handleFocus}
          />
        </div>
      )}
    </div>
  )
}

export default TagList
