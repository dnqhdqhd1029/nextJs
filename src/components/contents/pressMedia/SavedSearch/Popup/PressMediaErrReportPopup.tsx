import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { openToast } from '~/utils/common/toast'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressMediaErrReportPopup = () => {
  const {
    isDemoLicense,
    pressMediaErrPopup,
    setPressMediaErrPopupAction,
    setPressMediaErrTitleAction,
    setPressMediaErrContentAction,
    pressMediaErrAction,
  } = useSavedSearch()
  const [isLoading, setIsLoading] = useState(false)

  const activityAction = async () => {
    if (isDemoLicense) {
      openToast('데모체험에서는 일부 기능이 제한됩니다.', 'error')
    } else {
      setIsLoading(() => true)
      await pressMediaErrAction(pressMediaErrPopup)
      setIsLoading(() => false)
    }
  }

  useEffect(() => {
    setIsLoading(() => false)
  }, [])
  return (
    <>
      <Popup
        isOpen={pressMediaErrPopup.isOpen}
        onClose={() =>
          setPressMediaErrPopupAction({
            isOpen: false,
            newsTitle: '',
            type: '',
            key: 0,
            title: '',
            titleErr: '',
            contents: '',
            contentErr: '',
          })
        }
        hasCloseButton
        title={'정보 업데이트 요청'}
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
              onClick={() =>
                setPressMediaErrPopupAction({
                  isOpen: false,
                  newsTitle: '',
                  type: '',
                  key: 0,
                  title: '',
                  titleErr: '',
                  contents: '',
                  contentErr: '',
                })
              }
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
                <p className="ipt-text-readonly">{pressMediaErrPopup.newsTitle}</p>
              </div>
            </li>
            <li>
              <FormInputText
                title={'제목'}
                required={true}
                onChange={e => setPressMediaErrTitleAction(e.target.value, pressMediaErrPopup)}
                failed={pressMediaErrPopup.titleErr !== ''}
                msg={pressMediaErrPopup.titleErr}
                value={pressMediaErrPopup.title}
              />
            </li>
            <li>
              <FormTitle
                title="내용"
                required={true}
              />
              <div
                className={cn('textarea__group', {
                  'is-succeeded': pressMediaErrPopup.contentErr === '',
                  'is-failed': pressMediaErrPopup.contentErr !== '',
                })}
              >
                <textarea
                  placeholder=""
                  rows={6}
                  onChange={e => setPressMediaErrContentAction(e.target.value, pressMediaErrPopup)}
                  value={pressMediaErrPopup.contents}
                ></textarea>
              </div>
              {pressMediaErrPopup.contentErr && (
                <FormMsg
                  msg={pressMediaErrPopup.contentErr}
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

export default PressMediaErrReportPopup
