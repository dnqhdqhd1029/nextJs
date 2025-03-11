/**
 * @file PasswordResetPopup.tsx
 * @description 패스워드 변경 팝업
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
      title={'비밀번호 변경 '}
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
          <p className="font-body__regular">회원 정보를 수정하려면 회원님의 비밀번호를 입력하세요.</p>
        </div>
        <ul>
          <li>
            <FormInputText
              title={'비밀번호'}
              inputType={'password'}
              required={true}
              failed={true}
              msg={'비밀번호가 일치하지 않습니다.\n'}
            />
          </li>
          <li>
            <FormInputText
              title={'새 비밀번호'}
              inputType={'password'}
              required={true}
              failed={true}
              msg={
                '비밀번호는 8~16자이고 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.직전에 사용한 비밀번호를 사용할 수 없습니다. 다시 입력해 주세요\n'
              }
            />
          </li>
        </ul>
      </div>
    </Popup>
  )
}

export default PasswordResetPopup
