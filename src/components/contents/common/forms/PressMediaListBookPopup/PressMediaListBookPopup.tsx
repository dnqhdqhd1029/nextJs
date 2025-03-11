import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import Backdrop from '~/components/common/ui/Backdrop'
import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Portal from '~/components/common/utils/Portal'
import MediaListBookItem from '~/components/contents/common/forms/PressMediaListBookPopup/MediaListBookItem'
import MediaListBookItemTypeAny from '~/components/contents/common/forms/PressMediaListBookPopup/MediaListBookItemTypeAny'
import PressListBookItem from '~/components/contents/common/forms/PressMediaListBookPopup/PressListBookItem'
import PressListBookItemTypeAny from '~/components/contents/common/forms/PressMediaListBookPopup/PressListBookItemTypeAny'
import { searchRegisterListProps } from '~/stores/modules/contents/pressMedia/pressMediaListBookPopup'
import useDebounce from '~/utils/hooks/common/useDebounce'
import { usePressMediaListBook } from '~/utils/hooks/contents/pressMedia/usePressMediaListBook'

interface Props {
  onChangeInitAction: (e: number[], k: searchRegisterListProps[]) => void
}

const PressMediaListBookPopup = (props: Props) => {
  const {
    searchRegisterListPopup,
    userPressListAutoSaveData,
    searchRegisterList,
    userMediaListAutoSaveData,
    setSearchRegisterPopupNameAction,
    setPressListData,
    setMediaListData,
    setClosePresMediaAction,
    createRegisterMediaListAction,
    createRegisterPressListAction,
    handleDataInputSearchRegisterListPopup,
  } = usePressMediaListBook()
  const debouncedUpdateState = useDebounce(searchRegisterListPopup.name, 500)
  const getOpenRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const createListAction = async () => {
    setIsLoading(() => true)
    if (searchRegisterListPopup.kind === 'media') {
      await createRegisterMediaListAction(searchRegisterListPopup)
    } else {
      await createRegisterPressListAction(searchRegisterListPopup)
    }
    setIsLoading(() => false)
  }
  const activityAction = async () => {
    setIsLoading(() => true)
    let res = null
    if (searchRegisterListPopup.kind === 'media') {
      res = await setMediaListData(searchRegisterListPopup, userMediaListAutoSaveData, searchRegisterList)
    } else {
      res = await setPressListData(searchRegisterListPopup, userPressListAutoSaveData, searchRegisterList)
    }
    if (res && res.resultCode === 'init') {
      props.onChangeInitAction(res.deleteItem, res.resultSearchRegisterListProps)
    } else {
      setIsLoading(() => false)
    }
  }

  const filteredContentList = useMemo(() => {
    return searchRegisterList.filter(e => e.title === searchRegisterListPopup.name)
  }, [searchRegisterList, searchRegisterListPopup.name])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) setClosePresMediaAction()
    },
    [getOpenRef]
  )

  useEffect(() => {
    if (searchRegisterListPopup.name !== '') {
      handleDataInputSearchRegisterListPopup(searchRegisterListPopup)
    }
  }, [debouncedUpdateState])

  useEffect(() => {
    if (searchRegisterListPopup.isOpen) {
      handleDataInputSearchRegisterListPopup(searchRegisterListPopup)
      setIsLoading(() => false)
    }
  }, [searchRegisterListPopup.isOpen])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <Portal>
      <AnimatePresence>
        {searchRegisterListPopup.isOpen && (
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
        {searchRegisterListPopup.isOpen && (
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
                  <h2 className="popup-header__title">리스트 수정</h2>
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
                      onClick={() => setClosePresMediaAction()}
                    />
                  </div>
                </div>
                <div className="popup-contents__section">
                  <div className="popup-type-list__section">
                    <div className="popup-type-list__search">
                      <FormInputSearch
                        placeholder={'검색 또는 새 목록 만들기'}
                        onChange={e => setSearchRegisterPopupNameAction(e.target.value, searchRegisterListPopup)}
                        maxLength={100}
                        value={searchRegisterListPopup.name}
                        failed={searchRegisterListPopup.nameErr !== ''}
                        msg={searchRegisterListPopup.nameErr}
                      />
                    </div>
                    <div className="popup-type-list__group">
                      {searchRegisterList && searchRegisterList.length > 0 ? (
                        <ul className="popup-type-list__checkbox">
                          {searchRegisterList.map(e => {
                            if (searchRegisterListPopup.type !== 'any') {
                              if (searchRegisterListPopup.kind === 'media') {
                                return (
                                  <MediaListBookItem
                                    key={`searchRegisterList-simple-item-${e.mediaListId}`}
                                    {...e}
                                  />
                                )
                              } else {
                                return (
                                  <PressListBookItem
                                    key={`searchRegisterList-simple-item-${e.jrnlstListId}`}
                                    {...e}
                                  />
                                )
                              }
                            } else {
                              if (searchRegisterListPopup.kind === 'media') {
                                return (
                                  <MediaListBookItemTypeAny
                                    key={`searchRegisterList-simple-item-${e.mediaListId}`}
                                    {...e}
                                  />
                                )
                              } else {
                                return (
                                  <PressListBookItemTypeAny
                                    key={`searchRegisterList-simple-item-${e.jrnlstListId}`}
                                    {...e}
                                  />
                                )
                              }
                            }
                          })}
                        </ul>
                      ) : (
                        <div className="popup-type-list__nodata">
                          <p className="popup-type-list__nodata-text">찾는 목록이 없습니다.</p>
                        </div>
                      )}
                      {searchRegisterListPopup.name !== '' && (
                        <Fragment>
                          {filteredContentList.length === 1 ? (
                            <Fragment>
                              {filteredContentList[0].title !== searchRegisterListPopup.name && (
                                <button
                                  type="button"
                                  className="popup-type-list__nodata-button"
                                  onClick={() => createListAction()}
                                >
                                  <span className="label keyword">{searchRegisterListPopup.name}</span>
                                  <span className="label">새 목록 만들기</span>
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
                                  <span className="label keyword">{searchRegisterListPopup.name}</span>
                                  <span className="label">새 목록 만들기</span>
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
                    disabled={!searchRegisterListPopup.isActive}
                    onClick={() => activityAction()}
                  />
                  <Button
                    label={'취소'}
                    cate={'default'}
                    size={'m'}
                    color={'link-dark'}
                    disabled={isLoading}
                    onClick={() => setClosePresMediaAction()}
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

export default PressMediaListBookPopup
