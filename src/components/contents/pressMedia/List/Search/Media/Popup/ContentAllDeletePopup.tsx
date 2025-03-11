import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const MediaContentAllDeletePopup = () => {
  const { contentAllDeletePopup, initSelectedAllDeleteContent, selectedAllDeleteAction } = useMediaListManagement()
  const [isLoading, setIsLoading] = useState(false)

  const deleteAction = async () => {
    setIsLoading(() => true)
    await selectedAllDeleteAction(contentAllDeletePopup)
    setIsLoading(() => false)
  }
  return (
    <>
      <Popup
        isOpen={contentAllDeletePopup.isOpen}
        onClose={() => initSelectedAllDeleteContent()}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'삭제하기'}
        width={500}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'삭제'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => deleteAction()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              disabled={isLoading}
              color={'link-dark'}
              onClick={() => initSelectedAllDeleteContent()}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            삭제하겠습니까?
            <br />
            삭제대상:
            {contentAllDeletePopup.key && contentAllDeletePopup.key.length > 0 && (
              <span>{contentAllDeletePopup.key.map(element => element.label).join(', ')}</span>
            )}
          </p>
        </div>
      </Popup>
    </>
  )
}

export default MediaContentAllDeletePopup
