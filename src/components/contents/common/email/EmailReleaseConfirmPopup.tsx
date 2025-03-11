import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useEmail } from '~/utils/hooks/contents/email/useEmail'

const EmailReleaseConfirmPopup = () => {
  const { isConfirmPopup, popupConfirmAction, emailPopup, editorData, deletedFileIdList, setEmailAction } = useEmail()
  const [isLoading, setIsLoading] = useState(false)

  const emailAction = async () => {
    setIsLoading(() => true)
    await setEmailAction(emailPopup, editorData, 'send', deletedFileIdList)
    setIsLoading(() => false)
  }

  const checkSubtituteTag = (str: string) => {
    const keywords = ['{이름}', '{소속}', '{직책}']
    return keywords.some(keyword => str.includes(keyword))
  }

  return (
    <>
      <Popup
        title={`발송 안내`}
        isOpen={isConfirmPopup}
        onClose={() => !isLoading && popupConfirmAction(false)}
        hasCloseButton
        width={800}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => emailAction()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => popupConfirmAction(false)}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          {checkSubtituteTag(editorData) && (
            <>
              <p className="font-body__regular">
                치환태그는 DB에 등록된 사람에게만 적용됩니다. 등록된 정보 중 {`{이름}`} {`{소속}`} {`{직책}`}이 치환되어
                발송됩니다.
                <br />
                받는 메일에 추가한 이메일은 치환되지 않습니다.
              </p>
              <br />
              <p className="font-body__regular">그래도 메일을 보내겠습니까?</p>
              <br />
            </>
          )}
          <p className="font-body__regular">확인을 누르면 이메일을 발송하거나 발송을 예약합니다. 동의하십니까?</p>
        </div>
      </Popup>
    </>
  )
}

export default EmailReleaseConfirmPopup
