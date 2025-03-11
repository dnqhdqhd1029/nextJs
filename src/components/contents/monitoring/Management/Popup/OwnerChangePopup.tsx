import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'
import { useMonitoringManagement } from '~/utils/hooks/contents/monitoring/useManagement'

const OwnerChangePopup = () => {
  const { managementListParams, ownerPopup, ownerChangeAction, setOwnerPopupAction } = useMonitoringManagement()

  return (
    <>
      <Popup
        width={500}
        isOpen={ownerPopup.isOpen}
        onClose={() => setOwnerPopupAction({ isOpen: false, key: 0, name: '', monitoringId: 0 })}
        hasCloseButton
        title={'소유자 변경 확인'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => ownerChangeAction(ownerPopup, managementListParams)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setOwnerPopupAction({ isOpen: false, key: 0, name: '', monitoringId: 0 })}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">공유 권한 설정에 따라 모니터링에 접근하지 못할 수 있습니다.</p>
          <p className="font-body__regular">{`이 모니터링의 소유자를 '${ownerPopup.name}'으로 변경하겠습니까?`}</p>
        </div>
      </Popup>
    </>
  )
}

export default OwnerChangePopup
