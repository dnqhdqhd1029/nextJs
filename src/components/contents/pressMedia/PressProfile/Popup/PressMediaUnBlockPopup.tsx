import { useEffect, useState } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormMsg from '~/components/common/ui/FormMsg'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'

const PressMediaUnBlockPopup = () => {
  const {
    journalDecodeList,
    pressMediaUnBlockPopup,
    setPressMediaUnBlockPopupAction,
    setPressMediaUnBlockTitleAction,
    setPressMediaUnBlockContentAction,
    pressMediaUnBlockAction,
  } = usePressProfile()
  const [isLoading, setIsLoading] = useState(false)

  const activityAction = async () => {
    setIsLoading(() => true)
    await pressMediaUnBlockAction(pressMediaUnBlockPopup, journalDecodeList)
    setIsLoading(() => false)
  }

  useEffect(() => {
    setIsLoading(() => false)
  }, [])
  return (
    <>
      <Popup
        isOpen={pressMediaUnBlockPopup.isOpen}
        onClose={() =>
          setPressMediaUnBlockPopupAction({
            isOpen: false,
            type: '',
            key: 0,
            title: '',
            titleErr: '',
            contents: '',
            contentErr: '',
          })
        }
        hasCloseButton
        title={'미디어비 수신 거부 해제 요청'}
        width={800}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'보내기'}
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
                setPressMediaUnBlockPopupAction({
                  isOpen: false,
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
          <ul>
            <li>
              <FormInputText
                title={'제목'}
                required={true}
                onChange={e => setPressMediaUnBlockTitleAction(e.target.value, pressMediaUnBlockPopup)}
                failed={pressMediaUnBlockPopup.titleErr !== ''}
                msg={pressMediaUnBlockPopup.titleErr}
                value={pressMediaUnBlockPopup.title}
              />
            </li>
            <li>
              <FormTitle
                title="내용"
                required={false}
              />
              <div
                className={cn('textarea__group', {
                  'is-succeeded': pressMediaUnBlockPopup.contentErr === '',
                  'is-failed': pressMediaUnBlockPopup.contentErr !== '',
                })}
              >
                <textarea
                  placeholder=""
                  rows={6}
                  onChange={e => setPressMediaUnBlockContentAction(e.target.value, pressMediaUnBlockPopup)}
                  value={pressMediaUnBlockPopup.contents}
                ></textarea>
              </div>
              {pressMediaUnBlockPopup.contentErr && (
                <FormMsg
                  msg={pressMediaUnBlockPopup.contentErr}
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

export default PressMediaUnBlockPopup
