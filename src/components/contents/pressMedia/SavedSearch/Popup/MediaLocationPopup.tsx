import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputBtn from '~/components/common/ui/FormInputBtn'
import Popup from '~/components/common/ui/Popup'
import TagList from '~/components/common/ui/TagList'
import MediaLocationItem from '~/components/contents/pressMedia/SavedSearch/Popup/MediaLocationItem'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const MediaLocationPopup = () => {
  const {
    listDefine,
    mediaLocationPopup,
    pressSearchOptionParams,
    mediaSearchOptionParams,
    mediaLocationList,
    mediaLocationPopupList,
    setMediaLocationPopupDeleteTotalSelect,
    setMediaLocationPopupSelectedValue,
    setDeleteSelectedTypeMediaLocationPopup,
    setSelectedTypeMediaLocationPopup,
    mediaLocationPopupAdjustAdditionalParam,
    mediaLocationPopupAdjustMediaSearch,
    setMediaLocationPopupTotalSelect,
    setMediaLocationPopupAction,
  } = useSavedSearch()
  const [isLoading, setIsLoading] = useState(false)
  const [isMaxGroupSelected, setIsMaxGroupSelected] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    if (listDefine === 'press') {
      await mediaLocationPopupAdjustAdditionalParam(
        mediaLocationPopup.selectedType,
        pressSearchOptionParams.additionalParam
      )
    } else {
      await mediaLocationPopupAdjustMediaSearch(mediaLocationPopup.selectedType, mediaSearchOptionParams.keywordParam)
    }
    setIsLoading(() => false)
  }

  const calculateAmount = async () => {
    let res = false
    if (
      mediaLocationPopup.selectedType &&
      mediaLocationList &&
      mediaLocationPopup.selectedType.length > 0 &&
      mediaLocationList.length > 0
    ) {
      const selectedIdParams = mediaLocationPopup.selectedType.map(e => e.label)
      const getIdParams = mediaLocationList.map(e => e.name)
      const difference = selectedIdParams.filter(item => getIdParams.includes(item))
      if (difference) {
        res = difference.length >= getIdParams.length
      }
    }
    setIsMaxGroupSelected(() => res)
  }

  useEffect(() => {
    calculateAmount()
  }, [mediaLocationList, mediaLocationPopup.selectedType])

  return (
    <>
      <Popup
        isOpen={mediaLocationPopup.isOpen}
        onClose={() => setMediaLocationPopupAction([], false, [])}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'매체 지역'}
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
              onClick={() => setMediaLocationPopupAction([], false, [])}
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
                  {mediaLocationPopupList &&
                    mediaLocationPopupList.length > 0 &&
                    mediaLocationPopupList.map(e => (
                      <li key={'tree-menu__button_mediaLocationPopup' + e}>
                        <button
                          className={`tree-menu__button ${
                            mediaLocationPopup.selectedValue.toString() === e ? 'is-selected' : ''
                          }`}
                          onClick={() => setMediaLocationPopupSelectedValue(e, mediaLocationPopup)}
                        >
                          <span className="tree-menu__button-text">{e}</span>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="tree-menu__group type2">
                <ul className="tree-menu__list">
                  {mediaLocationList &&
                    mediaLocationList.length > 0 &&
                    mediaLocationList.map(e => (
                      <MediaLocationItem
                        key={'tree-menu__button-input_mediaTypePopupList' + e.name + e.count}
                        {...e}
                      />
                    ))}
                </ul>
                <div className="tree-menu-footer__group">
                  {isMaxGroupSelected ? (
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() => setMediaLocationPopupDeleteTotalSelect(mediaLocationList, mediaLocationPopup)}
                    >
                      전체 선택
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() => setMediaLocationPopupTotalSelect(mediaLocationList, mediaLocationPopup)}
                    >
                      전체 선택
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <TagList
            tagItems={mediaLocationPopup.selectedType}
            onTagItemClose={e => setSelectedTypeMediaLocationPopup(e, mediaLocationPopup)}
            onAllTagItemClose={() => setDeleteSelectedTypeMediaLocationPopup(mediaLocationPopup)}
          />
        </div>
      </Popup>
    </>
  )
}

export default MediaLocationPopup
