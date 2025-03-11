import { Fragment, useCallback, useEffect, useRef } from 'react'
import cn from 'classnames'
import DOMPurify from 'dompurify'

import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import TagList from '~/components/common/ui/TagList'
import { defaultReportFormOptionList } from '~/components/contents/monitoring/SearchResult/defaultData'
import MonitoringFormItem from '~/components/contents/monitoring/SearchResult/Popup/MonitoringFormItem'
import ReportReceiverUser from '~/components/contents/monitoring/SearchResult/Popup/ReportReceiverUser'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const MonitoringReportEmail = () => {
  const {
    reportPopup,
    setMonitoringReportPopupTargetEmailpAction,
    setMonitoringReportPopupResetTagListOnChange,
    setMonitoringReportPopupTagListOnChange,
    setMonitoringReportPopupResetAddEmail,
    setMonitoringReportPopupTargetEmailCloseOnChange,
    setMonitoringReportPopupResetTargetEmailCloseOnChange,
    setMonitoringReportPopupSharedPopupContentAction,
    setMonitoringReportReleaseTabAction,
    setMonitoringReportReleaseFormAction,
    setMonitoringReportPopupTitle,
  } = useMonitoringSearchResult()

  const convertToHtml = (text: string) => {
    // HTML 엔티티를 디코딩하여 원래 문자로 변환
    const decodedText = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

    const htmlContent = decodedText.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')

    return DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: ['br', 'p', 'span', 'div'],
      ALLOWED_ATTR: ['class', 'style'],
    })
  }

  return (
    <div className="popup-contents__section">
      <div className="tabs__section type1-medium">
        <div className="tabs-menu__group">
          <ul className="tabs-menu__list">
            <li className={reportPopup.releaseStep.tabStatus === 'email' ? 'is-active' : ''}>
              <button
                type="button"
                className="tabs-menu__btn"
                onClick={() => setMonitoringReportReleaseTabAction('email', reportPopup)}
              >
                <span className="tabs-menu__name">이메일 발송</span>
              </button>
            </li>
            <li className={reportPopup.releaseStep.tabStatus !== 'email' ? 'is-active' : ''}>
              <button
                type="button"
                className="tabs-menu__btn"
                onClick={() => setMonitoringReportReleaseTabAction('download', reportPopup)}
              >
                <span className="tabs-menu__name">다운로드</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="tabs-panel__section">
          <div className="tabs-panel__group">
            <ul>
              {reportPopup.releaseStep.tabStatus === 'email' ? (
                <Fragment>
                  <li>
                    <div className="template-ipt-btn__section type-icon">
                      <FormTitle
                        title={'양식'}
                        required={true}
                      />
                      <div className="font-body__group">
                        <p className="font-body__regular">동시에 여러 개를 선택할 수 있습니다.</p>
                      </div>
                      <ul className="template-ipt-btn__list">
                        {defaultReportFormOptionList.map(e => (
                          <MonitoringFormItem
                            key={'defaultReportFormOptionList' + e.id}
                            {...e}
                          />
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <FormTitle
                      title="메일 제목"
                      required={true}
                    />
                    <FormInputText
                      onChange={e => setMonitoringReportPopupTitle(e.target.value, reportPopup)}
                      failed={reportPopup.releaseStep.titleErr !== ''}
                      msg={reportPopup.releaseStep.titleErr}
                      value={reportPopup.releaseStep.title}
                    />
                  </li>
                  <li>
                    <div className="select-form__section select-form-btn">
                      <FormTitle
                        title={'받는 사람'}
                        required={true}
                      />
                      <ReportReceiverUser />
                      {reportPopup.releaseStep.receiverErr !== '' && (
                        <FormMsg
                          msg={reportPopup.releaseStep.receiverErr}
                          type={'error'}
                        />
                      )}
                      <TagList
                        isTitle={true}
                        tagItems={reportPopup.releaseStep.receiverList}
                        onTagItemClose={e => setMonitoringReportPopupTagListOnChange(e, reportPopup)}
                        onAllTagItemClose={() => setMonitoringReportPopupResetTagListOnChange(reportPopup)}
                      />
                    </div>
                  </li>
                  <li>
                    <FormTitle title={'받는 메일 추가'} />
                    <div className="select-form__section select-form-input">
                      <div className="select-form__group">
                        <div className={cn('ipt-text__group', 'container-type')}>
                          <FormInputText
                            value={reportPopup.releaseStep.addEmail}
                            onAdd={e => setMonitoringReportPopupTargetEmailpAction(reportPopup)}
                            addBtn={true}
                            onChange={e => setMonitoringReportPopupResetAddEmail(e.target.value, reportPopup)}
                          />
                        </div>
                      </div>
                    </div>
                    {reportPopup.releaseStep.targetEmailErr !== '' && (
                      <FormMsg
                        msg={reportPopup.releaseStep.targetEmailErr}
                        type={'error'}
                      />
                    )}
                    <TagList
                      isTitle={true}
                      tagItems={reportPopup.releaseStep.targetEmail}
                      onTagItemClose={e => setMonitoringReportPopupTargetEmailCloseOnChange(e, reportPopup)}
                      onAllTagItemClose={() => setMonitoringReportPopupResetTargetEmailCloseOnChange(reportPopup)}
                    />
                  </li>
                  <li style={{ paddingTop: 20 }}>
                    <FormTitle title="메세지" />
                    <div className="textarea__group">
                      <textarea
                        placeholder=""
                        rows={6}
                        onChange={e =>
                          setMonitoringReportPopupSharedPopupContentAction(convertToHtml(e.target.value), reportPopup)
                        }
                        value={reportPopup.releaseStep.contents
                          .replace(/<br\/?>/g, '\n')
                          .replace(/&nbsp;/g, ' ')
                          .replace(/&lt;/g, '<')
                          .replace(/&gt;/g, '>')
                          .replace(/&amp;/g, '&')}
                      ></textarea>
                    </div>
                  </li>
                </Fragment>
              ) : (
                <li>
                  <div className="template-ipt-btn__section type-icon">
                    <FormTitle
                      title={'양식'}
                      required={true}
                    />
                    <div className="font-body__group">
                      <p className="font-body__regular">동시에 여러 개를 선택할 수 있습니다.</p>
                    </div>
                    <ul className="template-ipt-btn__list">
                      <li>
                        <div className="template-ipt-btn__item">
                          <input
                            type="checkbox"
                            name="wordFill"
                            id="wordFill"
                            checked={reportPopup.releaseStep.isWordDownload}
                            onChange={e =>
                              setMonitoringReportReleaseFormAction(e.target.checked, 'isWordDownload', reportPopup)
                            }
                          />
                          <label htmlFor="wordFill">
                            <b className="item__thumb">
                              <span className="item-thumb__img">
                                <IcoSvg data={icoSvgData.wordFill} />
                              </span>
                            </b>
                            <span className="item__label">워드</span>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="template-ipt-btn__item">
                          <input
                            type="checkbox"
                            name="pdfFill"
                            id="pdfFill"
                            checked={reportPopup.releaseStep.isPdfDownload}
                            onChange={e =>
                              setMonitoringReportReleaseFormAction(e.target.checked, 'isPdfDownload', reportPopup)
                            }
                          />
                          <label htmlFor="pdfFill">
                            <b className="item__thumb">
                              <span className="item-thumb__img">
                                <IcoSvg data={icoSvgData.pdfFill} />
                              </span>
                            </b>
                            <span className="item__label">PDF</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonitoringReportEmail
