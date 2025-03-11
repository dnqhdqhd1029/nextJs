import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import TagList from '~/components/common/ui/TagList'
import BasicLocationItem from '~/components/contents/pressMedia/PressSearch/Popup/BasicLocationPopup/BasicLocationItem'
import { usePressSearchOptions } from '~/utils/hooks/contents/pressMedia/usePressSearch'

const BasicLocationPopup = () => {
  const {
    locationList,
    basicLocationList,
    basicLocationPopup,
    pressSearchOption,
    setPressAreaAction,
    setBasicLocationPopupSelectedValue,
    setSelectedTypeBasicLocationPopup,
    setDeleteSelectedTypeBasicLocationPopup,
    setBasicLocationPopupDeleteTotalSelect,
    setBasicLocationPopupAction,
    setBasicLocationPopupTotalSelect,
  } = usePressSearchOptions()

  const [isLoading, setIsLoading] = useState(false)
  const [isMaxGroupSelected, setIsMaxGroupSelected] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    await setPressAreaAction(basicLocationPopup.selectedType, pressSearchOption.keywordParam)
    setIsLoading(() => false)
  }

  const calculateAmount = async () => {
    let res = false
    if (
      basicLocationPopup.selectedType &&
      basicLocationList &&
      basicLocationPopup.selectedType.length > 0 &&
      basicLocationList.length > 0
    ) {
      const selectedIdParams = basicLocationPopup.selectedType.map(e => e.label)
      const getIdParams = basicLocationList.map(e => e.name)
      const difference = selectedIdParams.filter(item => getIdParams.includes(item))
      if (difference) {
        res = difference.length >= getIdParams.length
      }
    }
    setIsMaxGroupSelected(() => res)
  }

  useEffect(() => {
    calculateAmount()
  }, [basicLocationList, basicLocationPopup.selectedType])

  return (
    <>
      <Popup
        isOpen={basicLocationPopup.isOpen}
        onClose={() => setBasicLocationPopupAction([], false, pressSearchOption.keywordParam)}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'지역'}
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
              onClick={() => setBasicLocationPopupAction([], false, pressSearchOption.keywordParam)}
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
                  {locationList &&
                    locationList.length > 0 &&
                    locationList.map(e => (
                      <li key={'tree-menu__button_mediaLocationPopup' + e}>
                        <button
                          className={`tree-menu__button ${
                            basicLocationPopup?.selectedValue?.toString() === e ? 'is-selected' : ''
                          }`}
                          onClick={() => setBasicLocationPopupSelectedValue(e, basicLocationPopup)}
                        >
                          <span className="tree-menu__button-text">{e}</span>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="tree-menu__group type2">
                <ul className="tree-menu__list">
                  {basicLocationList &&
                    basicLocationList.length > 0 &&
                    basicLocationList.map(e => (
                      <BasicLocationItem
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
                      onClick={() => setBasicLocationPopupDeleteTotalSelect(basicLocationList, basicLocationPopup)}
                    >
                      전체 선택
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() => setBasicLocationPopupTotalSelect(basicLocationList, basicLocationPopup)}
                    >
                      전체 선택
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <TagList
            tagItems={basicLocationPopup.selectedType}
            onTagItemClose={e => setSelectedTypeBasicLocationPopup(e, basicLocationPopup)}
            onAllTagItemClose={() => setDeleteSelectedTypeBasicLocationPopup(basicLocationPopup)}
          />
        </div>
      </Popup>
    </>
  )
}

export default BasicLocationPopup
