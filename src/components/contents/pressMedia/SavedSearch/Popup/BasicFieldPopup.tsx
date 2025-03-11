import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import TagList from '~/components/common/ui/TagList'
import BasicFieldItem from '~/components/contents/pressMedia/SavedSearch/Popup/BasicFieldItem'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const BasicFieldPopup = () => {
  const {
    mediaFieldPopupList,
    basicFieldList,
    basicFieldPopup,
    pressSearchOptionParams,
    setSelectedTypeBasicFieldPopup,
    setDeleteSelectedTypeBasicFieldPopup,
    setBasicFieldPopupSelectedValue,
    setBasicFieldPopupDeleteTotalSelect,
    setFieldKeywordValueAction,
    setBasicFieldPopupAction,
    setBasicFieldPopupTotalSelect,
  } = useSavedSearch()
  const [isLoading, setIsLoading] = useState(false)
  const [isMaxGroupSelected, setIsMaxGroupSelected] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    await setFieldKeywordValueAction(basicFieldPopup.selectedType, pressSearchOptionParams.keywordParam)
    setIsLoading(() => false)
  }

  const calculateAmount = async () => {
    let res = false
    if (
      basicFieldPopup.selectedType &&
      basicFieldList &&
      basicFieldPopup.selectedType.length > 0 &&
      basicFieldList.length > 0
    ) {
      const selectedIdParams = basicFieldPopup.selectedType.map(e => e.label)
      const getIdParams = basicFieldList.map(e => e.name)
      const difference = selectedIdParams.filter(item => getIdParams.includes(item))
      if (difference) {
        res = difference.length >= getIdParams.length
      }
    }
    setIsMaxGroupSelected(() => res)
  }

  useEffect(() => {
    calculateAmount()
  }, [basicFieldList, basicFieldPopup.selectedType])
  return (
    <>
      <Popup
        isOpen={basicFieldPopup.isOpen}
        onClose={() => setBasicFieldPopupAction([], false, pressSearchOptionParams.keywordParam)}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'분야'}
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
              onClick={() => setBasicFieldPopupAction([], false, pressSearchOptionParams.keywordParam)}
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
                  {mediaFieldPopupList &&
                    mediaFieldPopupList.length > 0 &&
                    mediaFieldPopupList.map(e => (
                      <li key={'tree-menu__button_mediaFieldPopupList' + e}>
                        <button
                          className={`tree-menu__button ${
                            basicFieldPopup &&
                            basicFieldPopup.selectedValue &&
                            basicFieldPopup.selectedValue.toString() === e
                              ? 'is-selected'
                              : ''
                          }`}
                          onClick={() => setBasicFieldPopupSelectedValue(e, basicFieldPopup)}
                        >
                          <span className="tree-menu__button-text">{e}</span>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="tree-menu__group type2">
                <ul className="tree-menu__list">
                  {basicFieldList &&
                    basicFieldList.length > 0 &&
                    basicFieldList.map(e => (
                      <BasicFieldItem
                        key={'tree-menu__button-input_mediaFieldList' + e.name + e.count}
                        {...e}
                      />
                    ))}
                </ul>
                <div className="tree-menu-footer__group">
                  {isMaxGroupSelected ? (
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() => setBasicFieldPopupDeleteTotalSelect(basicFieldList, basicFieldPopup)}
                    >
                      전체 선택
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="tree-menu-footer__button"
                      onClick={() => setBasicFieldPopupTotalSelect(basicFieldList, basicFieldPopup)}
                    >
                      전체 선택
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <TagList
            tagItems={basicFieldPopup.selectedType}
            onTagItemClose={e => setSelectedTypeBasicFieldPopup(e, basicFieldPopup)}
            onAllTagItemClose={() => setDeleteSelectedTypeBasicFieldPopup(basicFieldPopup)}
          />
        </div>
      </Popup>
    </>
  )
}

export default BasicFieldPopup
