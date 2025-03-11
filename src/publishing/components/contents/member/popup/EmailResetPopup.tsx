/**
 * @file EmailResetPopup.tsx
 * @description 이메인 변경 팝업
 */

import DaumPostcode, { Address } from 'react-daum-postcode'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import FormInputText from '~/publishing/components/common/ui/FormInputText'

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
  const handleClose = () => {
    onClose()
  }

  const handleSelectAddress = (address: Address) => {
    onSelectAddress && onSelectAddress(address)
    handleClose()
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
            //onClick={onConfirm ?? handleClose}
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
                  inputType={'text'}
                  required={true}
                />
              </div>
              <Button
                label={'인증 메일 발송하기'}
                cate={'link-text'}
                size={'m'}
                color={'primary'}
                className="mt-3 ml-10"
              />
            </div>
          </li>
          <li>
            <div className="flex-just-start align-items-ntceer">
              <div style={{ width: '70%' }}>
                <FormInputText
                  title={'인증번호'}
                  inputType={'text'}
                  required={true}
                  //msg={'비밀번호는 8~16자이고 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.'}
                />
              </div>
              <Button
                label={'확인'}
                cate={'link-text'}
                size={'m'}
                color={'primary'}
                className="mt-3 ml-10"
              />
            </div>
          </li>
        </ul>
      </div>
    </Popup>
  )
}

export default EmailResetPopup
