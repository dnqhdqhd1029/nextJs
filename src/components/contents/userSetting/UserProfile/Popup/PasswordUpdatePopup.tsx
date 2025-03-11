import { useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import Popup from '~/components/common/ui/Popup'
import { PASSWORD_PATTER_DESCRIPTION } from '~/constants/common'
import { useValidate } from '~/utils/hooks/common/useValidate'
import { useUserProfile } from '~/utils/hooks/contents/setting/useUserProfile'

const PasswordUpdatePopup = () => {
  const { getInputRef } = useValidate()
  const {
    isLoading,
    resetPasswordPopupTypes,
    resetPasswordPopupAction,
    resetPasswordFunction,
    setCurrentPassword,
    setPassword,
    setPasswordConfirm,
  } = useUserProfile()

  const currentPasswdRef = useRef<HTMLInputElement>(null)
  const newPasswdRef = useRef<HTMLInputElement>(null)
  const newPasswdReRef = useRef<HTMLInputElement>(null)

  return (
    <Popup
      isOpen={resetPasswordPopupTypes.isOpen}
      title={'내 비밀번호 수정'}
      onClose={() => resetPasswordPopupAction(false)}
      width={500}
      hasCloseButton
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'저장'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => resetPasswordFunction(resetPasswordPopupTypes)}
          />
          <Button
            label={'취소'}
            cate={'default'}
            size={'m'}
            color={'link-dark'}
            onClick={() => resetPasswordPopupAction(false)}
          />
        </div>
      }
    >
      <ul>
        <li>
          <FormInputText
            id="current-user-passwd"
            name="current-user-passwd"
            title="현재 비밀번호"
            inputType="password"
            required={true}
            getInputRef={ref => getInputRef(ref, currentPasswdRef)}
            value={resetPasswordPopupTypes.currentPassword}
            onChange={e => setCurrentPassword(e.target.value, resetPasswordPopupTypes)}
            failed={resetPasswordPopupTypes.currentPasswordErr !== ''}
            msg={resetPasswordPopupTypes.currentPasswordErr}
          />
        </li>
        <li>
          <FormInputText
            id="user-passwd"
            name="user-passwd"
            title="신규 비밀번호"
            inputType="password"
            required={true}
            getInputRef={ref => getInputRef(ref, newPasswdRef)}
            value={resetPasswordPopupTypes.password}
            onChange={e => setPassword(e.target.value, resetPasswordPopupTypes)}
            failed={resetPasswordPopupTypes.passwordErr !== ''}
            msg={resetPasswordPopupTypes.passwordErr}
          />
        </li>
        <li>
          <FormInputText
            id="user-passwd-confirm"
            name="user-passwd-confirm"
            title="신규 비밀번호 확인"
            inputType="password"
            required={true}
            getInputRef={ref => getInputRef(ref, newPasswdReRef)}
            value={resetPasswordPopupTypes.passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value, resetPasswordPopupTypes)}
            failed={resetPasswordPopupTypes.passwordConfirmErr !== ''}
            msg={resetPasswordPopupTypes.passwordConfirmErr}
          />
        </li>
      </ul>
    </Popup>
  )
}

export default PasswordUpdatePopup
