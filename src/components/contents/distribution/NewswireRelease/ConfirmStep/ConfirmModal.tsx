import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'

interface Props {
  onClose: () => void
  onConfirm: () => void
}

const ConfirmModal = ({ onClose, onConfirm }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <Popup
        isOpen={true}
        onClose={onClose}
        hasCloseButtonLoading={false}
        hasCloseButton
        width={700}
        title={'등록하기'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={async () => {
                setIsLoading(true)
                await onConfirm()
                setIsLoading(false)
              }}
              isLoading={isLoading}
              disabled={isLoading}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={onClose}
              disabled={isLoading}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            등록하기를 누르면 보도자료를 뉴스와이어에 전송합니다.
            <br />
            전송 후에는 취소나 수정이 어렵습니다.
            <br />
            보도자료를 등록하겠습니까?
          </p>
        </div>
      </Popup>
    </>
  )
}

export default ConfirmModal
