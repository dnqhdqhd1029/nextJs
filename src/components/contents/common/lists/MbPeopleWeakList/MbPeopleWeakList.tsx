/**
 * @file ListTypePeople.tsx
 * @description search-type3
 */

import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import MbPeopleWeakListItem from '~/components/contents/common/lists/MbPeopleWeakList/MbPeopleWeakListItem'
import type { PeopleWeakListItem } from '~/types/contents/Common'
import { getStylesOfImageRatio } from '~/utils/common/image'

interface Props {
  data: PeopleWeakListItem[]
  onNameClick?: (item: PeopleWeakListItem) => void
  onSubNameClick?: (item: PeopleWeakListItem) => void
}

const MbPeopleWeakList = ({ data, onNameClick, onSubNameClick }: Props) => {
  const [listItems, setListItems] = useState<PeopleWeakListItem[]>()

  const delayedGetStyles = async (url: string) => {
    return await getStylesOfImageRatio(url)
  }

  const adjustListItems = async (array: PeopleWeakListItem[]) => {
    const newListItems: PeopleWeakListItem[] = []
    for (const item of array) {
      const styles = await delayedGetStyles(item.imageSrc ?? '')
      newListItems.push({ ...item, imageStyle: styles })
    }
    setListItems(newListItems)
  }

  useEffect(() => {
    if (data) {
      adjustListItems(data)
    }
  }, [data])

  if (!data) return null

  return (
    <div className="list-type3__section">
      <ul className="list-type3__group">
        {listItems?.map(item => (
          <MbPeopleWeakListItem
            key={`${item.id}-${uuid()}`}
            item={item}
            onNameClick={onNameClick}
            onSubNameClick={onSubNameClick}
          />
        ))}
      </ul>
    </div>
  )
}

export default MbPeopleWeakList
