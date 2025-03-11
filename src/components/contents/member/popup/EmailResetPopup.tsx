/**
 * @file EmailResetPopup.tsx
 * @description 이메인 변경 팝업
 */

import { useState } from 'react'
import DaumPostcode, { Address } from 'react-daum-postcode'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import Popup from '~/components/common/ui/Popup'
import { EMAIL_PATTERN } from '~/constants/common'

interface Props {
  /** 팝업 열기 여부 */
  isOpen: boolean

  /**
   * 팝업 닫기
   * @returns
   */
  onClose: () => void

  /**
   * 주소 선택
   */
  onSelectAddress?: (address: Address) => void
}

const EmailResetPopup = ({ isOpen, onClose, onSelectAddress }: Props) => {
  const [userEmail, setUserEmail] = useState('')
  const [userEmailErr, setUserEmailErr] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpCodeErr, setOtpCodeErr] = useState('')
  const handleClose = () => {
    onClose()
  }

  const handleSendVerifyEmail = async () => {
    let isProcessing = true
    if (userEmail.length < 1) {
      setUserEmailErr('이메일을 입력하세요.')
      isProcessing = false
    } else if (!EMAIL_PATTERN.test(userEmail)) {
      setUserEmailErr('유효한 이메일 주소를 입력하세요.')
      isProcessing = false
    }
    // TODO: 새로운 이메일 주소를 입력하세요. (기존 이메일 데이터와 비교)
    if (isProcessing) {
      // const { status, data, message } = await apiPostUserRegisterEmail({
      //   email: userEmail,
      //   invitationLifeSpan: '',
      // })
      // if (status === 'S') {
      //   router.push('/join/register-complete')
      // } else {
      //   setUserEmailErr(message?.message || '')
      //   // openToast(message?.message, 'error')
      // }
    }
  }

  const handleSubmitOtpCode = async () => {
    let isProcessing = true
    // if (userName.length < 1) {
    //   setUserNameErr('이름을 입력하세요.')
    //   isProcessing = false
    // }
    if (isProcessing) {
      // const { status, data, message } = await apiPostUserRegisterEmail({
      //   email: userEmail,
      //   invitationLifeSpan: '',
      // })
      // if (status === 'S') {
      //   router.push('/join/register-complete')
      // } else {
      //   setUserEmailErr(message?.message || '')
      //   // openToast(message?.message, 'error')
      // }
    }
  }

  const handleSubmit = async () => {
    let isProcessing = true
    // TODO: 인증코드 확인 후 문제 없으면 수정 API 호출
    // if (userName.length < 1) {
    //   setUserNameErr('이름을 입력하세요.')
    //   isProcessing = false
    // }
    if (isProcessing) {
      // const { status, data, message } = await apiPostUserRegisterEmail({
      //   email: userEmail,
      //   invitationLifeSpan: '',
      // })
      // if (status === 'S') {
      //   router.push('/join/register-complete')
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
      title={'이메일(ID) 수정하기 '}
      hasCloseButton
      width={600}
      className="mb-postcode-popup__section"
      showFooter={true}
      buttons={
        <div className="popup-footer__section">
          <Button
            label={'저장'}
            cate={'default'}
            size={'m'}
            color={'primary'}
            onClick={handleSubmit}
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
      <div className="popup-contents__section">
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">이메일 수정은 인증 후 수정할 수 있습니다.</p>
        </div>
        <ul>
          <li>
            <div className="flex-just-start align-items-center">
              <div style={{ width: '70%' }}>
                <FormInputText
                  title={'이메일'}
                  onChange={e => {
                    setUserEmail(e.target.value)
                    setUserEmailErr('')
                  }}
                  failed={userEmailErr !== ''}
                  msg={userEmailErr}
                  value={userEmail}
                  required={true}
                />
              </div>
              <Button
                label={'인증 메일 발송하기'}
                cate={'link-text'}
                size={'m'}
                color={'primary'}
                className="mt-3 ml-10"
                onClick={handleSendVerifyEmail}
              />
            </div>
          </li>
          <li>
            <div className="flex-just-start align-items-ntceer">
              <div style={{ width: '70%' }}>
                <FormInputText
                  title={'인증번호'}
                  onChange={e => {
                    setOtpCode(e.target.value)
                    setOtpCodeErr('')
                  }}
                  failed={otpCodeErr !== ''}
                  msg={otpCodeErr}
                  value={otpCode}
                  required={true}
                />
              </div>
              <Button
                label={'확인'}
                cate={'link-text'}
                size={'m'}
                color={'primary'}
                className="mt-3 ml-10"
                onClick={handleSubmitOtpCode}
              />
            </div>
          </li>
        </ul>
      </div>
    </Popup>
  )
}

export default EmailResetPopup
