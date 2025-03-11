import { Fragment, useEffect, useState } from 'react'
import { DndContext, KeyboardSensor, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove as dndKitArrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import MonitoringReportGroupingItem from '~/components/contents/monitoring/Clipbook/Result/Popup/MonitoringReportGroupingItem'
import { groupingNewsListProps } from '~/stores/modules/contents/monitoring/monitoringSearch'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

interface Props {
  item: groupingNewsListProps
  index: number
}
const MonitoringReportGrouping = (props: Props) => {
  const {
    reportPopup,
    setMonitoringReportPopupIsDragging,
    setMonitoringReportPopupGroupDragOver,
    setMonitoringReportPopupGroupIndexChange,
  } = useClipbookDetail()
  const { setNodeRef } = useDroppable({ id: props.item.id })
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [itemIndex, setItemIndex] = useState()
  const handleDragEnd = ({ active, over }: any) => {
    const overId = over?.id
    if (!overId) {
      setMonitoringReportPopupIsDragging(null, reportPopup)
    } else {
      let newItems = [...props.item.data]
      const activeIndex = active.data.current.sortable.index
      const overIndex = over.data.current?.sortable.index || 0
      newItems = dndKitArrayMove(newItems, activeIndex, overIndex)
      setMonitoringReportPopupGroupDragOver(newItems, props.item, reportPopup)
    }
  }

  useEffect(() => {}, [])

  return (
    <li>
      <div className="list-type9__section">
        <div className="list-type9__header">
          <ul className="interval-mt12">
            <li>
              <div className="list-type9-header__sub-title">
                <div className="list-type9-header__title">
                  {props.item.name} <span className="count">{props.item.data.length}</span>
                </div>

                <div className="list-type9-header__buttons">
                  <Button
                    label={'위'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronThickLeft}
                    icoSize={16}
                    disabled={props.index === 0}
                    onClick={() => setMonitoringReportPopupGroupIndexChange(props.index, props.index - 1, reportPopup)}
                  />
                  <Button
                    label={'아래'}
                    cate={'ico-only'}
                    size={'s'}
                    color={'secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronThickLeft}
                    icoSize={16}
                    disabled={props.index === reportPopup.newsStep.groupingNewsList.length - 1}
                    onClick={() => setMonitoringReportPopupGroupIndexChange(props.index, props.index + 1, reportPopup)}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        onDragEnd={({ active, over }: any) => handleDragEnd({ active, over })}
        onDragOver={({ over, active }: any) => setMonitoringReportPopupIsDragging(active?.id || null, reportPopup)}
      >
        <SortableContext
          id={props.item.id}
          items={props.item.data}
          strategy={rectSortingStrategy}
        >
          <div
            className="list-type9__section"
            ref={setNodeRef}
          >
            <ul className="list-type9__group">
              {props.item.data &&
                props.item.data.length > 0 &&
                props.item.data.map(e => (
                  <MonitoringReportGroupingItem
                    key={'reportPopup.newsStep.newsList' + e.id}
                    item={e}
                    keyId={props.item.id}
                  />
                ))}
            </ul>
          </div>
        </SortableContext>
      </DndContext>
    </li>
  )
}

export default MonitoringReportGrouping
