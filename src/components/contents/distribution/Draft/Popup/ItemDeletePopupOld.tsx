import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useDraft } from '~/utils/hooks/contents/draft/useDraft'

const ItemDeletePopupOld = () => {
  const { draftListPopup, setSelectedDeleteData, selectedDeleteAction } = useDraft()

  return (
    <>
      <Popup
        isOpen={draftListPopup.isOpen}
        onClose={() => setSelectedDeleteData(0, '', false)}
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
              onClick={() => selectedDeleteAction(draftListPopup.key)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setSelectedDeleteData(0, '', false)}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">
            삭제하겠습니까?
            <br />
            삭제대상: {draftListPopup.title}
          </p>
        </div>
      </Popup>
    </>
  )
}

export default ItemDeletePopupOld
