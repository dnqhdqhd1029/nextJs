import { useState } from 'react'

import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'

const OwnerChangePopup = () => {
  const {
    ownerPopup,
    getActionDataKey,
    commonCodeCategory,
    commonCodeState,
    commonCodeStateFilter,
    commonCodeWorkType,
    commonCodeUpdateFieldName,
    getActionData,
    setOwnerPopupAction,
    ownerChangeAction,
  } = useRecordActivity()
  const [isLoading, setIsLoading] = useState(false)

  const actionButton = async () => {
    setIsLoading(() => true)
    await ownerChangeAction(
      ownerPopup,
      getActionData,
      getActionDataKey,
      commonCodeWorkType,
      commonCodeUpdateFieldName
      //
      // commonCodeCategory,
      // commonCodeState,
      // commonCodeStateFilter
    )
    setIsLoading(() => false)
  }

  return (
    <>
      <Popup
        width={500}
        isOpen={ownerPopup.isOpen}
        hasCloseButtonLoading={isLoading}
        onClose={() => setOwnerPopupAction({ isOpen: false, key: 0, name: '', activityId: 0 })}
        hasCloseButton
        title={'소유자 변경 확인'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => actionButton()}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={() => setOwnerPopupAction({ isOpen: false, key: 0, name: '', activityId: 0 })}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">공유 권한 설정에 따라 활동에 접근하지 못할 수 있습니다.</p>
          <p className="font-body__regular">{`이 활동의 소유자를 '${ownerPopup.name}'으로 변경하겠습니까?`}</p>
        </div>
      </Popup>
    </>
  )
}

export default OwnerChangePopup
