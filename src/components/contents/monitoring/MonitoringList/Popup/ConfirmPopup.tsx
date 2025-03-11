import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import MonitoringAnalysisPdf from '~/components/contents/monitoring/MonitoringList/Popup/MonitoringAnalysisPdf'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const ConfirmPopup = () => {
  const { isNoticePopup, setIsNoticePopupPopup } = useMonitoringSearch()
  const [pdfDownload, setPdfDownload] = useState(false)

  const actionButton = () => {
    setPdfDownload(() => false)
    setIsNoticePopupPopup(false)
  }

  return (
    <>
      <Popup
        isOpen={isNoticePopup.isOpen}
        width={500}
        onClose={() => setIsNoticePopupPopup(false)}
        hasCloseButton
        hasCloseButtonLoading={pdfDownload}
        title={'뉴스 맞춤 검색 분석 다운로드'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={pdfDownload}
              disabled={pdfDownload}
              onClick={() => setPdfDownload(() => true)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              disabled={pdfDownload}
              color={'link-dark'}
              onClick={() => setIsNoticePopupPopup(false)}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">뉴스 맞춤 검색 분석을 PDF 파일로 다운로드 하겠습니까?</p>
        </div>
        <div
          className="position-absolute"
          style={{ left: '-9999px', top: '-9999px', width: '100%' }}
        >
          <MonitoringAnalysisPdf
            isPdfDownload={pdfDownload}
            makePdfDone={e => actionButton()}
            newsCountListByUpperMedia={isNoticePopup.newsCountListByUpperMedia}
            dailyNewsCountListChart={isNoticePopup.dailyNewsCountListChart}
            tonePieChart={isNoticePopup.tonePieChart}
            mediaTypePieChart={isNoticePopup.mediaTypePieChart}
          />
        </div>
      </Popup>
    </>
  )
}

export default ConfirmPopup
