import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import TagList from '~/components/common/ui/TagList'
import MediaTypeItem from '~/components/contents/monitoring/MonitoringPopup/Popup/MediaTypeItem'
import { useMonitoringPopup } from '~/utils/hooks/contents/monitoring/useMonitoringPopup'

const SearchOptionMediaTypePopup = () => {
  const {
    monitoringSearchPopup,
    setMediaTypePopupSelectedValue,
    setMediaTypePopupDeleteTotalSelect,
    setDeleteSelectedTypeMediaTypePopup,
    setSelectedTypeMediaTypePopup,
    mediaTypePopupAdjust,
    setMediaTypePopupTotalSelect,
    setMediaTypePopupAction,
  } = useMonitoringPopup()
  const [isLoading, setIsLoading] = useState(false)
  const [isMaxGroupSelected, setIsMaxGroupSelected] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    await mediaTypePopupAdjust(monitoringSearchPopup.mediaTypePopup.selectedType, monitoringSearchPopup.additionalParam)
    setIsLoading(() => false)
  }

  const calculateAmount = async () => {
    let res = false
    if (
      monitoringSearchPopup.mediaTypePopup.selectedType &&
      monitoringSearchPopup.mediaTypePopupList &&
      monitoringSearchPopup.mediaTypePopup.selectedType.length > 0 &&
      monitoringSearchPopup.mediaTypePopupList.length > 0
    ) {
      const selectedIdParams = monitoringSearchPopup.mediaTypePopup.selectedType.map(e => e.label)
      const getIdParams = monitoringSearchPopup.mediaTypePopupList.map(e => e.name)
      const difference = selectedIdParams.filter(item => getIdParams.includes(item))
      if (difference) {
        res = difference.length >= getIdParams.length
      }
    }
    setIsMaxGroupSelected(() => res)
  }

  useEffect(() => {
    calculateAmount()
  }, [monitoringSearchPopup.mediaTypePopupList, monitoringSearchPopup.mediaTypePopup.selectedType])

  return (
    <>
      <Popup
        isOpen={monitoringSearchPopup.mediaTypePopup.isOpen}
        onClose={() => setMediaTypePopupAction([], false, monitoringSearchPopup.additionalParam)}
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
              onClick={() => setMediaTypePopupAction([], false, monitoringSearchPopup.additionalParam)}
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
                  {monitoringSearchPopup.mediaTypeList &&
                    monitoringSearchPopup.mediaTypeList.length > 0 &&
                    monitoringSearchPopup.mediaTypeList.map(e => {
                      if (e.id !== '') {
                        return (
                          <li key={'tree-menu__button_MediaTypePopup' + e.id}>
                            <button
                              className={`tree-menu__button ${
                                monitoringSearchPopup.mediaTypePopup.selectedValue === e.id ? 'is-selected' : ''
                              }`}
                              onClick={() => setMediaTypePopupSelectedValue(e.id, monitoringSearchPopup.mediaTypePopup)}
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
                  {monitoringSearchPopup.mediaTypePopupList &&
                    monitoringSearchPopup.mediaTypePopupList.length > 0 &&
                    monitoringSearchPopup.mediaTypePopupList.map(e => (
                      <MediaTypeItem
                        key={'tree-menu__button-input_popup_mediaTypePopupList' + e.commonCodeId + e.parentId}
                        {...e}
                      />
                    ))}
                </ul>
                <div className="tree-menu-footer__group">
                  {isMaxGroupSelected ? (
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() =>
                        setMediaTypePopupDeleteTotalSelect(
                          monitoringSearchPopup.mediaTypePopupList,
                          monitoringSearchPopup.mediaTypePopup
                        )
                      }
                    >
                      전체 선택
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() =>
                        setMediaTypePopupTotalSelect(
                          monitoringSearchPopup.mediaTypePopupList,
                          monitoringSearchPopup.mediaTypePopup
                        )
                      }
                    >
                      전체 선택
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <TagList
            tagItems={monitoringSearchPopup.mediaTypePopup.selectedType}
            onTagItemClose={e => setSelectedTypeMediaTypePopup(e, monitoringSearchPopup.mediaTypePopup)}
            onAllTagItemClose={() => setDeleteSelectedTypeMediaTypePopup(monitoringSearchPopup.mediaTypePopup)}
          />
        </div>
      </Popup>
    </>
  )
}

export default SearchOptionMediaTypePopup
