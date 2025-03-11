import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useMonitoringPopup } from '~/utils/hooks/contents/monitoring/useMonitoringPopup'

const MonitoringCheckPopup = () => {
  const {
    monitoringPopup,
    monitoringCheckPopup,
    setInitMonitoringPopup,
    setMonitoringCheckCancelPopup,
    checkValidation,
    monitroingFunction,
  } = useMonitoringPopup()
  const [isLoading, setIsLoading] = useState(false)

  const create = async () => {
    setIsLoading(() => true)
    const check = await checkValidation(monitoringPopup)
    console.log('check', check)
    if (check) {
      await monitroingFunction(monitoringPopup)
    }
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        width={500}
        isOpen={monitoringCheckPopup}
        hasCloseButtonLoading={isLoading}
        onClose={() => setMonitoringCheckCancelPopup(false, monitoringPopup)}
        hasCloseButton
        title={'맞춤검색 설정 취소'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'tertiary'}
              disabled={isLoading}
              onClick={() => setMonitoringCheckCancelPopup(false, monitoringPopup)}
            />
            <Button
              label={'저장안함'}
              cate={'default'}
              size={'m'}
              color={'tertiary'}
              disabled={isLoading}
              onClick={() => setInitMonitoringPopup()}
            />
            <Button
              label={'저장'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => create()}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">수정된 내용이 있습니다. 저장하겠습니까?</p>
        </div>
      </Popup>
    </>
  )
}

export default MonitoringCheckPopup
