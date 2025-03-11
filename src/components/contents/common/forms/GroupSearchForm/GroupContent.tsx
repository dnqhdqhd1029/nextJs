import { useEffect, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'

const GroupContent = (props: {
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
      <div className="select-form-option__item-input">
        <FormInputBtn
          type="checkbox"
          name={props.idKey + props.item.id + 'checkbox_mediagroupFieldContentList'}
          id={props.idKey + props.item.id + 'checkbox_mediagroupFieldContentList'}
          label={props.item.label}
          checkDataLength={props.tagItems.length}
          checkDataMinAmount={1}
          onClickEvent={() => {
            if (isSelected && 1 === props.tagItems.length) {
              openToast('회원은 최소 1개의 그룹에 가입해야 합니다.', 'error')
            }
          }}
          onChange={() => {
            console.log('isSelected', isSelected)
            console.log('props.tagItems.length', props.tagItems.length)
            props.onChangeChecked(isSelected, props.item)
          }}
          checked={isSelected}
        />
      </div>
    </li>
  )
}

export default GroupContent
