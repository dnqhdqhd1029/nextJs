import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'

const ActionDeletePopup = () => {
  const { actionDelete, getActionData, setActionDelete, actionDeleteFunction } = useRecordActivity()

  return (
    <>
      <Popup
        width={500}
        isOpen={actionDelete.isOpen}
        onClose={() => setActionDelete(false, '', 0)}
        hasCloseButton
        title={'활동 삭제'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'삭제'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => getActionData !== null && actionDeleteFunction(getActionData)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setActionDelete(false, '', 0)}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">삭제하시겠습니까?</p>
          <br />
          <p className="font-body__regular">삭제 대상: {actionDelete.target}</p>
        </div>
      </Popup>
    </>
  )
}

export default ActionDeletePopup
