import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import Backdrop from '~/components/common/ui/Backdrop'
import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Portal from '~/components/common/utils/Portal'
import ClipbookContentItem from '~/components/contents/common/forms/ClipbookListPopup/ClipbookContentItem'
import ClipbookContentItemTypeAny from '~/components/contents/common/forms/ClipbookListPopup/ClipbookContentItemTypeAny'
import { clipbookDataListProps } from '~/stores/modules/contents/monitoring/clipbookListPopup'
import useDebounce from '~/utils/hooks/common/useDebounce'
import { useClipbookListPopup } from '~/utils/hooks/contents/monitoring/useClipbookListPopup'

interface Props {
  onChangeInitAction: (e: number[], k: clipbookDataListProps[]) => void
}

const ClipbookListPopup = (props: Props) => {
  const {
    clipbookListPage,
    clipbookContentList,
    setclipbookPopupNameAction,
    userClipbookListAutoSaveData,
    setClipbookData,
    setClipbookPopupAction,
    createClipbookAction,
    autoClipbookListData,
  } = useClipbookListPopup()
  const debouncedUpdateState = useDebounce(clipbookListPage.name, 500)
  const getOpenRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const createListAction = async () => {
    setIsLoading(() => true)
    await createClipbookAction(clipbookListPage)
    setIsLoading(() => false)
  }

  const activityAction = async () => {
    setIsLoading(() => true)
    const res = await setClipbookData(clipbookListPage, userClipbookListAutoSaveData, clipbookContentList)
    if (res.resultCode === 'init') {
      props.onChangeInitAction(res.deleteItem, res.resultClipbookListProps)
    } else {
      setIsLoading(() => false)
    }
  }

  const getResourceAction = async () => {
    setIsLoading(() => true)
    await autoClipbookListData(clipbookListPage.name, clipbookListPage.except)
    setIsLoading(() => false)
  }

  const filteredContentList = useMemo(() => {
    return clipbookContentList.filter(e => e.title === clipbookListPage.name)
  }, [clipbookContentList, clipbookListPage.name])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) setClipbookPopupAction(false, [])
    },
    [getOpenRef]
  )

  useEffect(() => {
    if (clipbookListPage.name !== '') {
      getResourceAction()
    }
  }, [debouncedUpdateState])

  useEffect(() => {
    if (clipbookListPage.isOpen) {
      getResourceAction()
      setIsLoading(() => false)
    }
  }, [clipbookListPage.isOpen])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <Portal>
      <AnimatePresence>
        {clipbookListPage.isOpen && (
          <motion.div
            className={cn('mb-backdrop-container')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'easeOut', duration: 0.12 }}
          >
            <Backdrop />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {clipbookListPage.isOpen && (
          <Fragment>
            <motion.div
              className="popup-type-list__section-container"
              initial={{ translateX: '100%' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '100%' }}
              transition={{ type: 'easeOut', duration: 0.2 }}
            >
              <div
                className="popup__section type-list"
                ref={getOpenRef}
              >
                <div className="popup-header__section">
                  <h2 className="popup-header__title">클립북 수정</h2>
                  <div className="popup-header__close">
                    <Button
                      label={'닫기'}
                      cate={'ico-only'}
                      size={'s32'}
                      color={'secondary'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.iconCloseButton}
                      disabled={isLoading}
                      icoSize={16}
                      onClick={() => setClipbookPopupAction(false, [])}
                    />
                  </div>
                </div>
                <div className="popup-contents__section">
                  <div className="popup-type-list__section">
                    <div className="popup-type-list__search">
                      <FormInputSearch
                        placeholder={'검색 또는 새 클립북 만들기'}
                        onChange={e => setclipbookPopupNameAction(e.target.value, clipbookListPage)}
                        maxLength={30}
                        value={clipbookListPage.name}
                        failed={clipbookListPage.nameErr !== ''}
                        msg={clipbookListPage.nameErr}
                      />
                    </div>
                    <div className="popup-type-list__group">
                      {clipbookContentList && clipbookContentList.length > 0 ? (
                        <ul className="popup-type-list__checkbox">
                          {clipbookContentList.map(e => {
                            if (clipbookListPage.type !== 'any') {
                              return (
                                <ClipbookContentItem
                                  key={`clipbook-simple-item-${e.clipBookId}-${e.title}`}
                                  {...e}
                                />
                              )
                            } else {
                              return (
                                <ClipbookContentItemTypeAny
                                  key={`clipbook-simple-item-${e.clipBookId}-${e.title}`}
                                  {...e}
                                />
                              )
                            }
                          })}
                        </ul>
                      ) : (
                        <div className="popup-type-list__nodata">
                          <p className="popup-type-list__nodata-text">찾는 클립북이 없습니다.</p>
                        </div>
                      )}
                      {clipbookListPage.name !== '' && (
                        <Fragment>
                          {filteredContentList.length === 1 ? (
                            <Fragment>
                              {filteredContentList[0].title !== clipbookListPage.name && (
                                <button
                                  type="button"
                                  className="popup-type-list__nodata-button"
                                  onClick={() => createListAction()}
                                >
                                  <span className="label keyword">{clipbookListPage.name}</span>
                                  <span className="label">새 클립북 만들기</span>
                                </button>
                              )}
                            </Fragment>
                          ) : (
                            <Fragment>
                              {filteredContentList.length === 0 && (
                                <button
                                  type="button"
                                  className="popup-type-list__nodata-button"
                                  onClick={() => createListAction()}
                                >
                                  <span className="label keyword">{clipbookListPage.name}</span>
                                  <span className="label">새 클립북 만들기</span>
                                </button>
                              )}
                            </Fragment>
                          )}
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <div className="popup-footer__section">
                  <Button
                    label={'확인'}
                    cate={'default'}
                    size={'m'}
                    color={'primary'}
                    isLoading={isLoading}
                    disabled={!clipbookListPage.isActive}
                    onClick={() => activityAction()}
                  />
                  <Button
                    label={'취소'}
                    cate={'default'}
                    size={'m'}
                    color={'link-dark'}
                    disabled={isLoading}
                    onClick={() => setClipbookPopupAction(false, [])}
                  />
                </div>
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </Portal>
  )
}

export default ClipbookListPopup
