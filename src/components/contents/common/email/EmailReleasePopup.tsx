import { useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import Popup from '~/components/common/ui/Popup'
import { useEmail } from '~/utils/hooks/contents/email/useEmail'

const EmailReleasePopup = () => {
  const { isReleasePopup, emailPopup, refinedValue, cancelRelease, setEmailPopup } = useEmail()
  const [isLoading, setIsLoading] = useState(false)
  const [isCancle, setIsCancel] = useState<boolean>(true)

  const emailAction = async () => {
    setIsLoading(() => true)
    await cancelRelease(emailPopup.key)
    setIsLoading(() => false)
  }

  useEffect(() => {
    if (isReleasePopup && !!parseInt(refinedValue['time_delay_mailing']) && emailPopup.mailStateGroup === 'now') {
      const timeout = setTimeout(() => {
        setIsCancel(false)
      }, parseInt(refinedValue['mailing_delay_time']) * 1000)

      return () => {
        clearTimeout(timeout)
        setIsCancel(true)
      }
    }
  }, [isReleasePopup])

  return (
    <>
      <Popup
        isOpen={isReleasePopup}
        onClose={() => !isLoading && setEmailPopup()}
        hasCloseButton
        width={700}
        height={300}
        title={'발송 안내'}
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
              이메일 보내기 완료
            </p>
          </div>
          <p className="font-body__regular">회원님이 작성한 이메일이 정상적으로 완료되었습니다.</p>
          <div style={{ paddingTop: 15, paddingBottom: 40 }}>
            <Button
              label={'확인'}
              cate={'default-ico-text'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => !isLoading && setEmailPopup()}
            />
          </div>
          {!!parseInt(refinedValue['time_delay_mailing']) && emailPopup.mailStateGroup === 'now' && isCancle && (
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
                onClick={() => emailAction()}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </Popup>
    </>
  )
}

export default EmailReleasePopup
