import { useEffect, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { SelectListOptionItem } from '~/types/common'
import { MbTagSearchTagItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'

export const ContentItem = (props: {
  item: SelectListOptionItem
  tagItems: MbTagSearchTagItem[]
  onChangeChecked: (e: boolean, key: SelectListOptionItem) => void
}) => {
  const [isSelected, setIsSelected] = useState(false)
  useEffect(() => {
    const find = props.tagItems.find(e => e.id === props.item.id)
    setIsSelected(() => !!find)
  }, [props.tagItems.length])

  return (
    <li>
      <div
        className="select-form-option__item-input"
        style={{ padding: '3px 14px' }}
      >
        <FormInputBtn
          type="checkbox"
          name={props.item.id + 'checkbox_publishingPeriodList'}
          id={props.item.id + 'checkbox_publishingPeriodList'}
          checkDataLimit={30}
          checkDataLimitDisable={30 === props.tagItems.length ? 'action' : 'non'}
          onClickEvent={() =>
            30 === props.tagItems.length &&
            openToast('항목은 30개까지 선택할 수 있습니다, 숫자를 줄여서 다시 한번 선택해보세요', 'warning')
          }
          label={props.item.name}
          count={props.item.extra}
          onChange={() => props.onChangeChecked(isSelected, props.item)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}
