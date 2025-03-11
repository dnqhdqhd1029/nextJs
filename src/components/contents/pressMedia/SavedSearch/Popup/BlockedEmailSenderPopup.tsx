import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'
const BlockedEmailSenderPopup = () => {
  const {
    listDefine,
    journalIdKey,
    mediaIdKey,
    blockedEmailSenderPopup,
    setBlockedEmailSenderPopupAction,
    journalistUnBlockedAction,
    mediaUnBlockedAction,
    journalistBlockedAction,
    mediaBlockedAction,
  } = useSavedSearch()
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
        hasCloseButton
        hasCloseButtonLoading={isLoading}
        title={blockedEmailSenderPopup.status === 'unblock' ? '이메일 발송 차단 해제' : '이메일 발송 차단'}
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
