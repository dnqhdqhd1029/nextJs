/**
 * @file PasswordCheckPopup.tsx
 * @description 회원탈퇴 패스워드 확인팝업
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

const PasswordResetPopup = ({ isOpen, onClose, onSelectAddress }: Props) => {
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
      title={'비밀번호 확인 '}
      hasCloseButton
      width={600}
      className="mb-postcode-popup__section"
      showFooter={true}
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
              required={true}
              failed={true}
              msg={'비밀번호가 일치하지 않습니다.'}
            />
          </li>
        </ul>
      </div>
    </Popup>
  )
}

export default PasswordResetPopup
