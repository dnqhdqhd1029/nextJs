import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Popup from '~/components/common/ui/Popup'
import { ACCEPT_IMAGE_EXT } from '~/constants/common'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'
const RegisterMediaPhotoPopup = () => {
  const {
    mediaIdKey,
    registerMediaPhotoPopup,
    setRegisterMediaPhotoPopupAction,
    onChangeMediaPhotoFiles,
    medialistPhotoPopupAdjust,
  } = usePressMediaListResult()
  const [isLoading, setIsLoading] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    await medialistPhotoPopupAdjust(registerMediaPhotoPopup, mediaIdKey)
    setIsLoading(() => false)
  }

  useEffect(() => {
    setIsLoading(() => false)
  }, [])
  return (
    <>
      <Popup
        isOpen={registerMediaPhotoPopup.isOpen}
        onClose={() => setRegisterMediaPhotoPopupAction({ isOpen: false, type: '', imageUrl: '', filesList: [] })}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        width={600}
        title={'개인 추가 미디어 사진 등록'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'등록'}
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
              onClick={() => setRegisterMediaPhotoPopupAction({ isOpen: false, type: '', imageUrl: '', filesList: [] })}
            />
          </div>
        }
      >
        <div className="popup-contents__section">
          <div className="file-uploader-thumb__section">
            <div className="file-uploader-thumb__area">
              {registerMediaPhotoPopup.imageUrl === '' ? (
                <div className="file-uploader-thumb__group">
                  <IcoAvatar
                    label={'' || ''}
                    icoData={icoSvgData.personFill}
                    size={'s112'}
                    icoSize={'s64'}
                  />
                </div>
              ) : (
                <div className="file-uploader-thumb__group">
                  <img
                    src={registerMediaPhotoPopup.imageUrl}
                    alt=""
                  />
                  <p></p>
                </div>
              )}
              <div className="file-uploader-thumb__button position-relative">
                <p className={cn('file-uploader-thumb__button-text')}>
                  {registerMediaPhotoPopup.imageUrl === '' ? '파일 선택' : '파일 변경'}
                </p>
                <input
                  type="file"
                  className="file-uploader-thumb__button-input"
                  onChangeCapture={e => onChangeMediaPhotoFiles(e, registerMediaPhotoPopup)}
                  accept={ACCEPT_IMAGE_EXT}
                  multiple={false}
                />
              </div>
            </div>
            <p className="font-body__regular">
              로고는 jpg, png, gif 파일로 최대 {5}
              {'MB'} 이내
            </p>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default RegisterMediaPhotoPopup
