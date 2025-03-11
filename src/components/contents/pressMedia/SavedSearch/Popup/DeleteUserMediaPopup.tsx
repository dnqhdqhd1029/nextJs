import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'
const DeleteUserMediaPopup = () => {
  const { duplicationMediaPopup, setDuplicationMediaPopupAction, deleteDuplicationMedia } = useSavedSearch()
  const [isLoading, setIsLoading] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    await deleteDuplicationMedia(duplicationMediaPopup)
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        isOpen={duplicationMediaPopup.isOpen}
        onClose={() =>
          setDuplicationMediaPopupAction({
            isOpen: false,
            key: 0,
            targetName: '',
          })
        }
        width={400}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'개인 추가 미디어 삭제'}
        buttons={
          <div className="popup-footer__section type2">
            <Button
              label={'삭제'}
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
                setDuplicationMediaPopupAction({
                  isOpen: false,
                  key: 0,
                  targetName: '',
                })
              }
            />
          </div>
        }
      >
        <div className="popup-contents__section">
          <div className="mb-contents-pb16__group">
            <p className="font-body__regular">
              삭제하겠습니까?
              <br />
              삭제 대상: {duplicationMediaPopup.targetName}
            </p>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default DeleteUserMediaPopup
