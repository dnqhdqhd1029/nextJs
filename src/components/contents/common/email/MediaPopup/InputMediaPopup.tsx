import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import InputMediaPopupFileContent from '~/components/contents/common/email/MediaPopup/InputMediaPopupFileContent'
import InputMediaPopupImgContent from '~/components/contents/common/email/MediaPopup/InputMediaPopupImgContent'
import { defaultMediaListTab } from '~/components/contents/distribution/Release/Press/defaultData'
import { useEmail } from '~/utils/hooks/contents/email/useEmail'

const InputMediaPopup = () => {
  const {
    inputMediaPopup,
    initInputMediaPopupPopup,
    emailPopup,
    actionInputMediaPopup,
    setSelectedInputMediaPopupAction,
  } = useEmail()

  const handleClose = () => initInputMediaPopupPopup(false)

  return (
    <>
      <Popup
        isOpen={inputMediaPopup.isOpen}
        onClose={handleClose}
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
              onClick={() => {
                actionInputMediaPopup(inputMediaPopup, emailPopup.filesList, 5)
              }}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={handleClose}
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
                    onClick={() => {
                      setSelectedInputMediaPopupAction(e.id, inputMediaPopup)
                    }}
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
