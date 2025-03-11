import Button from '~/components/common/ui/Button'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { useEmail } from '~/utils/hooks/contents/email/useEmail'

const EmailContactInfoPopup = () => {
  const { userInfo, contactInfoPopup, contactInfoOnChange, contactInfoTemplateOpen, updateContactInfoAction } =
    useEmail()

  const handleClose = () => {
    contactInfoTemplateOpen({ ...contactInfoPopup, isOpen: false })
  }

  return (
    <>
      <Popup
        title={`이메일 서명 수정`}
        isOpen={contactInfoPopup.isOpen}
        onClose={handleClose}
        hasCloseButton
        width={500}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'저장'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => updateContactInfoAction(contactInfoPopup)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={handleClose}
            />
          </div>
        }
      >
        <ul>
          <li>
            <div className="textarea__area">
              <FormTitle
                title="이메일 서명"
                required={true}
              />
              <div className="textarea__group">
                <textarea
                  placeholder=""
                  rows={6}
                  onChange={e => contactInfoOnChange(e.target.value, contactInfoPopup)}
                  value={contactInfoPopup.content}
                  style={{
                    resize: 'none',
                  }}
                ></textarea>
              </div>
              <FormMsg
                msg={contactInfoPopup.contentErrorMessage}
                type={'error'}
              />
            </div>
          </li>
        </ul>
      </Popup>
    </>
  )
}

export default EmailContactInfoPopup
