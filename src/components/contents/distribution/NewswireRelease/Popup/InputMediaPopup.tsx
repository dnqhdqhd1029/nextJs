import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { defaultMediaListTab } from '~/components/contents/distribution/NewswireRelease/defaultData'
import InputMediaPopupFileContent from '~/components/contents/distribution/NewswireRelease/Popup/InputMediaPopupFileContent'
import InputMediaPopupImgContent from '~/components/contents/distribution/NewswireRelease/Popup/InputMediaPopupImgContent'
import { openToast } from '~/utils/common/toast'
import { useAppSelector } from '~/utils/hooks/common/useRedux'
import { useNewswireRelease } from '~/utils/hooks/contents/newswireRelease/useNewswireRelease'

const InputMediaPopup = () => {
  const {
    initInputMediaPopupPopup,
    contentPageData,
    setSelectedInputMediaPopupAction,
    contentPageDataAddMediaFileListOnChange,
  } = useNewswireRelease()

  const { inputMediaPopup } = useAppSelector(state => state.newswireReleaseSlice)
  const mediaListTab = defaultMediaListTab.find(e => e.id === 'IMG')
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
              onClick={() => {
                if (contentPageData.filesList.length > 2) {
                  openToast('이미지는 최대 3개만 등록할 수 있습니다.', 'error')
                  return
                }
                let fileTypeErr = false
                let imageSizeErr = false
                let ImageVolumeErr = false
                inputMediaPopup.releaseImageItems &&
                  inputMediaPopup.releaseImageItems.forEach(file => {
                    const { mimeType, width, height, size } = file
                    if (width === undefined || height === undefined || size === undefined) {
                      return
                    }
                    if (
                      mimeType !== 'image/jpeg' &&
                      mimeType !== 'image/png' &&
                      mimeType !== 'image/gif' &&
                      mimeType !== 'image/x-icon'
                    ) {
                      fileTypeErr = true
                    }
                    if (width < 300 || height < 200) {
                      imageSizeErr = true
                    }
                    if (size * 1024 < 0.1 * 1024 * 1024 || size * 1024 > 3 * 1024 * 1024) {
                      ImageVolumeErr = true
                    }
                  })
                if (fileTypeErr) {
                  openToast('이미지 파일만 업로드 가능합니다.', 'error')
                  return
                } else if (imageSizeErr) {
                  openToast('이미지는 가로 300px 세로 200px 이상이어야 합니다.', 'error')
                  return
                } else if (ImageVolumeErr) {
                  openToast('0.1MB 초과 3MB 이하의 이미지만 업로드 가능합니다.', 'error')
                  return
                }
                contentPageDataAddMediaFileListOnChange(inputMediaPopup.releaseImageItems, contentPageData)
                initInputMediaPopupPopup(false)
              }}
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
              <li
                className={inputMediaPopup.radioSelected === mediaListTab?.id ? 'is-active' : ''}
                key={'defaultMediaListTab_inputMediaPopup' + mediaListTab?.title + mediaListTab?.id}
              >
                <button
                  type="button"
                  className="tabs-menu__btn"
                  onClick={() => setSelectedInputMediaPopupAction(mediaListTab?.id || '', inputMediaPopup)}
                >
                  <span className="tabs-menu__name">{mediaListTab?.title}</span>
                </button>
              </li>
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
