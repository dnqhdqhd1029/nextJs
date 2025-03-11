import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'
const BlockedEmailSenderPopup = () => {
  const {
    journalIdKey,
    mediaIdKey,
    listDefine,
    blockedEmailSenderPopup,
    setBlockedEmailSenderPopupAction,
    journalistUnBlockedAction,
    mediaUnBlockedAction,
    journalistBlockedAction,
    mediaBlockedAction,
  } = usePressMediaListResult()
  const [isLoading, setIsLoading] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    if (blockedEmailSenderPopup.type === 'press') {
      blockedEmailSenderPopup.status === 'unblock'
        ? await journalistUnBlockedAction(blockedEmailSenderPopup, journalIdKey, listDefine)
        : await journalistBlockedAction(blockedEmailSenderPopup, journalIdKey, listDefine)
    } else {
      blockedEmailSenderPopup.status === 'unblock'
        ? await mediaUnBlockedAction(blockedEmailSenderPopup, mediaIdKey, listDefine)
        : await mediaBlockedAction(blockedEmailSenderPopup, mediaIdKey, listDefine)
    }
    setIsLoading(() => false)
  }

  useEffect(() => {
    setIsLoading(() => false)
  }, [])

  return (
    <>
      <Popup
        isOpen={blockedEmailSenderPopup.isOpen}
        onClose={() =>
          setBlockedEmailSenderPopupAction({
            isOpen: false,
            type: '',
            status: '',
            idKey: '',
          })
        }
        width={600}
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={'이메일 발송 차단 해제'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'해제'}
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
                setBlockedEmailSenderPopupAction({
                  isOpen: false,
                  type: '',
                  status: '',
                  idKey: '',
                })
              }
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">이 연락처의 이메일 차단을 해제하겠습니까?</p>
        </div>
      </Popup>
    </>
  )
}

export default BlockedEmailSenderPopup
