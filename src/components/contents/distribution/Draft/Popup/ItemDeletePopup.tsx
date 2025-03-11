import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'

const ItemDeletePopup = ({
  title,
  isLoading,
  onClose,
  onDelete,
}: {
  title: string
  isLoading: boolean
  onClose: () => void
  onDelete: () => void
}) => {
  return (
    <>
      <Popup
        isOpen={true}
        onClose={onClose}
        hasCloseButton
        title={'삭제하기'}
        width={500}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'삭제'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              isLoading={isLoading}
              disabled={isLoading}
              onClick={onDelete}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              disabled={isLoading}
              onClick={onClose}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            삭제하겠습니까?
            <br />
            삭제대상: {title}
          </p>
        </div>
      </Popup>
    </>
  )
}

export default ItemDeletePopup
