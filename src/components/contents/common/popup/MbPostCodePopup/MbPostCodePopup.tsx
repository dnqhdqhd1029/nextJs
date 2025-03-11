/**
 * @file MbPostCodePopup.tsx
 * @description 우편번호 팝업
 */

import DaumPostcode, { Address } from 'react-daum-postcode'

import Popup from '~/components/common/ui/Popup'

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

const MbPostCodePopup = ({ isOpen, onClose, onSelectAddress }: Props) => {
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
      title={'주소 검색'}
      hasCloseButton
      width={900}
      height={700}
      className="mb-postcode-popup__section"
      showFooter={false}
    >
      <DaumPostcode
        onComplete={handleSelectAddress} // 값을 선택할 경우 실행되는 이벤트
        autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
        // defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
        className="daum-postcode__section"
      />
    </Popup>
  )
}

export default MbPostCodePopup
