import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'
const BlockedEmailSenderPopup = () => {
  const {
    journalIdKey,
    blockedEmailSenderPopup,
    setBlockedEmailSenderPopupAction,
    journalistBlockedAction,
    journalistUnBlockedAction,
  } = usePressProfile()
  const [isLoading, setIsLoading] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    blockedEmailSenderPopup.status === 'unblock'
      ? await journalistUnBlockedAction(blockedEmailSenderPopup, journalIdKey)
      : await journalistBlockedAction(blockedEmailSenderPopup, journalIdKey)
    setIsLoading(() => false)
  }

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
        title={blockedEmailSenderPopup.status === 'unblock' ? '이메일 발송 차단 해제' : '이메일 발송 차단'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={blockedEmailSenderPopup.status === 'unblock' ? '해제' : '차단'}
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
          {blockedEmailSenderPopup.status === 'unblock' ? (
            <p className="font-body__regular">이 연락처의 이메일 차단을 해제하겠습니까?</p>
          ) : (
            <p className="font-body__regular">
              차단하면 내 회사(또는 그룹)의 다른 회원이 이메일과 보도자료를 보내도 발송이 되지 <br />
              않습니다. 이메일 발송을 차단하겠습니까?
            </p>
          )}
        </div>
      </Popup>
    </>
  )
}

export default BlockedEmailSenderPopup
