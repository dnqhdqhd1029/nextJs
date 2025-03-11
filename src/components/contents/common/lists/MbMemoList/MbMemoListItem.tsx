/**
 * @file MbMemoListItem.tsx
 * @description search-type5
 */

import { ChangeEvent, MouseEvent } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import IcoSvg from '~/components/common/ui/IcoSvg'
import type { MemoListItem } from '~/types/contents/Common'
import { getActivityIcon } from '~/utils/common/icons'
import { getCurrencyFormat } from '~/utils/common/number'

interface Props {
  item: MemoListItem
  index: number
  onInputCheckChange: (e: ChangeEvent<HTMLInputElement>, item: MemoListItem) => void
  onSelectItem?: (item: MemoListItem) => void
  onTitleClick?: (e: MouseEvent<HTMLButtonElement>, item: MemoListItem) => void
}

const MbMemoListItem = ({ item, index, onInputCheckChange, onSelectItem, onTitleClick }: Props) => {
  const {
    id,
    isChecked,
    isSelected,
    contents,
    author,
    activityType,
    activityTypeCode,
    updateDate,
    createDate,
    status,
    commentSize,
  } = item

  const handleItemClick = (e: MouseEvent<HTMLUListElement>) => {
    onSelectItem && onSelectItem(item)
  }

  const handleCheckEvent = (e: ChangeEvent<HTMLInputElement>, item: MemoListItem) => {
    e.stopPropagation()
    e.preventDefault()
    onInputCheckChange(e, item)
  }

  const handleCheckClickEvent = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
  }

  if (!item) return null

  return (
    <li key={index}>
      <div className={cn('list-type5-item__section', { 'is-selected': isSelected })}>
        <ul
          className="list-type5-item__list cursor-pointer"
          onClick={handleItemClick}
        >
          <li
            className="list-type5-item__check"
            onClick={handleCheckClickEvent}
          >
            <FormInputBtn
              type="checkbox"
              name={id}
              id={id}
              checked={isChecked}
              label=""
              onChange={e => handleCheckEvent(e, item)}
            />
          </li>
          <li className="list-type5-item__ico">
            {activityTypeCode && <IcoSvg data={getActivityIcon(activityTypeCode)} />}
          </li>
          <li className="list-type5-item__contents type-flex-grow">
            <Button
              elem="button"
              label={contents}
              cate={'link-text'}
              size={'m'}
              color={'body-text'}
              onClick={e => onTitleClick && onTitleClick(e, item)}
            />
            --- {item.id}
            <div className="list-type5-contents__flex">
              {commentSize && commentSize > 0 && (
                <div className="list-type5-contents__comment">
                  <p className="list-type5-contents__text">댓글 {getCurrencyFormat(commentSize)}</p>
                </div>
              )}
              <p className="list-type5-contents__text">
                <span>{activityType}</span>
                {status && status !== '' && <span className="ml-8">{status}</span>}
                {author && <span className="ml-8">{author}</span>}
                <span className="ml-8">생성일: {createDate}</span>
                <span className="ml-8">수정일: {updateDate}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default MbMemoListItem
