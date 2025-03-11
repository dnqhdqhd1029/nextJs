import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const ReportCancelPopup = () => {
  const { reportCancelPopup, reportPopup, setCloseMonitoringReportPopup, setCheckReportPopup } = useClipbookDetail()

  return (
    <>
      <Popup
        width={500}
        isOpen={reportCancelPopup}
        onClose={() => setCheckReportPopup(false, reportPopup)}
        hasCloseButton
        title={'보고서 만들기 취소'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => setCloseMonitoringReportPopup(false, [])}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setCheckReportPopup(false, reportPopup)}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            입력된 내용이 있습니다. 취소하면 입력한 내용은 삭제됩니다.
            <br />
            보고서 작성을 취소하겠습니까?
          </p>
        </div>
      </Popup>
    </>
  )
}

export default ReportCancelPopup
