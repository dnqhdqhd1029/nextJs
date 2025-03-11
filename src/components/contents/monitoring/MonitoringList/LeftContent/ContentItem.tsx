import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import type { NewsSrchDto } from '~/types/api/service'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const ContentItem = (props: NewsSrchDto) => {
  const {
    monitoringIdParams,
    isFilterSubParam,
    isOwner,
    monitoringListParams,
    userInfo,
    monitoringDate,
    setSelectedDeleteContent,
    setChangeCategoryId,
  } = useMonitoringSearch()

  const openPopup = () => {
    if (props.newsSrchId) {
      setSelectedDeleteContent({
        isOpen: true,
        key: props.newsSrchId,
        title: `${props.title}(소유자 ${props.owner?.name})`,
        type: '',
      })
    }
  }
  return (
    <li
      id={'ContentItem' + props.newsSrchId}
      className={cn({
        'is-selected': monitoringIdParams.toString() === props.newsSrchId?.toString(),
      })}
      // style={{ paddingTop: 5 }}
    >
      {props?.isNewsAlert && (
        <span className="accordion-type1-panel__option-bell">
          <IcoSvg data={icoSvgData.bell} />
        </span>
      )}
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
        onClick={() => setChangeCategoryId(props, monitoringDate, monitoringListParams, isFilterSubParam, isOwner)}
      >
        <span>{props.title}</span>
      </button>
    </li>
  )
}

export default ContentItem
