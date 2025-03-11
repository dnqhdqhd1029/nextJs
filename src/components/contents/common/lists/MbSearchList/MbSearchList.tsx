/**
 * @file MbSearchList.tsx
 * @description 검색결과형 목록
 */

import { ChangeEvent, useEffect, useState } from 'react'

import MbSearchListItem from '~/components/contents/common/lists/MbSearchList/MbSearchListItem'
import type { SearchListItem } from '~/types/contents/Common'

interface Props {
  data: SearchListItem[]
  onMediaTitleClick?: (item: SearchListItem) => void
  onAuthorClick?: (pid: number, mediaId: number) => void
  onItemSelected?: (item: SearchListItem) => void
  onInputCheckChange?: (e: ChangeEvent<HTMLInputElement>, item: SearchListItem) => void
}

const MbSearchList = ({
  data: dataProp,
  onMediaTitleClick,
  onAuthorClick,
  onItemSelected,
  onInputCheckChange,
}: Props) => {
  const [data, setData] = useState<SearchListItem[]>()

  const handleAuthorClick = (pid: number, mediaId: number) => {
    onAuthorClick && onAuthorClick(pid, mediaId)
  }

  const handleMediaTitleClick = (item: SearchListItem) => {
    onMediaTitleClick && onMediaTitleClick(item)
  }

  const handleItemSelected = (item: SearchListItem) => {
    onItemSelected && onItemSelected(item)
  }

  const handleCheck = (e: ChangeEvent<HTMLInputElement>, item: SearchListItem) => {
    onInputCheckChange && onInputCheckChange(e, item)
  }

  useEffect(() => {
    setData(dataProp)
  }, [dataProp])

  if (!data) return null

  return (
    <div className="list-type8__section">
      <ul className="list-type8__group">
        {data.map((item, index) => (
          <MbSearchListItem
            item={item}
            key={index}
            onCheck={handleCheck}
            onAuthorClick={handleAuthorClick}
            onMediaTitleClick={handleMediaTitleClick}
            onItemSelected={handleItemSelected}
          />
        ))}
      </ul>
    </div>
  )
}

export default MbSearchList
