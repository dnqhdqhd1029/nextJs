import Button from '~/components/common/ui/Button'
import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Popup from '~/components/common/ui/Popup'
import { useTagActivity } from '~/utils/hooks/contents/activity/useTagActivity'

const TagDeletePopup = () => {
  const { tagPopup, tagListParams, tagType, deleteTagPopupAction, setInitTagPopupAction } = useTagActivity()

  return (
    <>
      <Popup
        width={500}
        isOpen={tagPopup.isOpen && tagPopup.type === 'delete'}
        onClose={() => setInitTagPopupAction()}
        hasCloseButton
        title={'태그 삭제'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={tagPopup.confirmText}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => deleteTagPopupAction(tagPopup, tagListParams, tagType)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setInitTagPopupAction()}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">삭제하면 복구할 수 없습니다. 삭제하시겠습니까?</p>
          <br />
          <p className="font-body__regular">삭제 대상: {tagPopup.target}</p>
        </div>
      </Popup>
    </>
  )
}

export default TagDeletePopup
