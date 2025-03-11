/**
 * @file MbMemoList.tsx
 * @description search-type5
 */

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

import MbMemoListItem from './MbMemoListItem'

import type { MemoListItem } from '~/types/contents/Common'

interface Props {
  data: MemoListItem[]
  onInputCheckChange?: (e: ChangeEvent<HTMLInputElement>, item: MemoListItem) => void
  onSelectItem?: (item: MemoListItem) => void
  onTitleClick?: (e: MouseEvent<HTMLButtonElement>, item: MemoListItem) => void
}

const MbMemoList = ({ data: dataProp, onSelectItem, onInputCheckChange, onTitleClick }: Props) => {
  const [data, setData] = useState<MemoListItem[]>()

  const handleCheckEvent = (e: ChangeEvent<HTMLInputElement>, item: MemoListItem) => {
    onInputCheckChange && onInputCheckChange(e, item)
  }

  useEffect(() => {
    setData(dataProp)
  }, [dataProp])

  useEffect(() => {}, [data])

  if (!data) return null

  return (
    <div className="list-type5__section">
      <ul className="list-type5__group">
        {data.map((item, index) => (
          <MbMemoListItem
            key={index}
            item={item}
            index={index}
            onInputCheckChange={handleCheckEvent}
            onSelectItem={onSelectItem}
            onTitleClick={onTitleClick}
          />
        ))}
      </ul>
    </div>
  )
}

export default MbMemoList
