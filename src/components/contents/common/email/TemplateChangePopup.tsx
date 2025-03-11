import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'

interface Props {
  onClose: () => void
  onConfirm: () => void
}

const TemplateChangePopup = ({ onClose, onConfirm }: Props) => {
  return (
    <>
      <Popup
        isOpen={true}
        onClose={onClose}
        hasCloseButtonLoading={false}
        hasCloseButton
        title={'템플릿 가져오기'}
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
            템플릿을 선택하면 이미 입력한 내용이 삭제되고 선택한 템플릿의 내용으로 수정됩니다.
            <br />
            템플릿을 가져오겠습니까?
          </p>
        </div>
      </Popup>
    </>
  )
}

export default TemplateChangePopup
