import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { useContactInfo } from '~/utils/hooks/contents/setting/useContactInfo'

const ContactInfoPopup = () => {
  const {
    contactInfo,
    contactInfoPopupTypes,
    setContactInfoPopupTypesAction,
    handleFormTextAreaChange,
    updateContactInfo,
  } = useContactInfo()

  return (
    <Popup
      isOpen={contactInfoPopupTypes.isOpen}
      title={`이메일 서명 설정`}
      onClose={() => setContactInfoPopupTypesAction(false, contactInfo)}
      width={800}
      hasCloseButton
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            onClick={() => setContactInfoPopupTypesAction(false, contactInfo)}
          />
          <Button
            label={'저장'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            onClick={() => updateContactInfo(contactInfoPopupTypes)}
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
                rows={5}
                onChange={e => handleFormTextAreaChange(e.target.value)}
                value={contactInfoPopupTypes.content}
                style={{
                  resize: 'none',
                }}
              ></textarea>
            </div>
            <div style={{ color: 'red' }}>{contactInfoPopupTypes.contentErr}</div>
          </div>
        </li>
        {/* <li>
          <FormInputText
            value={contactInfo.email}
            readonly={true}
          />
        </li> */}
      </ul>
    </Popup>
  )
}

export default ContactInfoPopup
