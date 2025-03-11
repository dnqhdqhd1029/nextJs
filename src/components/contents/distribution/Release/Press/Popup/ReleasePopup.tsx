import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Popup from '~/components/common/ui/Popup'
import { usePressRelese } from '~/utils/hooks/contents/pressRelease/usePressRelease'

const ReleasePopup = () => {
  const router = useRouter()
  const { mailingId, releasePopup, refinedValue, confirmPageData, mailingCancelAction } = usePressRelese()
  const [isLoading, setIsLoading] = useState(false)
  const [isCancle, setIsCancel] = useState<boolean>(true)

  const cancelAction = async () => {
    setIsLoading(() => true)
    await mailingCancelAction(mailingId)
    setIsLoading(() => false)
  }

  useEffect(() => {
    if (releasePopup && !!parseInt(refinedValue['time_delay_mailing']) && confirmPageData.mailStateGroup === 'now') {
      const timeout = setTimeout(() => {
        setIsCancel(false)
      }, parseInt(refinedValue['mailing_delay_time']) * 1000)

      return () => {
        clearTimeout(timeout)
        setIsCancel(true)
      }
    }
  }, [releasePopup])

  return (
    <>
      <Popup
        isOpen={releasePopup}
        onClose={() => router.push('/activity/search')}
        hasCloseButtonLoading={isLoading}
        hasCloseButton
        width={700}
        height={300}
        title={'보도자료 배포'}
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
              보도자료 배포 등록 완료
            </p>
          </div>
          <p className="font-body__regular">
            회원님이 등록한 보도자료가 정상적으로 접수되었습니다.
            <br />
            전송 결과를 이메일로 알려드리겠습니다.
          </p>
          <div style={{ paddingTop: 15, paddingBottom: 40 }}>
            <Button
              label={'확인'}
              cate={'default-ico-text'}
              size={'m'}
              color={'primary'}
              onClick={() => router.push('/activity/search')}
            />
          </div>
          {!!parseInt(refinedValue['time_delay_mailing']) && confirmPageData.mailStateGroup === 'now' && isCancle && (
            <div style={{ display: 'flex' }}>
              <p
                className="font-body__regular"
                style={{ paddingRight: 10 }}
              >
                대기 발송 정책에 따라 {refinedValue['mailing_delay_time']}초 후에 발송됩니다.
              </p>
              <Button
                elem="a"
                url={''}
                label={'발송취소'}
                cate={'link-text'}
                size={'m'}
                color={'body-link'}
                onClick={() => cancelAction()}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </Popup>
    </>
  )
}

export default ReleasePopup
