import { useEffect, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import Popup from '~/components/common/ui/Popup'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'
const AddPersonalContact = () => {
  const {
    journalIdKey,
    journalContactInfo,
    addPersonalContactPopup,
    setaddPersonalContactEmail,
    setaddPersonalContactPhone,
    setaddPersonalContactTelephone,
    setaddPersonalContactAddress,
    setAddPersonalContactAction,
    createPersonalContact,
    deletePersonalContact,
    userContactValidation,
  } = usePressProfile()
  const [isLoading, setIsLoading] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    const checkValidation = await userContactValidation(addPersonalContactPopup)
    if (checkValidation) {
      await createPersonalContact(addPersonalContactPopup, journalIdKey)
    }
    setIsLoading(() => false)
  }

  const delteButton = async () => {
    setIsLoading(() => true)
    await deletePersonalContact(addPersonalContactPopup.type)
    setIsLoading(() => false)
  }

  useEffect(() => {
    setIsLoading(() => false)
  }, [])

  return (
    <>
      <Popup
        isOpen={addPersonalContactPopup.isOpen}
        onClose={() =>
          setAddPersonalContactAction({
            isOpen: false,
            type: '',
            email: '',
            emailErr: '',
            website: '',
            websiteErr: '',
            fax: '',
            phone: '',
            telephone: '',
            address: '',
          })
        }
        hasCloseButton
        width={600}
        hasCloseButtonLoading={isLoading}
        title={'개인적 연락처 추가'}
        buttons={
          <div className="popup-footer__section type2">
            <ul className="buttons">
              {journalContactInfo && journalContactInfo.contactUserAddedId ? (
                <li className="outline">
                  <Button
                    label={'삭제'}
                    cate={'default'}
                    size={'m'}
                    color={'tertiary'}
                    isLoading={isLoading}
                    onClick={() => delteButton()}
                  />
                </li>
              ) : (
                <li className="outline" />
              )}
              <li>
                <Button
                  label={'저장'}
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
                    setAddPersonalContactAction({
                      isOpen: false,
                      type: '',
                      email: '',
                      emailErr: '',
                      website: '',
                      websiteErr: '',
                      fax: '',
                      phone: '',
                      telephone: '',
                      address: '',
                    })
                  }
                />
              </li>
            </ul>
          </div>
        }
      >
        <div className="popup-contents__section">
          <div className="mb-contents-pb16__group">
            <p className="font-body__regular">
              개인적으로 사용하는 연락처가 있으면 입력하세요. 제공되는 메일과 다른 이메일을 여기에 추가하면 제공 메일이
              아닌 추가한 이메일을 통해 메일을 발송하게 됩니다.
            </p>
          </div>
          <ul>
            <li>
              <FormInputText
                title={'이메일'}
                onChange={e => setaddPersonalContactEmail(e.target.value, addPersonalContactPopup)}
                failed={addPersonalContactPopup.emailErr !== ''}
                msg={addPersonalContactPopup.emailErr}
                value={addPersonalContactPopup.email}
              />
            </li>
            <li>
              <FormInputText
                title={'전화'}
                extraInputType={'phone'}
                onChangeExtra={e => setaddPersonalContactPhone(e, addPersonalContactPopup)}
                value={addPersonalContactPopup.phone}
              />
            </li>
            <li>
              <FormInputText
                title={'휴대전화'}
                extraInputType={'phone'}
                onChangeExtra={e => setaddPersonalContactTelephone(e, addPersonalContactPopup)}
                value={addPersonalContactPopup.telephone}
              />
            </li>
            <li>
              <FormInputText
                title={'주소'}
                onChange={e => setaddPersonalContactAddress(e.target.value, addPersonalContactPopup)}
                value={addPersonalContactPopup.address}
              />
            </li>
          </ul>
        </div>
      </Popup>
    </>
  )
}

export default AddPersonalContact
