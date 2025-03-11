import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import MediaPopupImgContent from '~/components/contents/distribution/common/Popup/MediaPopupImgContent'
import { mediaPopupType } from '~/stores/modules/contents/email/email'

interface Props {
  mediaPopup: mediaPopupType
  closeMediaPopup: Function
  editorData: string
  contentPageData: Object
  actionMediaPopup: Function
  mediaUploadFile: Function
  setMediaPopupSizeAction: Function
  setMediaFileImagePopupAction: Function
  setEditorMediaFileCheckPopupAction: Function
  setEditorMediaImageCheckPopupAction: Function
  setDeleteMediaImagePopupAction: Function
}
const MediaPopup = (props: Props) => {
  const {
    mediaPopup,
    closeMediaPopup,
    editorData,
    contentPageData,
    actionMediaPopup,
    mediaUploadFile,
    setMediaPopupSizeAction,
    setMediaFileImagePopupAction,
    setEditorMediaFileCheckPopupAction,
    setEditorMediaImageCheckPopupAction,
    setDeleteMediaImagePopupAction,
  } = props

  const handleClose = () => {
    closeMediaPopup(false, editorData, contentPageData)
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
              onClick={() => actionMediaPopup(mediaPopup, editorData, contentPageData)}
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
              <MediaPopupImgContent
                mediaPopup={mediaPopup}
                mediaUploadFile={mediaUploadFile}
                setMediaPopupSizeAction={setMediaPopupSizeAction}
                setMediaFileImagePopupAction={setMediaFileImagePopupAction}
                setEditorMediaFileCheckPopupAction={setEditorMediaFileCheckPopupAction}
                setEditorMediaImageCheckPopupAction={setEditorMediaImageCheckPopupAction}
                setDeleteMediaImagePopupAction={setDeleteMediaImagePopupAction}
              />
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default MediaPopup
