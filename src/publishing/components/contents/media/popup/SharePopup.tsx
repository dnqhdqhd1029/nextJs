/**
 * @file SharePopup.tsx
 * @description 공유 팝업
 */

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
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

const ProfilePopup = ({ isOpen, onClose }: Props) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Popup
      isOpen={isOpen}
      onClose={handleClose}
      title={'공유하기'}
      hasCloseButton
      width={400}
      className="mb-postcode-popup__section sp-px-0"
      showFooter={false}
    >
      <div className="form-group">
        <div className="share-section flex-just-cen sp-py-5">
          <Button
            elem="button"
            label={'02-737-3600'}
            cate={'ico-only'}
            size={'l'}
            color={'dark'}
            icoLeft={true}
            icoLeftData={icoSvgData.facebook}
          />
          <Button
            elem="button"
            label={'02-737-3600'}
            cate={'ico-only'}
            size={'l'}
            color={'dark'}
            icoLeft={true}
            icoLeftData={icoSvgData.twitter}
          />
          <Button
            elem="button"
            label={'02-737-3600'}
            cate={'ico-only'}
            size={'l'}
            color={'dark'}
            icoLeft={true}
            icoLeftData={icoSvgData.linkedin}
          />
          <Button
            elem="button"
            label={'URL'}
            cate={'link-text'}
            size={'l'}
            color={'dark'}
          />
        </div>
      </div>
    </Popup>
  )
}

export default ProfilePopup
