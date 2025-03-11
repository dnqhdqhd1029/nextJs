import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import ClipbookAnalysisPdf from '~/components/contents/monitoring/Clipbook/Result/Popup/ClipbookAnalysisPdf'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const ConfirmPopup = () => {
  const { isNoticePopup, setIsNoticePopupPopup } = useClipbookDetail()
  const [pdfDownload, setPdfDownload] = useState(false)

  const actionButton = () => {
    setPdfDownload(() => false)
    setIsNoticePopupPopup(false)
  }

  return (
    <>
      <Popup
        width={500}
        isOpen={isNoticePopup.isOpen}
        onClose={() => setIsNoticePopupPopup(false)}
        hasCloseButton
        hasCloseButtonLoading={pdfDownload}
        title={'클립북 분석 다운로드'}
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
          <p className="font-body__regular">클립북 분석을 PDF 파일로 다운로드하겠습니까?</p>
        </div>
        <div
          className="position-absolute"
          style={{ left: '-9999px', top: '-9999px', width: '100%' }}
        >
          <ClipbookAnalysisPdf
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
