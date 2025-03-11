import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Popup from '~/components/common/ui/Popup'
import { ACCEPT_IMAGE_EXT } from '~/constants/common'
import IcoAvatar from '~/publishing/components/common/ui/IcoAvatar'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'
const RegisterJournalistPhotoPopup = () => {
  const {
    journalIdKey,
    registerJournalPhotoPopup,
    setRegisterJournalPhotoPopupAction,
    onChangeJournalPhotoFiles,
    journalistPhotoPopupAdjust,
  } = usePressMediaListResult()
  const [isLoading, setIsLoading] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    await journalistPhotoPopupAdjust(registerJournalPhotoPopup, journalIdKey)
    setIsLoading(() => false)
  }

  useEffect(() => {
    setIsLoading(() => false)
  }, [])
  return (
    <>
      <Popup
        width={600}
        isOpen={registerJournalPhotoPopup.isOpen}
        onClose={() => setRegisterJournalPhotoPopupAction({ isOpen: false, type: '', imageUrl: '', filesList: [] })}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'개인 추가 언론인 사진 등록'}
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
              onClick={() =>
                setRegisterJournalPhotoPopupAction({ isOpen: false, type: '', imageUrl: '', filesList: [] })
              }
            />
          </div>
        }
      >
        <div className="popup-contents__section">
          <div className="file-uploader-thumb__section">
            <div className="file-uploader-thumb__area">
              {registerJournalPhotoPopup.imageUrl === '' ? (
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
                    src={registerJournalPhotoPopup.imageUrl}
                    alt=""
                  />
                  <p></p>
                </div>
              )}
              <div className="file-uploader-thumb__button position-relative">
                <p className={cn('file-uploader-thumb__button-text')}>
                  {registerJournalPhotoPopup.imageUrl === '' ? '파일 선택' : '파일 변경'}
                </p>
                <input
                  type="file"
                  className="file-uploader-thumb__button-input"
                  onChangeCapture={e => onChangeJournalPhotoFiles(e, registerJournalPhotoPopup)}
                  accept={ACCEPT_IMAGE_EXT}
                  multiple={false}
                />
              </div>
            </div>
            <p className="font-body__regular">
              사진은 jpg, png, gif 파일로 최대 {5}
              {'MB'} 이내
            </p>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default RegisterJournalistPhotoPopup
