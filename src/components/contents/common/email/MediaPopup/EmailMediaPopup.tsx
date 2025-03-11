import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import EmailMediaPopupImgContent from '~/components/contents/common/email/MediaPopup/EmailMediaPopupImgContent'
import { useEmail } from '~/utils/hooks/contents/email/useEmail'

const EmailMediaPopup = () => {
  const { mediaPopup, initMediaPopup, editorData, emailPopup, actionMediaPopup } = useEmail()

  const handleClose = () => {
    actionMediaPopup({ ...mediaPopup, imageItems: [] }, editorData, emailPopup)
  }

  return (
    <>
      <Popup
        isOpen={mediaPopup.isOpen}
        onClose={handleClose}
        hasCloseButton
        width={1180}
        title={mediaPopup.title}
        height={'90vh'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={mediaPopup.confirmText}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => actionMediaPopup(mediaPopup, editorData, emailPopup)}
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
              <li className={'is-active'}>
                <button
                  type="button"
                  className="tabs-menu__btn"
                >
                  <span className="tabs-menu__name">이미지</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="tabs-panel__section type-pt14">
            <div className="tabs-panel__group">
              <EmailMediaPopupImgContent />
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default EmailMediaPopup
