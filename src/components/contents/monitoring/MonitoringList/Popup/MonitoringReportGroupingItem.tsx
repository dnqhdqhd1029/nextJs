import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'
import moment from 'moment'
import Link from 'next/link'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { SortedNewsItem } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

interface Props {
  item: SortedNewsItem
  keyId?: string
}
const MonitoringReportGroupingItem = (props: Props) => {
  const { reportPopup, setMonitoringReportPopupDeleteNewsArrayList, setMonitoringReportPopupDeleteGroupingNews } =
    useMonitoringSearch()
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={{
        ...style,
        zIndex: reportPopup.newsStep.draggingId === props.item.id ? 2 : 0,
        position: 'relative',
      }}
      {...attributes}
    >
      <div
        className={cn('list-type9-item__section', {
          'is-dragged': reportPopup.newsStep.draggingId === props.item.id,
          'is-not-dragged': reportPopup.newsStep.draggingId !== props.item.id,
        })}
      >
        <ul className="list-type9-item__list">
          <li
            className="button drag"
            {...listeners}
          >
            {reportPopup.newsStep.newsArrayList.id === 'manualSort' && <IcoSvg data={icoSvgData.gripVertical} />}
          </li>
          <li>
            <Link
              href={''}
              legacyBehavior
            >
              <p
                className="list-type9-item__title"
                onClick={() => window.open(props.item?.linkUrl || '')}
                style={{ cursor: 'pointer' }}
              >
                {props.item.title}
              </p>
            </Link>
            <p className="list-type9-item__info">
              <span>{moment(props.item.date).format('YYYY년 MM월 DD일 HH:mm')}</span>{' '}
              {props.item.mediaName && <span>{props.item.mediaName}</span>}{' '}
              {props.item?.authors && <span>{props.item.authors || ''}</span>}
              {props.item.tone && <span>논조: {props.item.tone}</span>}
              {props.item.mediaValue && <span>매체 지수: {getCurrencyFormat(props.item.mediaValue)}</span>}
            </p>
          </li>
          <li className="button close">
            <Button
              label={'닫기'}
              cate={'ico-only'}
              size={'s24'}
              color={'secondary'}
              icoLeft={true}
              icoLeftData={icoSvgData.iconCloseButton2}
              icoSize={16}
              onClick={() =>
                props.keyId
                  ? setMonitoringReportPopupDeleteGroupingNews(props.item.id, props.keyId, reportPopup)
                  : setMonitoringReportPopupDeleteNewsArrayList(props.item.id, reportPopup)
              }
            />
          </li>
        </ul>
      </div>
    </li>
  )
}

export default MonitoringReportGroupingItem
