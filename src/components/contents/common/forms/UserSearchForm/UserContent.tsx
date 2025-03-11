import { useEffect, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { MbTagSearchTagItem } from '~/types/contents/Common'

const UserContent = (props: {
  idKey: string
  item: MbTagSearchTagItem
  tagItems: MbTagSearchTagItem[]
  onChangeChecked: (e: boolean, key: MbTagSearchTagItem) => void
}) => {
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    const find = props.tagItems.find(e => e.id === props.item.id)
    setIsSelected(() => !!find)
  }, [props.tagItems.length])

  return (
    <li id={props.idKey + props.item.id}>
      <div
        className="select-form-option__item-input"
        id={props.idKey + props.item.id}
      >
        <FormInputBtn
          type="checkbox"
          name={props.idKey + props.item.id + ''}
          id={props.idKey + props.item.id + ''}
          label={props.item.label}
          onClickEvent={() => props.onChangeChecked(isSelected, props.item)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}
export default UserContent
