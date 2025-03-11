import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'

interface Props {
  onClose: () => void
  onConfirm: () => void
}

const TemplateDeletePopup = ({ onClose, onConfirm }: Props) => {
  return (
    <>
      <Popup
        isOpen={true}
        onClose={onClose}
        hasCloseButtonLoading={false}
        hasCloseButton
        title={'템플릿 제거하기'}
        width={600}
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
          <p
            className="font-body__regular"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            템플릿을 사용해 이미 입력한 내용이 있습니다. 사용 안함을 선택하면 이미 입력한 내용이 삭제됩니다.
            <br />
            템플릿을 제거하겠습니까?
          </p>
        </div>
      </Popup>
    </>
  )
}

export default TemplateDeletePopup
