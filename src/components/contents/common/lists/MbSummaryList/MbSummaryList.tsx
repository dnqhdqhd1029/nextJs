/**
 * @file MbSummaryList.tsx
 * @description search-type4
 */

import { useEffect, useState } from 'react'

import MbSummaryListItem from '~/components/contents/common/lists/MbSummaryList/MbSummaryListItem'
import type { SummaryListItem } from '~/types/contents/Common'

interface Props {
  data: SummaryListItem[]
  isItemClickable?: boolean
  type_title?: string
  onItemSelected?: (item: SummaryListItem) => void
}

const MbSummaryList = ({ data: dataProp, onItemSelected, isItemClickable, type_title }: Props) => {
  const [data, setData] = useState<SummaryListItem[]>()

  useEffect(() => {
    setData(dataProp)
  }, [dataProp])

  if (!data) return null

  return (
    <div className="list-type4__section">
      <ul className="list-type4__group">
        {data.map(item => (
          <MbSummaryListItem
            key={item.id}
            item={item}
            onItemSelected={onItemSelected}
            isItemClickable={isItemClickable}
            type_title={type_title}
          />
        ))}
      </ul>
    </div>
  )
}

export default MbSummaryList
