import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { defaultMediaListTab } from '~/components/contents/distribution/Release/Press/defaultData'
import InputMediaPopupFileContent from '~/components/contents/distribution/Release/Press/Popup/InputMediaPopupFileContent'
import InputMediaPopupImgContent from '~/components/contents/distribution/Release/Press/Popup/InputMediaPopupImgContent'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const InputMediaPopup = () => {
  const {
    inputMediaPopup,
    initInputMediaPopupPopup,
    contentPageData,
    actionInputMediaPopup,
    setSelectedInputMediaPopupAction,
  } = usePressRelese()

  return (
    <>
      <Popup
        isOpen={inputMediaPopup.isOpen}
        onClose={() => initInputMediaPopupPopup(false)}
        hasCloseButton
        width={1180}
        title={inputMediaPopup.title}
        height={'90vh'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={inputMediaPopup.confirmText}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => actionInputMediaPopup(inputMediaPopup, contentPageData.filesList, 5)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => initInputMediaPopupPopup(false)}
            />
          </div>
        }
      >
        <div className="tabs__section type1-medium">
          <div className="tabs-menu__group">
            <ul className="tabs-menu__list">
              {defaultMediaListTab.map(e => (
                <li
                  className={inputMediaPopup.radioSelected === e.id ? 'is-active' : ''}
                  key={'defaultMediaListTab_inputMediaPopup' + e.title + e.id}
                >
                  <button
                    type="button"
                    className="tabs-menu__btn"
                    onClick={() => setSelectedInputMediaPopupAction(e.id, inputMediaPopup)}
                  >
                    <span className="tabs-menu__name">{e.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="tabs-panel__section type-pt14">
            <div className="tabs-panel__group">
              {inputMediaPopup.radioSelected === 'FILE' ? (
                <InputMediaPopupFileContent />
              ) : (
                <InputMediaPopupImgContent />
              )}
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default InputMediaPopup
