import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import TagList from '~/components/common/ui/TagList'
import MediaTypeItem from '~/components/contents/monitoring/SearchResult/Popup/MediaTypeItem'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const MediaTypePopup = () => {
  const {
    mediaTypePopup,
    monitoringParams,
    mediaTypeList,
    mediaTypePopupList,
    setMediaTypePopupSelectedValue,
    setDeleteSelectedTypeMediaTypePopup,
    setMediaTypePopupDeleteTotalSelect,
    setSelectedTypeMediaTypePopup,
    mediaTypePopupAdjust,
    setMediaTypePopupAction,
    setMediaTypePopupTotalSelect,
  } = useMonitoringSearchResult()
  const [isLoading, setIsLoading] = useState(false)
  const [isMaxGroupSelected, setIsMaxGroupSelected] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    await mediaTypePopupAdjust(mediaTypePopup.selectedType, monitoringParams)
    setIsLoading(() => false)
  }

  const calculateAmount = async () => {
    let res = false
    if (
      mediaTypePopup.selectedType &&
      mediaTypePopupList &&
      mediaTypePopup.selectedType.length > 0 &&
      mediaTypePopupList.length > 0
    ) {
      const selectedIdParams = mediaTypePopup.selectedType.map(e => e.label)
      const getIdParams = mediaTypePopupList.map(e => e.name)
      const difference = selectedIdParams.filter(item => getIdParams.includes(item))
      if (difference) {
        res = difference.length >= getIdParams.length
      }
    }
    setIsMaxGroupSelected(() => res)
  }

  useEffect(() => {
    calculateAmount()
  }, [mediaTypePopupList, mediaTypePopup.selectedType])

  return (
    <>
      <Popup
        isOpen={mediaTypePopup.isOpen}
        onClose={() => setMediaTypePopupAction([], false, monitoringParams)}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'매체 유형'}
        width={800}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => actionButton()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              disabled={isLoading}
              color={'link-dark'}
              onClick={() => setMediaTypePopupAction([], false, monitoringParams)}
            />
          </div>
        }
      >
        <div className="popup-contents__section">
          <div
            className="tree-menu__section"
            style={{ marginBottom: 20 }}
          >
            <div className="tree-menu__area">
              <div className="tree-menu__group type1">
                <ul className="tree-menu__list">
                  {mediaTypeList &&
                    mediaTypeList.length > 0 &&
                    mediaTypeList.map(e => {
                      if (e.id !== '') {
                        return (
                          <li key={'tree-menu__button_MediaTypePopup' + e.id}>
                            <button
                              className={`tree-menu__button ${
                                mediaTypePopup.selectedValue === e.id ? 'is-selected' : ''
                              }`}
                              onClick={() => setMediaTypePopupSelectedValue(e.id, mediaTypePopup)}
                            >
                              <span className="tree-menu__button-text">{e.name}</span>
                            </button>
                          </li>
                        )
                      }
                    })}
                </ul>
              </div>
              <div className="tree-menu__group type2">
                <ul className="tree-menu__list">
                  {mediaTypePopupList &&
                    mediaTypePopupList.length > 0 &&
                    mediaTypePopupList.map(e => (
                      <MediaTypeItem
                        key={'tree-menu__button-input_mediaTypePopupList' + e.commonCodeId + e.parentId}
                        {...e}
                      />
                    ))}
                </ul>
                <div className="tree-menu-footer__group">
                  {isMaxGroupSelected ? (
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() => setMediaTypePopupDeleteTotalSelect(mediaTypePopupList, mediaTypePopup)}
                    >
                      전체 선택
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() => setMediaTypePopupTotalSelect(mediaTypePopupList, mediaTypePopup)}
                    >
                      전체 선택
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <TagList
            tagItems={mediaTypePopup.selectedType}
            onTagItemClose={e => setSelectedTypeMediaTypePopup(e, mediaTypePopup)}
            onAllTagItemClose={() => setDeleteSelectedTypeMediaTypePopup(mediaTypePopup)}
          />
        </div>
      </Popup>
    </>
  )
}

export default MediaTypePopup
