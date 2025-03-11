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
        title={'배포하기'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true)
                await onConfirm()
                setIsLoading(false)
              }}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={onClose}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">보도자료를 발송하겠습니까?</p>
        </div>
      </Popup>
    </>
  )
}

export default ConfirmModal
