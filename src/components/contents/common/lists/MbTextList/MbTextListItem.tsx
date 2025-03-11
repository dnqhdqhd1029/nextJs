/**
 * @file ListTypeText.tsx
 * @description search-type6
 */

import { MouseEvent } from 'react'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import type { TextListItem } from '~/types/contents/Common'

interface Props {
  item: TextListItem
  onUpdate?: (e: MouseEvent<HTMLButtonElement>, item: TextListItem) => void
  onDelete?: (e: MouseEvent<HTMLButtonElement>, item: TextListItem) => void
}

const MbTextListItem = ({ item, onUpdate, onDelete }: Props) => {
  const handleUpdate = (e: MouseEvent<HTMLButtonElement>, item: TextListItem) => {
    onUpdate && onUpdate(e, item)
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, item: TextListItem) => {
    onDelete && onDelete(e, item)
  }

  return (
    <li>
      <div className="list-type6-item__section">
        <p className="list-type6-item__text">{item.contents}</p>
        <p className="list-type6-item__info">
          <Button
            elem="a"
            url={item.authorLink ?? '#!'}
            label={item.author}
            cate={'link-text'}
            size={'m'}
            color={'body-link'}
          />{' '}
          <span>{item.date}</span>
        </p>
        <div className="list-type6-item__control">
          <Button
            label={'수정'}
            cate={'ico-only'}
            size={'s16'}
            color={'body-text'}
            icoLeft={true}
            icoLeftData={icoSvgData.pencil}
            icoSize={16}
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleUpdate(e, item)}
          />
          <Button
            label={'삭제'}
            cate={'ico-only'}
            size={'s16'}
            color={'body-text'}
            icoLeft={true}
            icoLeftData={icoSvgData.trash}
            icoSize={16}
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleDelete(e, item)}
          />
        </div>
      </div>
    </li>
  )
}

export default MbTextListItem
