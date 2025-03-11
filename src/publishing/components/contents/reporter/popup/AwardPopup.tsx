/**
 * @file AwardPopup.tsx
 * @description 수상 팝업
 */

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'
import FormInputText from '~/publishing/components/common/ui/FormInputText'

interface Props {
  /** 팝업 열기 여부 */
  isOpen: boolean

  /**
   * 팝업 닫기
   * @returns
   */
  onClose: () => void
}

const AwardPopup = ({ isOpen, onClose }: Props) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleClose}
      title={'수상'}
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
      <div className="form-group">
        <ul>
          <li>
            <div className="flex-wrap  ">
              <div className="textarea__group">
                <textarea
                  rows={4}
                  maxLength={1000}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Popup>
  )
}

export default AwardPopup
