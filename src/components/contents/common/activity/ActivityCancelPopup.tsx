import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useActivityPopup } from '~/utils/hooks/contents/activity/useActivityPopup'

const ActivityCancelPopup = () => {
  const {
    activityCancelPopup,
    setActivityPopup,
    activity,
    editorData,
    setActivityCancelPopupAction,
    nextStepValidate,
    setActivityAction,
  } = useActivityPopup()
  const [isLoading, setIsLoading] = useState(false)

  const activityAction = async () => {
    setIsLoading(() => true)
    const res = await nextStepValidate(activity)
    if (res) await setActivityAction(activity, editorData)
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        width={500}
        isOpen={activityCancelPopup}
        hasCloseButtonLoading={isLoading}
        onClose={() => setActivityCancelPopupAction(false)}
        hasCloseButton
        title={'저장하기'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'저장'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => activityAction()}
            />
            <Button
              label={'저장 안 함'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => setActivityPopup()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => setActivityCancelPopupAction(false)}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">입력 및 수정된 내용이 있습니다. 저장하겠습니까?</p>
        </div>
      </Popup>
    </>
  )
}

export default ActivityCancelPopup
