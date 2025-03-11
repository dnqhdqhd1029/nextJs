import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const MediaContentItem = (props: JournalistMediaGroupItem) => {
  const { mediaArrayId, isFilterSubParam, isOwner, userInfo, setMediaChangeCategoryId, setSelectedDeleteContent } =
    usePressMediaListResult()

  const openPopup = () => {
    if (props.mediaListId) {
      setSelectedDeleteContent({
        isOpen: true,
        key: props.mediaListId,
        title: `${props.title}(소유자 ${props.owner?.name})`,
        type: 'media',
      })
    }
  }

  return (
    <li
      id={'ContentItem' + props.mediaListId}
      className={cn({
        'is-selected': mediaArrayId.toString() === props.mediaListId?.toString(),
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
        onClick={() => setMediaChangeCategoryId(props, isFilterSubParam, isOwner)}
      >
        <span>{props.title}</span>
      </button>
    </li>
  )
}

export default MediaContentItem
