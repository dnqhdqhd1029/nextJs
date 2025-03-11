import { ChangeEvent, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const ContentItem = (props: clipbookContentListProps) => {
  const { clipbookIdKey, userInfo, isFilterSubParam, isOwner, setSelectedDeleteContent, setChangeCategoryId } =
    useClipbookDetail()

  const openPopup = () => {
    if (props.clipBookId) {
      setSelectedDeleteContent({
        isOpen: true,
        key: props.clipBookId,
        title: `${props.title}(소유자 ${props.owner?.name})`,
        type: 'press',
      })
    }
  }

  return (
    <li
      id={'ContentItem' + props.clipBookId}
      className={cn({
        'is-selected': clipbookIdKey.toString() === props.clipBookId?.toString(),
      })}
      // style={{ paddingTop: 5 }}
    >
      {props.shareCode === 'WRITABLE' ? (
        <button
          className="accordion-type1-panel__option-delete"
          onClick={() => openPopup()}
        >
          <IcoSvg data={icoSvgData.trash} />
        </button>
      ) : (
        <>
          {props.owner?.userId === userInfo.userId && (
            <button
              className="accordion-type1-panel__option-delete"
              onClick={() => openPopup()}
            >
              <IcoSvg data={icoSvgData.trash} />
            </button>
          )}
        </>
      )}
      <button
        className="accordion-type1-panel__option-item"
        onClick={() => setChangeCategoryId(props, isFilterSubParam, isOwner)}
      >
        <span>{props.title}</span>
      </button>
    </li>
  )
}

export default ContentItem
