import { useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { openToast } from '~/utils/common/toast'
import { useMonitoringSearchDetail } from '~/utils/hooks/contents/monitoring/useMonitoringSearchDetail'

const NewsErrReportPopup = () => {
  const {
    newsErrPopup,
    newsApiParams,
    isDemoLicense,
    newsIdParams,
    initNewsErrPopupData,
    setNewsErrPopupTitleAction,
    setNewsErrPopupContentAction,
    newsErrReportPopupAction,
  } = useMonitoringSearchDetail()
  const [isLoading, setIsLoading] = useState(false)

  const activityAction = async () => {
    if (newsIdParams) {
      setIsLoading(() => true)
      if (isDemoLicense) {
        openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
      } else {
        await newsErrReportPopupAction(newsErrPopup, newsApiParams, newsIdParams)
      }
      setIsLoading(() => false)
    }
  }
  return (
    <>
      <Popup
        isOpen={newsErrPopup.isOpen}
        onClose={() => initNewsErrPopupData()}
        hasCloseButton
        title={'잘못 수집된 뉴스 신고'}
        width={800}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => activityAction()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => initNewsErrPopupData()}
            />
          </div>
        }
      >
        <div className="popup-contents__section">
          <div className="mb-contents-pb16__group">
            <p className="font-body__regular">
              잘못 표기된 내용이나 추가할 정보를 알려주시면 확인 후 수정하겠습니다.
              <br />
              회원님의 기여에 감사드립니다.
            </p>
          </div>

          <ul>
            <li>
              <div className="ipt-text__area">
                <FormTitle title="대상" />
                <p className="ipt-text-readonly">{newsErrPopup.newsTitle}</p>
              </div>
            </li>
            <li>
              <FormInputText
                title={'제목'}
                required={true}
                onChange={e => setNewsErrPopupTitleAction(e.target.value, newsErrPopup)}
                failed={newsErrPopup.titleErr !== ''}
                msg={newsErrPopup.titleErr}
                value={newsErrPopup.title}
              />
            </li>
            <li>
              <FormTitle
                title="내용"
                required={true}
              />
              <div
                className={cn('textarea__group', {
                  'is-succeeded': newsErrPopup.contentErr === '',
                  'is-failed': newsErrPopup.contentErr !== '',
                })}
              >
                <textarea
                  placeholder=""
                  rows={6}
                  onChange={e => setNewsErrPopupContentAction(e.target.value, newsErrPopup)}
                  value={newsErrPopup.contents}
                ></textarea>
              </div>
              {newsErrPopup.contentErr && (
                <FormMsg
                  msg={newsErrPopup.contentErr}
                  type={'error'}
                />
              )}
            </li>
          </ul>
        </div>
      </Popup>
    </>
  )
}

export default NewsErrReportPopup
