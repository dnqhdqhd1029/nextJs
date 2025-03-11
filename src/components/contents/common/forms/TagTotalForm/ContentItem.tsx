import { useEffect, useState } from 'react'
import cn from 'classnames'

import { MbTagSearchTagItem } from '~/types/contents/Common'
import { openToast } from '~/utils/common/toast'

export const ContentItem = (props: {
  item: MbTagSearchTagItem
  tagItems: MbTagSearchTagItem[]
  onChangeChecked: (e: boolean, key: MbTagSearchTagItem) => void
}) => {
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (props.tagItems.length > 0) {
      const find = props.tagItems.find(e => e.id === props.item.id)
      setIsSelected(() => !!find)
    } else {
      setIsSelected(() => false)
    }
  }, [props.tagItems.length])

  return (
    <li>
      <div className="select-form-option__item-input">
        <div className={cn(`ipt-${'checkbox'}__group`)}>
          <input
            type={'checkbox'}
            name={props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            id={props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            checked={isSelected}
            onChange={() => props.onChangeChecked(isSelected, props.item)}
          />
          <label
            htmlFor={props.item.id + 'TagSearch_checkbox_mediagroupFieldContentList'}
            style={{ userSelect: 'none' }}
          >
            <span className="ico"></span>
            {props.item.label && (
              <div
                className={cn('label')}
                style={{
                  width: 'auto',
                }}
              >
                {props.item.label}
              </div>
            )}
            {/*{count && <span className="count">{count}</span>}*/}
          </label>
        </div>
      </div>
    </li>
  )
}
