/**
 * @file ListTypeContents.tsx
 * @description search-type1
 */

import { useEffect, useState } from 'react'

import MbContentListItem from '~/components/contents/common/lists/MbContentList/MbContentListItem'
import { ContentListItem } from '~/types/contents/Common'

interface Props {
  data: ContentListItem[]
}

const MbContentList = ({ data }: Props) => {
  const [itemList, setItemList] = useState<ContentListItem[]>(data)

  useEffect(() => {
    const items = data.map((item, index) => {
      const firstOfYearItem = item.year !== data[index - 1]?.year
      return { ...item, firstOfYearItem }
    })
    setItemList(items)
  }, [data])

  return (
    <div className="list-type1__section">
      <ul className="list-type1__group">
        {itemList.map((item, index) => (
          <MbContentListItem
            item={item}
            index={index}
            key={index}
          />
        ))}
      </ul>
    </div>
  )
}

export default MbContentList
