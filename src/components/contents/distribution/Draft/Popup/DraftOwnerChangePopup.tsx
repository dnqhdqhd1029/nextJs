import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { UserDtoForGroup } from '~/types/api/service'

const DraftOwnerChangePopup = ({
  owner_info,
  onClose,
  onConfirm,
}: {
  owner_info: UserDtoForGroup
  onClose: () => void
  onConfirm: () => void
}) => {
  return (
    <>
      <Popup
        width={500}
        isOpen={true}
        onClose={onClose}
        hasCloseButton
        title={'소유자 변경 확인'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'확인'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={onConfirm}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={onClose}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">공유 권한 설정에 따라 맞춤 검색에 접근하지 못할 수 있습니다.</p>
          <p className="font-body__regular">{`이 맞춤 검색의 소유자를 '${owner_info.nickname}'으로 변경하겠습니까?`}</p>
        </div>
      </Popup>
    </>
  )
}

export default DraftOwnerChangePopup
