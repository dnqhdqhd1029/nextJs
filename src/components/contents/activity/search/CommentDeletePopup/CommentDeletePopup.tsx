import Button from '~/components/common/ui/Button'
import Popup from '~/components/common/ui/Popup'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const CommentDeletePopup = () => {
  const { commentPopup, activityList, getActionData, activityId, commentDelete, setCommentPopupAction } =
    useActivityList()

  return (
    <>
      <Popup
        width={500}
        isOpen={commentPopup.isOpen}
        onClose={() => setCommentPopupAction({ isOpen: false, key: 0 })}
        hasCloseButton
        title={'댓글 삭제'}
        buttons={
          <div className="popup-footer__section">
            <Button
              label={'삭제'}
              cate={'default'}
              size={'m'}
              color={'primary'}
              onClick={() => commentDelete(commentPopup.key, activityId, getActionData, activityList)}
            />
            <Button
              label={'취소'}
              cate={'default'}
              size={'m'}
              color={'link-dark'}
              onClick={() => setCommentPopupAction({ isOpen: false, key: 0 })}
            />
          </div>
        }
      >
        <div className="mb-contents-pb16__group">
          <p className="font-body__regular">이 댓글을 삭제하겠습니까?</p>
        </div>
      </Popup>
    </>
  )
}

export default CommentDeletePopup
