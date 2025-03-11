/**
 * @file PasswordCheckPopup.tsx
 * @description 회원탈퇴 패스워드 확인팝업
 */

import { useState } from 'react'

import FormInputText from '~/components/common/ui/FormInputText'
import Popup from '~/components/common/ui/Popup'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const PasswordResetPopup = ({ isOpen, onClose }: Props) => {
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordErr, setUserPasswordErr] = useState('')
  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async () => {
    let isProcessing = true
    if (isProcessing) {
      // const { status, data, message } = await apiPostUserRegisterEmail({
      //   email: userEmail,
      //   invitationLifeSpan: '',
      // })
      // if (status === 'S') {
      //   router.push('/member/withdrawal')
      // } else {
      //   setUserEmailErr(message?.message || '')
      //   // openToast(message?.message, 'error')
      // }
    }
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleClose}
      title={'비밀번호 확인'}
      hasCloseButton
      width={600}
      className="mb-postcode-popup__section"
      showFooter={true}
      onConfirm={handleSubmit}
    >
      <div className="popup-contents__section">
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">회원 탈퇴를 하려면 비밀번호를 입력해야 합니다.</p>
        </div>
        <ul>
          <li>
            <FormInputText
              title={'비밀번호'}
              inputType={'password'}
              onChange={e => {
                setUserPassword(e.target.value)
                setUserPasswordErr('')
              }}
              failed={userPasswordErr !== ''}
              msg={userPasswordErr}
              value={userPassword}
              required={true}
            />
          </li>
        </ul>
      </div>
    </Popup>
  )
}

export default PasswordResetPopup
