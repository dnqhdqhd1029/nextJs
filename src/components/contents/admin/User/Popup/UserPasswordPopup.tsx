import { useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import Popup from '~/components/common/ui/Popup'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { useAdminUser } from '~/utils/hooks/contents/admin/useAdminUser'

const UserPasswordPopup = () => {
  const { userPopup, requestSearchParams, setCloseUserPopup, setPassword, sendPasswordEmailAction } = useAdminUser()
  const { getInputRef } = useValidate()
  const [isLoading, setIsLoading] = useState(false)
  const currentPasswdRef = useRef<HTMLInputElement>(null)

  const editUser = async () => {
    setIsLoading(() => true)
    await sendPasswordEmailAction(userPopup, requestSearchParams)
    setIsLoading(() => false)
  }

  return (
    <Popup
      isOpen={userPopup.isOpen && userPopup.type === 'password'}
      title={'비밀번호 재설정'}
      onClose={() => setCloseUserPopup()}
      width={550}
      hasCloseButton
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            disabled={isLoading}
            onClick={() => setCloseUserPopup()}
          />
          <Button
            label={'재설정 메일 발송'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => editUser()}
          />
        </div>
      }
    >
      <div className="mb-contents-pb16__group">
        <p className="font-body__regular">
          {userPopup.name} 회원은 귀하가 발송한 메일을 인증한 뒤 비밀번호를 새로 설정할 수 있습니다.
          <br />
          회원님 자신의 비밀번호를 입력하고 재설정 메일을 보내세요.
        </p>
      </div>
      <ul>
        <li>
          <FormInputText
            id="user-passwd"
            name="user-passwd"
            title="내 비밀번호"
            inputType="password"
            required={true}
            getInputRef={ref => getInputRef(ref, currentPasswdRef)}
            value={userPopup.password}
            onChange={e => setPassword(e.target.value, userPopup)}
            failed={userPopup.passwordErr !== ''}
            msg={userPopup.passwordErr}
          />
        </li>
      </ul>
    </Popup>
  )
}

export default UserPasswordPopup
