import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { JournalistSrchDto, MediaSrchDto } from '~/types/api/service'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const MediaContentItem = (props: MediaSrchDto) => {
  const { savedMediaKey, userInfo, isFilterSubParam, isOwner, setMediaChangeCategoryId, setSelectedDeleteContent } =
    useSavedSearch()

  const openPopup = () => {
    if (props.mediaSrchId) {
      setSelectedDeleteContent({
        isOpen: true,
        key: props.mediaSrchId,
        title: `${props.title}(소유자 ${props.owner?.name})`,
        type: 'media',
      })
    }
  }

  return (
    <li
      id={'ContentItem' + props.mediaSrchId}
      className={cn({
        'is-selected': savedMediaKey.toString() === props.mediaSrchId?.toString(),
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
