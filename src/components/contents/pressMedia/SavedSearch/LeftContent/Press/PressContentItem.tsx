import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { JournalistSrchDto } from '~/types/api/service'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressContentItem = (props: JournalistSrchDto) => {
  const { savedJournalKey, isFilterSubParam, isOwner, userInfo, setSelectedDeleteContent, setPressChangeCategoryId } =
    useSavedSearch()

  const openPopup = () => {
    if (props.jrnlstSrchId) {
      setSelectedDeleteContent({
        isOpen: true,
        key: props.jrnlstSrchId,
        title: `${props.title}(소유자 ${props.owner?.name})`,
        type: 'press',
      })
    }
  }

  return (
    <li
      id={'ContentItem' + props.jrnlstSrchId}
      className={cn({
        'is-selected': savedJournalKey.toString() === props.jrnlstSrchId?.toString(),
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
