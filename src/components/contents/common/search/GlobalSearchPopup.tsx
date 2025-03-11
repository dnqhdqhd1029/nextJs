import { Fragment, useEffect } from 'react'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

import Backdrop from '~/components/common/ui/Backdrop'
import Button from '~/components/common/ui/Button'
import GlobalFormInputSearch from '~/components/common/ui/GlobalFormInputSearch'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Portal from '~/components/common/utils/Portal'
import JournalItem from '~/components/contents/common/search/JournalItem'
import ListLoader from '~/components/contents/common/search/ListLoading'
import MediaItem from '~/components/contents/common/search/MediaItem'
import useDebounce from '~/utils/hooks/common/useDebounce'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { useGlobalSearch } from '~/utils/hooks/contents/globalSearch/useGlobalSearch'

const GloablSearchPopup = () => {
  const { getInputRef } = useValidate()
  const {
    journalLoading,
    mediaLoading,
    globalSeaarchPopup,
    searchInputRef,
    setIsOpenGloablSearchPopup,
    setKeywordGloablSearchPopup,
    setInitKeywordGloablSearchPopup,
    moveToJournalSearchOption,
    moveToMediaSearchOption,
    moveToMediaKeywordSearchOption,
    moveToJournalKeywordSearchOption,
    getJournalistSearchData,
    getMediaSearchData,
  } = useGlobalSearch()
  const debouncedUpdateState = useDebounce(globalSeaarchPopup.keyword, 500)

  useEffect(() => {
    if (globalSeaarchPopup.keyword !== '') {
      getJournalistSearchData(globalSeaarchPopup.keyword)
      getMediaSearchData(globalSeaarchPopup.keyword)
    }
  }, [debouncedUpdateState])

  useEffect(() => {
    if (globalSeaarchPopup.isOpen) {
      searchInputRef?.current?.focus()
    }
  }, [globalSeaarchPopup.isOpen])

  return (
    <Portal>
      <AnimatePresence>
        {globalSeaarchPopup.isOpen && (
          <motion.div
            className={cn('mb-backdrop-container')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'easeOut', duration: 0.12 }}
          >
            <Backdrop
              backdropClose={true}
              onClose={() => setIsOpenGloablSearchPopup(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn('header-search-result__container', { 'display-none': !globalSeaarchPopup.isOpen })}
        style={{
          width: '960px',
        }}
      >
        <div className="header-search-result__section">
          <div className="header-search-result__input">
            <GlobalFormInputSearch
              placeholder="이름, 매체, 이메일"
              getInputRef={ref => getInputRef(ref, searchInputRef)}
              onKeyUp={e => setKeywordGloablSearchPopup(e, globalSeaarchPopup)}
              value={globalSeaarchPopup.keyword}
              onDeleteButtonClick={() => setInitKeywordGloablSearchPopup(globalSeaarchPopup)}
            />
            <div className="header-search-result__input-close">
              <Button
                label={'닫기'}
                cate={'ico-only'}
                size={'s32'}
                color={'secondary'}
                icoLeft={true}
                icoLeftData={icoSvgData.iconCloseButton}
                icoSize={16}
                onClick={() => setIsOpenGloablSearchPopup(false)}
              />
            </div>
          </div>
          <div className="header-search-result__area">
            <div
              className="header-search-result__group position-relative"
              style={{ width: '50%' }}
            >
              <h6 className="header-search-result__title">언론인</h6>
              <div
                className="position-relative overflow-hidden"
                style={{
                  minHeight: '200px',
                  height: journalLoading || globalSeaarchPopup.keyword.length < 2 ? '200px' : 'auto',
                }}
              >
                {globalSeaarchPopup.keyword.length < 2 ? (
                  <div className="header-search-result__button-container">
                    {/* <Button
                      label={'언론인 상세 검색'}
                      cate={'default'}
                      size={'m'}
                      color={'link-dark'}
                      onClick={() => moveToJournalSearchOption()}
                    /> */}
                    <Button
                      label={'언론인 상세 검색'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                      className="width__auto"
                      onClick={() => moveToJournalSearchOption()}
                    />
                  </div>
                ) : (
                  <Fragment>
                    {journalLoading ? (
                      <ListLoader />
                    ) : (
                      <Fragment>
                        {globalSeaarchPopup.journalistResultList &&
                        globalSeaarchPopup.journalistResultList.length > 0 ? (
                          <Fragment>
                            <ul className="header-search-result__list">
                              {globalSeaarchPopup.journalistResultList.slice(0, 8).map(e => (
                                <JournalItem
                                  key={`simple-search-journalist-${e.journalistId}`}
                                  {...e}
                                />
                              ))}
                            </ul>
                            <div className="header-search-result__btn">
                              <Button
                                label={'전체 언론인 검색'}
                                cate={'default'}
                                size={'m'}
                                color={'tertiary'}
                                onClick={() => moveToJournalKeywordSearchOption(globalSeaarchPopup.keyword)}
                              />
                            </div>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <p
                              className="select-search-option__none"
                              style={{ minHeight: '145px' }}
                            >
                              검색 결과가 없습니다.
                            </p>
                            <div className="select-search-option__btn">
                              <Button
                                elem="button"
                                label={`'${globalSeaarchPopup.keyword}' 언론인에 추가`}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                                className="width__auto"
                              />
                            </div>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
            <div
              className="header-search-result__group position-relative"
              style={{ width: '50%' }}
            >
              <h6 className="header-search-result__title">매체</h6>
              <div
                className="position-relative overflow-hidden"
                style={{
                  minHeight: '200px',
                  height: mediaLoading || globalSeaarchPopup.keyword.length < 2 ? '200px' : 'auto',
                }}
              >
                {globalSeaarchPopup.keyword.length < 2 ? (
                  <div className="header-search-result__button-container">
                    {/* <Button
                      label={'매체 상세 검색'}
                      cate={'default'}
                      size={'m'}
                      color={'link-dark'}
                      onClick={() => moveToMediaSearchOption()}
                    /> */}
                    <Button
                      label={'매체 상세 검색'}
                      cate={'link-text'}
                      size={'m'}
                      color={'body-link'}
                      className="width__auto"
                      onClick={() => moveToMediaSearchOption()}
                    />
                  </div>
                ) : (
                  <Fragment>
                    {mediaLoading ? (
                      <ListLoader />
                    ) : (
                      <Fragment>
                        {globalSeaarchPopup.mediaResultList && globalSeaarchPopup.mediaResultList.length > 0 ? (
                          <Fragment>
                            <ul className="header-search-result__list">
                              {globalSeaarchPopup.mediaResultList.slice(0, 8).map(e => (
                                <MediaItem
                                  key={`simple-search-media-${e.mediaId}`}
                                  {...e}
                                />
                              ))}
                            </ul>
                            <div className="header-search-result__btn">
                              <Button
                                label={'전체 매체 검색'}
                                cate={'default'}
                                size={'m'}
                                color={'tertiary'}
                                onClick={() => moveToMediaKeywordSearchOption(globalSeaarchPopup.keyword)}
                              />
                            </div>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <p
                              className="select-search-option__none"
                              style={{ minHeight: '145px' }}
                            >
                              검색 결과가 없습니다.
                            </p>
                            <div className="select-search-option__btn">
                              <Button
                                elem="button"
                                label={`'${globalSeaarchPopup.keyword}' 매체에 추가`}
                                cate={'link-text'}
                                size={'m'}
                                color={'body-link'}
                                className="width__auto"
                              />
                            </div>
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default GloablSearchPopup
