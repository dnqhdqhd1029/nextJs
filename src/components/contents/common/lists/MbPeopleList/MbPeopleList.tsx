/**
 * @file ListTypePeople.tsx
 * @description search-type2
 */

import { ChangeEvent, useEffect, useState } from 'react'

import MbPeopleListItem from '~/components/contents/common/lists/MbPeopleList/MbPeopleListItem'
import type { PeopleListItem } from '~/types/contents/Common'

interface Props {
  data: PeopleListItem[]
  allNewsOpen?: boolean
  onInputCheckChange?: (e: ChangeEvent<HTMLInputElement>, item: PeopleListItem) => void
  onSelectItem?: (item: PeopleListItem) => void
  onNameClick?: (item: PeopleListItem) => void
  onSubNameClick?: (item: PeopleListItem) => void
  onNewsShowChanged?: (index: number) => void
}

const MbPeopleList = ({
  data: dataProp,
  onInputCheckChange,
  onSelectItem,
  onNameClick,
  onSubNameClick,
  onNewsShowChanged,
  allNewsOpen,
}: Props) => {
  const [data, setData] = useState<PeopleListItem[]>()

  const handleShowRelatedNews = (index: number) => {
    onNewsShowChanged && onNewsShowChanged(index)
  }

  const handleShowRelatedNewsMore = (item: PeopleListItem, relatedNewsMaxIndex: number) => {
    const newData = data?.map(people => {
      if (people.id === item.id) {
        return {
          ...people,
          relatedNewsMaxIndex: relatedNewsMaxIndex + 7,
        }
      }
      return people
    })
    setData(newData)
  }

  const handleCheck = (e: ChangeEvent<HTMLInputElement>, item: PeopleListItem) => {
    onInputCheckChange && onInputCheckChange(e, item)
  }

  useEffect(() => {
    setData(dataProp)
  }, [dataProp])

  if (!data) return null

  return (
    <div className="list-type2__section">
      <ul className="list-type2__group">
        {data.map((item, index) => (
          <MbPeopleListItem
            key={index}
            item={item}
            index={index}
            onShowRelatedNews={handleShowRelatedNews}
            onShowRelatedNewsMore={handleShowRelatedNewsMore}
            onSelectItem={onSelectItem}
            onCheck={handleCheck}
            onNameClick={onNameClick}
            onSubNameClick={onSubNameClick}
          />
        ))}
      </ul>
    </div>
  )
}

export default MbPeopleList
