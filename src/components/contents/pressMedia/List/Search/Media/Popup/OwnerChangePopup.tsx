import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const MediaOwnerChangePopup = () => {
  const { ownerPopup, ownerChangeAction, setOwnerPopupAction } = useMediaListManagement()

  return (
    <>
      <Popup
        width={500}
        isOpen={ownerPopup.isOpen}
        onClose={() => setOwnerPopupAction({ isOpen: false, key: 0, name: '', mediaId: 0, title: '' })}
        hasCloseButton
        title={'소유자 변경 확인'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => ownerChangeAction(ownerPopup)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setOwnerPopupAction({ isOpen: false, key: 0, name: '', mediaId: 0, title: '' })}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">공유 권한 설정에 따라 목록에 접근하지 못할 수 있습니다.</p>
          <p className="font-body__regular">{`이 목록의 소유자를 '${ownerPopup.name}'으로 변경하겠습니까?`}</p>
        </div>
      </Popup>
    </>
  )
}

export default MediaOwnerChangePopup
