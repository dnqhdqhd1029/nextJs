import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const PressContentItem = (props: JournalistMediaGroupItem) => {
  const { journalArrayId, isFilterSubParam, isOwner, userInfo, setPressChangeCategoryId, setSelectedDeleteContent } =
    usePressMediaListResult()

  const openPopup = () => {
    if (props.jrnlstListId) {
      setSelectedDeleteContent({
        isOpen: true,
        key: props.jrnlstListId,
        title: `${props.title}(소유자 ${props.owner?.name})`,
        type: 'press',
      })
    }
  }

  return (
    <li
      id={'ContentItem' + props.jrnlstListId}
      className={cn({
        'is-selected': journalArrayId.toString() === props.jrnlstListId?.toString(),
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
        onClick={() => setPressChangeCategoryId(props, isFilterSubParam, isOwner)}
      >
        <span>{props.title}</span>
      </button>
    </li>
  )
}

export default PressContentItem
