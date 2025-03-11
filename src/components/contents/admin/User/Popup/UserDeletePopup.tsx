import { KeyboardEvent, useRef, useState } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import Popup from '~/components/common/ui/Popup'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { useAdminUser } from '~/utils/hooks/contents/admin/useAdminUser'

const UserDeletePopup = () => {
  const { requestSearchParams, userPopup, setCloseUserPopup, setPassword, sendPasswordEmailAction } = useAdminUser()
  const { getInputRef } = useValidate()
  const [isLoading, setIsLoading] = useState(false)
  const currentPasswdRef = useRef<HTMLInputElement>(null)

  const deleteUser = async () => {
    setIsLoading(() => true)
    await sendPasswordEmailAction(userPopup, requestSearchParams)
    setIsLoading(() => false)
  }

  const deleteUserKeyboard = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'enter') {
      setIsLoading(() => true)
      await sendPasswordEmailAction(userPopup, requestSearchParams)
      setIsLoading(() => false)
    }
  }

  return (
    <Popup
      isOpen={userPopup.isOpen && userPopup.type === 'unauthenticedUserCancel'}
      title={'회원 삭제'}
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
            label={'삭제'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => deleteUser()}
          />
        </div>
      }
    >
      <div className="mb-contents-pb16__group">
        <p className="font-body__regular">
          "{userPopup.email}" 이메일 회원 추가 취소하겠습니까?
          <br />
          <br />
          취소하면 회원 추가는 취소되고, 회원 인증 URL은 즉시 만료됩니다.
          <br />
          정말 취소하려면 비밀번호 입력 후 확인 버튼을 누르세요.
        </p>
      </div>
      <ul>
        <li>
          <FormInputText
            id="user-passwd"
            name="user-passwd"
            title="비밀번호"
            inputType="password"
            required={true}
            getInputRef={ref => getInputRef(ref, currentPasswdRef)}
            value={userPopup.password}
            onKeyUp={e => deleteUserKeyboard(e)}
            onChange={e => setPassword(e.target.value, userPopup)}
            failed={userPopup.passwordErr !== ''}
            msg={userPopup.passwordErr}
          />
        </li>
      </ul>
    </Popup>
  )
}

export default UserDeletePopup
