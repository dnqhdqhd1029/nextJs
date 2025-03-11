/**
 * @file ListTypeText.tsx
 * @description search-type6
 */

import { MouseEvent } from 'react'

import MbTextListItem from './MbTextListItem'

import type { TextListItem } from '~/types/contents/Common'

interface Props {
  data: TextListItem[]
}

const MbTextList = ({ data: dataProps }: Props) => {
  const handleUpdate = (e: MouseEvent<HTMLButtonElement>, item: TextListItem) => {
    console.log('>> handleUpdate', item)
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, item: TextListItem) => {
    console.log('>> handleDelete', item)
  }

  return (
    <div className="list-type6__section">
      <ul className="list-type6__group">
        {dataProps.map(item => (
          <MbTextListItem
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  )
}

export default MbTextList
