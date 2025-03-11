import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import GadgetContent from '~/components/contents/dashboard/GridItem/GadgetContent'
import SettingPage from '~/components/contents/dashboard/GridItem/SettingItem'
import GadgetPopup from '~/components/contents/dashboard/Popup/GadgetPopup'
import { GridItemOption } from '~/stores/modules/contents/dashboard/dashboardSlice'
import { useDashboardAction } from '~/utils/hooks/contents/dashboard/useDashboardAction'

const DashboardPage = () => {
  const { gridState, keywordMonitoring, setOpenGadgetPopupAction, handleDragStop, init } = useDashboardAction()

  useEffect(() => {
    init()
  }, [])
  return (
    <Fragment>
      <div className="mb-container responsive-type1 type-drag-drop">
        <div className="mb-common-inner">
          <div
            className={cn('mb-contents')}
            style={{ height: '100%' }}
          >
            <div
              className="drag-drop__section"
              style={{ height: '100%' }}
            >
              <div className="drag-drop__header">
                <Button
                  label={'가젯 추가'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  onClick={() => setOpenGadgetPopupAction(gridState, keywordMonitoring)}
                />
              </div>
              <DragDropContext onDragEnd={(e, i) => handleDragStop(e, gridState)}>
                <div
                  className={cn('drag-drop__area')}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    width: '100%',
                    gap: '8px',
                    height: '100%',
                  }}
                >
                  {Object.values(gridState).map(key => (
                    <Droppable
                      key={key.id}
                      droppableId={key.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {key.list.map((item: GridItemOption, index: number) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={cn('drag-drop__item')}
                                >
                                  {item.status === '' ? (
                                    <SettingPage
                                      gadgetKey={key.id}
                                      gadgetItem={item}
                                    />
                                  ) : (
                                    <GadgetContent
                                      gadgetKey={key.id}
                                      gadgetItem={item}
                                    />
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {key.list && key.list.length < 1 && (
                            <div className="drop-zone__container">
                              <p className="drop-zone__text">가젯을 이곳에 끌어놓거나 새 가젯을 추가하세요.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
      <GadgetPopup />
    </Fragment>
  )
}

export default DashboardPage
