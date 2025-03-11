import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import TagList from '~/components/common/ui/TagList'
import MediaTypeItem from '~/components/contents/monitoring/MonitoringPopup/Popup/MediaTypeItem'
import { useMonitoringPopup } from '~/utils/hooks/contents/monitoring/useMonitoringPopup'

const MonitoringCancelPopup = () => {
  const { monitoringCancelPopup, setMonitoringCancelPopup, setInitMonitoringPopup } = useMonitoringPopup()

  return (
    <>
      <Popup
        width={500}
        isOpen={monitoringCancelPopup}
        onClose={() => setMonitoringCancelPopup(false)}
        hasCloseButton
        title={'모니터링 만들기 취소'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => setInitMonitoringPopup()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setMonitoringCancelPopup(false)}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">모니터링 만들기를 취소하겠습니까?</p>
        </div>
      </Popup>
    </>
  )
}

export default MonitoringCancelPopup
