import { Fragment, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import Popup from '~/components/common/ui/Popup'
import MonitoringReportEmail from '~/components/contents/monitoring/Clipbook/Result/Popup/MonitoringReportEmail'
import MonitoringReportName from '~/components/contents/monitoring/Clipbook/Result/Popup/MonitoringReportName'
import MonitoringReportNews from '~/components/contents/monitoring/Clipbook/Result/Popup/MonitoringReportNews'
import { openToast } from '~/utils/common/toast'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const MonitoringReportPopup = () => {
  const {
    isDemoLicense,
    reportPopup,
    setMonitoringReportPopupStepOnChange,
    setCheckReportPopup,
    reportEmailSender,
    executeWordDownload,
    executePdfConvert,
    reportEmailSenderCheck,
  } = useClipbookDetail()
  const [isLoading, setIsLoading] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    if (reportPopup.releaseStep.tabStatus === 'email') {
      if (isDemoLicense) {
        openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
      } else {
        const check = await reportEmailSenderCheck(reportPopup)
        if (check) {
          await reportEmailSender(reportPopup, '')
        }
      }
    } else {
      if (reportPopup.nameStep.name === '') {
        openToast('보고서 제목을 입력해주세요', 'error')
      } else {
        if (reportPopup.releaseStep.isWordDownload) {
          await executeWordDownload(reportPopup)
        }
        if (reportPopup.releaseStep.isPdfDownload) {
          await executePdfConvert(reportPopup)
        }
      }
    }
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        isOpen={reportPopup.isOpen}
        title={`보고서 만들기`}
        onClose={() => setCheckReportPopup(true, reportPopup)}
        width={'60vw'}
        maxWidth={'1140px'}
        height={'85vh'}
        hasCloseButton
        contentSectionOverflow={'scroll'}
        hasCloseButtonLoading={isLoading}
        buttons={
          <div className="popup-footer__section type2">
            <ul className="buttons">
              <li className="outline">
                {reportPopup.step !== 'name' && (
                  <Button
                    label={'이전'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'tertiary'}
                    icoLeft={true}
                    disabled={isLoading}
                    icoLeftData={icoSvgData.chevronThickLeft}
                    onClick={() =>
                      setMonitoringReportPopupStepOnChange(reportPopup.step === 'news' ? 'name' : 'news', reportPopup)
                    }
                  />
                )}
                <Button
                  label={'취소'}
                  cate={'default'}
                  size={'m'}
                  color={'tertiary'}
                  disabled={isLoading}
                  onClick={() => setCheckReportPopup(true, reportPopup)}
                />
              </li>
              <li>
                {reportPopup.step === 'release' ? (
                  <Button
                    label={reportPopup.releaseStep.tabStatus === 'email' ? '발송하기' : '다운로드'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'primary'}
                    onClick={() => actionButton()}
                    isLoading={isLoading}
                    disabled={!reportPopup.newsStepActive}
                  />
                ) : (
                  <Button
                    label={'다음'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'primary'}
                    icoRight={true}
                    icoRightData={icoSvgData.chevronThickRight}
                    onClick={() =>
                      setMonitoringReportPopupStepOnChange(
                        reportPopup.step === 'name' ? 'news' : 'release',
                        reportPopup
                      )
                    }
                    disabled={!reportPopup.newsStepActive}
                  />
                )}
              </li>
            </ul>
          </div>
        }
        titleChildren={
          <>
            <h2 className="popup-header__title">보고서 만들기</h2>
            <div className="popup-header__steps mr-30">
              <div className="steps__group">
                <ul className="steps__list">
                  <li className={cn({ 'is-active': reportPopup.step === 'name' })}>
                    <p className="steps__text">이름</p>
                  </li>
                  <li className={cn({ 'is-active': reportPopup.step === 'news' })}>
                    <p className="steps__text">뉴스 정렬</p>
                  </li>
                  <li className={cn({ 'is-active': reportPopup.step === 'release' })}>
                    <p className="steps__text">발송 및 다운로드</p>
                  </li>
                </ul>
              </div>
            </div>
          </>
        }
      >
        {reportPopup.step === 'name' && <MonitoringReportName />}
        {reportPopup.step === 'news' && <MonitoringReportNews />}
        {reportPopup.step === 'release' && <MonitoringReportEmail />}
      </Popup>
    </>
  )
}

export default MonitoringReportPopup
