/**
 * @file TagList.tsx
 * @description 태그 리스트
 */

import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import Tag from '~/components/common/ui/Tag'

interface TagSpecificInterface {
  id?: string
  label?: string
  type?: string
  subData?: string
  realLabel?: string
  deleteDisabled?: boolean
  className?: string
}

interface Props<T extends TagSpecificInterface> {
  isDeleteAll?: boolean
  tagItems: T[]
  isTitle?: boolean
  onTagItemClose?: (item: T) => void
  onAllTagItemClose?: () => void
}

const TagList = <T extends TagSpecificInterface>({
  tagItems: receivedTagItems,
  isTitle,
  isDeleteAll = true,
  onTagItemClose,
  onAllTagItemClose,
}: Props<T>) => {
  const [tagItems, setTagItems] = useState<T[]>([])

  const handleTagClose = (item: T) => {
    onTagItemClose && onTagItemClose(item)
  }

  const handleTagCloseAll = () => {
    onAllTagItemClose && onAllTagItemClose()
  }

  useEffect(() => {
    if (receivedTagItems === undefined) {
      return
    }

    setTagItems(receivedTagItems)
  }, [receivedTagItems])

  return (
    <div className={cn('tags__section')}>
      <ul className="tags__list">
        {tagItems.map(tag => (
          <li key={`mb-tag-search-list-item-${tag.id}-${tag.label}`}>
            {isTitle ? (
              ''
            ) : (
              <>
                {typeof tag.subData === 'string' && tag.subData} {typeof tag.realLabel === 'string' && tag.realLabel}
              </>
            )}
            <Tag
              label={tag.label}
              cate={tag.type ? tag.type : 'n3'}
              shape={'round'}
              close={!tag.deleteDisabled}
              onClose={() => handleTagClose(tag)}
              className={tag.className ?? ''}
            />
          </li>
        ))}
      </ul>
      {tagItems.length > 1 && isDeleteAll && (
        <div className="tags__delete">
          <Button
            label={'모두 제거'}
            cate={'link-text'}
            size={'s'}
            color={'body-link'}
            onClick={handleTagCloseAll}
          />
        </div>
      )}
    </div>
  )
}

export default TagList
