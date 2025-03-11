import { Fragment, useRef } from 'react'

import Button from '~/components/common/ui/Button'
import FormTitle from '~/components/common/ui/FormTitle'
import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import { getDateFormat } from '~/utils/common/date'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const ContentComment = () => {
  const {
    timeZone,
    activityList,
    getActionData,
    activityId,
    contentsCommentText,
    contentsCommentErrorText,
    userInfo,
    contentsTab,
    createComment,
    contentsCommentList,
    setCreateCommentAction,
    setContentsCommentTextAction,
    eidtComment,
    setCommentPopupAction,
    setEditCommentAction,
    ownerFunction,
    haveComment,
    commentEdit,
  } = useActivityList()

  return (
    <>
      {contentsTab === 'comment' && (
        <div className="tabs-panel__section">
          <div className="tabs-panel__group">
            {contentsCommentList && contentsCommentList.length > 0 ? (
              <div className="list-type6__section">
                <ul className="list-type6__group">
                  {contentsCommentList.map(e => (
                    <li key={'ContentComment_list-type6-item__section' + e.actionCommentId}>
                      {eidtComment === e.actionCommentId ? (
                        <div
                          className="d-tabs-comment__write"
                          style={{ marginBottom: 20 }}
                        >
                          <div className="textarea__area">
                            <FormTitle title="댓글" />
                            <div className="textarea__group">
                              <textarea
                                rows={6}
                                maxLength={5000}
                                value={contentsCommentText}
                                onChange={e => setContentsCommentTextAction(e.target.value, contentsCommentText)}
                              />
                            </div>
                            <div style={{ color: 'red' }}>{contentsCommentErrorText}</div>
                          </div>
                          <div className="buttons__group type-right">
                            <Button
                              label={'수정'}
                              cate={'default'}
                              size={'s'}
                              color={'primary'}
                              onClick={() =>
                                e.actionCommentId && commentEdit(e.actionCommentId, contentsCommentText, activityId)
                              }
                            />
                            <Button
                              label={'취소'}
                              cate={'default'}
                              size={'s'}
                              color={'link-dark'}
                              onClick={() => setEditCommentAction(0, '')}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="list-type6-item__section">
                          {e?.content && (
                            <p
                              className="list-type6-item__text"
                              //style={{ whiteSpace: 'pre-wrap' }}
                            >
                              {e?.content?.split('\n').map((item, idx) => {
                                return (
                                  <Fragment key={idx}>
                                    {item.replaceAll(' ', `${'\u00A0'}`)}
                                    <br />
                                  </Fragment>
                                )
                              })}
                            </p>
                          )}
                          <p className="list-type6-item__info">
                            <Button
                              elem="a"
                              label={e.updater?.displayName || ''}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                              onClick={() => e?.updater && ownerFunction(e?.updater)}
                            />{' '}
                            <span>{getDateFormat(timeZone, e?.regisAt || '', true)}</span>
                          </p>
                          <div className="list-type6-item__control">
                            <Button
                              label={'수정'}
                              cate={'ico-only'}
                              size={'s'}
                              color={'secondary'}
                              icoLeft={true}
                              icoLeftData={icoSvgData.pencil}
                              icoSize={16}
                              title="수정"
                              onClick={() =>
                                e?.updater &&
                                e.actionCommentId &&
                                setEditCommentAction(e.actionCommentId, e?.content || '')
                              }
                            />
                            <Button
                              label={'삭제'}
                              cate={'ico-only'}
                              size={'s'}
                              color={'secondary'}
                              icoLeft={true}
                              icoLeftData={icoSvgData.trash}
                              icoSize={16}
                              onClick={() =>
                                e.actionCommentId && setCommentPopupAction({ isOpen: true, key: e.actionCommentId })
                              }
                            />
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="d-tabs__nodata">댓글이 없습니다.</div>
            )}
            {createComment ? (
              <div className="d-tabs-comment__write">
                <div className="textarea__area">
                  <FormTitle title="댓글" />
                  <div className="textarea__group">
                    <textarea
                      rows={6}
                      value={contentsCommentText}
                      maxLength={5000}
                      onChange={e => setContentsCommentTextAction(e.target.value, contentsCommentText)}
                    />
                  </div>
                  <div style={{ color: 'red' }}>{contentsCommentErrorText}</div>
                </div>
                <div className="buttons__group type-right">
                  <Button
                    label={'저장'}
                    cate={'default'}
                    size={'s'}
                    color={'primary'}
                    onClick={() =>
                      userInfo?.userId && haveComment(activityId, contentsCommentText, getActionData, activityList)
                    }
                  />
                  <Button
                    label={'취소'}
                    cate={'default'}
                    size={'s'}
                    color={'link-dark'}
                    onClick={() => setCreateCommentAction(false)}
                  />
                </div>
              </div>
            ) : (
              <div className="d-tabs-comment__button">
                <Button
                  label={'댓글 작성'}
                  cate={'default'}
                  size={'s'}
                  color={'tertiary'}
                  onClick={() => eidtComment < 1 && setCreateCommentAction(!createComment)}
                  disabled={eidtComment > 0}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ContentComment
