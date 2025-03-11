import { Fragment, useEffect, useState } from 'react'
import { DndContext, KeyboardSensor, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove as dndKitArrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import cn from 'classnames'

import MonitoringReportGroupingItem from '~/components/contents/monitoring/Clipbook/Result/Popup/MonitoringReportGroupingItem'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const MonitoringReportNewsItem = () => {
  const { reportPopup, setMonitoringReportPopupIsDragging, setMonitoringReportPopupDragOver } = useClipbookDetail()
  const { setNodeRef } = useDroppable({ id: 'nonGrouping' })
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const handleDragEnd = ({ active, over }: any) => {
    const overId = over?.id
    if (!overId) {
      setMonitoringReportPopupIsDragging(null, reportPopup)
    } else {
      let newItems = [...reportPopup.newsStep.newsList]
      const activeIndex = active.data.current.sortable.index
      const overIndex = over.data.current?.sortable.index || 0
      newItems = dndKitArrayMove(newItems, activeIndex, overIndex)
      setMonitoringReportPopupDragOver(newItems, reportPopup)
    }
  }

  return (
    <li>
      <div className="list-type9__section">
        <div
          className={cn('search-type9__header', {
            'no-border': !reportPopup.newsStep.isNewsGrouping,
          })}
        >
          <ul className="interval-mt12">
            <li>
              <div className="list-type9-header__title">
                뉴스 {!reportPopup.newsStep.isNewsGrouping ? reportPopup.originNewsList.length : 0}개
              </div>
            </li>
          </ul>
        </div>
        <DndContext
          sensors={sensors}
          onDragEnd={({ active, over }: any) => handleDragEnd({ active, over })}
          onDragOver={({ over, active }: any) => setMonitoringReportPopupIsDragging(active?.id || null, reportPopup)}
        >
          <SortableContext
            id={'nonGrouping'}
            items={reportPopup.newsStep.newsList}
            strategy={rectSortingStrategy}
          >
            <div
              className="list-type9__section"
              ref={setNodeRef}
            >
              <ul className="list-type9__group">
                {reportPopup.newsStep.newsList &&
                  reportPopup.newsStep.newsList.length > 0 &&
                  reportPopup.newsStep.newsList.map(e => (
                    <MonitoringReportGroupingItem
                      key={'reportPopup.newsStep.newsList' + e.id}
                      item={e}
                    />
                  ))}
              </ul>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </li>
  )
}

export default MonitoringReportNewsItem
