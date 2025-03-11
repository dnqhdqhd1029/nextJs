/**
 * @file ProfilePopup.tsx
 * @description 이미지 변경 (모바일일때) 팝업
 */

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import Select from '~/components/common/ui/Select'

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
      title={'프로필 사진 변경'}
      hasCloseButton
      width={600}
      className="mb-postcode-popup__section sp-px-0"
      showFooter={false}
    >
      <div className="form-group">
        <ul className="profile-change">
          <li>
            <Button
              label={'수정하기'}
              cate={'link-text'}
              size={'m'}
              color={'primary'}
              onClick={handleClose}
            />
          </li>
          <li>
            <Button
              label={'삭제하기'}
              cate={'link-text'}
              size={'m'}
              color={'primary'}
              onClick={handleClose}
            />
          </li>
          <li>
            <Button
              label={'취소'}
              cate={'link-text'}
              size={'m'}
              color={'link-dark'}
              onClick={handleClose}
            />
          </li>
        </ul>
      </div>
    </Popup>
  )
}

export default ProfilePopup
