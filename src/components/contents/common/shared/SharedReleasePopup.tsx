import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Popup from '~/components/common/ui/Popup'
import { useShared } from '~/utils/hooks/contents/shared/useShared'

const SharedReleasePopup = () => {
  const { isReleasePopup, sharedPopup, shared_id, cancelRelease, initPopupAction } = useShared()
  const [isLoading, setIsLoading] = useState(false)

  const emailAction = async () => {
    setIsLoading(() => true)
    await cancelRelease(shared_id)
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        isOpen={isReleasePopup}
        onClose={() => !isLoading && initPopupAction()}
        hasCloseButton
        width={700}
        height={300}
        title={'공유하기'}
        showFooter={false}
      >
        <div className="mb-contents-pb16__group">
          <div
            className="me-send-email__group"
            style={{ paddingBottom: 15 }}
          >
            <IcoSvg data={icoSvgData.checkLg} />
            <p
              className="me-send-email__text"
              style={{ fontWeight: 'bold' }}
            >
              공유하기 완료
            </p>
          </div>
          <p className="font-body__regular">회원님의 공유하기가 정상적으로 완료되었습니다.</p>
          <div style={{ paddingTop: 15, paddingBottom: 40 }}>
            <Button
              label={'확인'}
              cate={'default-ico-text'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => !isLoading && initPopupAction()}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <p
              className="font-body__regular"
              style={{ paddingRight: 10 }}
            >
              대기 발송 정책에 따라 30초 후에 발송됩니다.
            </p>
            <Button
              elem="a"
              url={''}
              label={'발송취소'}
              cate={'link-text'}
              size={'m'}
              color={'body-link'}
              disabled={isLoading}
              onClick={() => emailAction()}
            />
          </div>
        </div>
      </Popup>
    </>
  )
}

export default SharedReleasePopup
