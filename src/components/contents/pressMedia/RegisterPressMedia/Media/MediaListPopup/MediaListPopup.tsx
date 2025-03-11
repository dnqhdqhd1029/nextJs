import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import Backdrop from '~/components/common/ui/Backdrop'
import Button from '~/components/common/ui/Button'
import FormInputSearch from '~/components/common/ui/FormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Portal from '~/components/common/utils/Portal'
import ContentItem from '~/components/contents/pressMedia/RegisterPressMedia/Media/MediaListPopup/ContentItem'
import useDebounce from '~/utils/hooks/common/useDebounce'
import { useRegisterPressMedia } from '~/utils/hooks/contents/pressMedia/useRegisterPressMedia'

const MediaListPopup = () => {
  const {
    categoryData,
    mediaListPopupPage,
    mediaExcelParams,
    mediaPersonalParams,
    setMediaListPopupNameAction,
    mediaListContentList,
    setMediaListPopupAction,
    setMediaListData,
    handleCreateMediabook,
    handleDataInputSearchRegisterListPopup,
  } = useRegisterPressMedia()
  const debouncedUpdateState = useDebounce(mediaListPopupPage.name, 500)
  const getOpenRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const createListAction = async () => {
    setIsLoading(() => true)
    await handleCreateMediabook(mediaListPopupPage)
    setIsLoading(() => false)
  }

  const activityAction = async () => {
    setIsLoading(() => true)
    await setMediaListData(mediaListPopupPage.mediaIdList, categoryData, mediaPersonalParams, mediaExcelParams)
    setIsLoading(() => false)
  }

  const filteredContentList = useMemo(() => {
    return mediaListContentList.filter(e => e.title === mediaListPopupPage.name)
  }, [mediaListContentList, mediaListPopupPage.name])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (getOpenRef.current && !getOpenRef.current.contains(e.target as Node)) {
        setMediaListPopupAction(
          false,
          categoryData.nextStep === 'excel' ? mediaExcelParams.mediaBookLists : mediaPersonalParams.mediaBookLists
        )
      }
    },
    [getOpenRef]
  )

  useEffect(() => {
    if (mediaListPopupPage.name !== '') {
      handleDataInputSearchRegisterListPopup(mediaListPopupPage.name, 'media')
    }
  }, [debouncedUpdateState])

  useEffect(() => {
    window.addEventListener('mousedown', e => handleClick(e))
    return () => window.removeEventListener('mousedown', e => handleClick(e))
  }, [])

  return (
    <Portal>
      <AnimatePresence>
        {mediaListPopupPage.isOpen && (
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
        {mediaListPopupPage.isOpen && (
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
                  <h2 className="popup-header__title">리스트에 추가</h2>
                  <div className="popup-header__close">
                    <Button
                      label={'닫기'}
                      cate={'ico-only'}
                      size={'s32'}
                      color={'secondary'}
                      icoLeft={true}
                      icoLeftData={icoSvgData.iconCloseButton}
                      icoSize={16}
                      isLoading={isLoading}
                      onClick={() =>
                        setMediaListPopupAction(
                          false,
                          categoryData.nextStep === 'excel'
                            ? mediaExcelParams.mediaBookLists
                            : mediaPersonalParams.mediaBookLists
                        )
                      }
                    />
                  </div>
                </div>
                <div className="popup-contents__section">
                  <div className="popup-type-list__section">
                    <div className="popup-type-list__search">
                      <FormInputSearch
                        placeholder={'검색 또는 새 목록 만들기'}
                        onChange={e => setMediaListPopupNameAction(e.target.value, mediaListPopupPage)}
                        maxLength={100}
                        value={mediaListPopupPage.name}
                        failed={mediaListPopupPage.nameErr !== ''}
                        msg={mediaListPopupPage.nameErr}
                      />
                    </div>
                    <div className="popup-type-list__group">
                      {mediaListContentList && mediaListContentList.length > 0 ? (
                        <ul className="popup-type-list__checkbox">
                          {mediaListContentList.map(e => (
                            <ContentItem
                              key={`mediaList-simple-item-${e.jrnlstListId}-${e.title}`}
                              {...e}
                            />
                          ))}
                        </ul>
                      ) : (
                        <div className="popup-type-list__nodata">
                          <p className="popup-type-list__nodata-text">찾는 목록이 없습니다.</p>
                        </div>
                      )}
                      {mediaListPopupPage.name !== '' && (
                        <Fragment>
                          {filteredContentList.length === 1 ? (
                            <Fragment>
                              {filteredContentList[0].title !== mediaListPopupPage.name && (
                                <button
                                  type="button"
                                  className="popup-type-list__nodata-button"
                                  onClick={() => createListAction()}
                                >
                                  <span className="label keyword">{mediaListPopupPage.name}</span>
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
                                  <span className="label keyword">{mediaListPopupPage.name}</span>
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
                    disabled={!mediaListPopupPage.isActive}
                    onClick={() => activityAction()}
                  />
                  <Button
                    label={'취소'}
                    cate={'default'}
                    size={'m'}
                    color={'link-dark'}
                    disabled={isLoading}
                    onClick={() =>
                      setMediaListPopupAction(
                        false,
                        categoryData.nextStep === 'excel'
                          ? mediaExcelParams.mediaBookLists
                          : mediaPersonalParams.mediaBookLists
                      )
                    }
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

export default MediaListPopup
