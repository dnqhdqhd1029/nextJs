import { useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const TestEmailSenderPopup = () => {
  const {
    testEmailSenderPopup,
    testEmailSenderPopupInputChange,
    initTestEmailSenderPopupAction,
    testEmailSenderPopupConfirmAction,
  } = usePressRelese()
  const [isLoading, setIsLoading] = useState(false)

  const action = async () => {
    setIsLoading(() => true)
    await testEmailSenderPopupConfirmAction(testEmailSenderPopup)
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        width={500}
        isOpen={testEmailSenderPopup.isOpen}
        hasCloseButtonLoading={isLoading}
        onClose={() => initTestEmailSenderPopupAction({ isOpen: false, key: 0, content: '', valueErr: '', value: '' })}
        hasCloseButton
        title={'테스트 메일 발송'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'발송'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => action()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() =>
                initTestEmailSenderPopupAction({ isOpen: false, key: 0, content: '', valueErr: '', value: '' })
              }
            />
          </div>
        }
      >
        <ul>
          <li>
            <div className="form-social-media__section">
              <FormTitle
                title={'이메일 주소를 입력하세요'}
                required={true}
              />
              <FormInputText
                required={true}
                onChange={e => testEmailSenderPopupInputChange(e.target.value, testEmailSenderPopup)}
                failed={testEmailSenderPopup.valueErr !== ''}
                msg={testEmailSenderPopup.valueErr}
                value={testEmailSenderPopup.value}
              />
            </div>
          </li>
        </ul>
      </Popup>
    </>
  )
}

export default TestEmailSenderPopup
