import moment from 'moment'

import Button from '~/components/common/ui/Button'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const ContentHistory = () => {
  const { contentsTab, contentsActionLogList, ownerFunction } = useActivityList()
  return (
    <>
      {contentsTab === 'log' && (
        <div className="tabs-panel__section">
          <div className="tabs-panel__group">
            <div className="list-type7__section">
              <ul className="interval-mt14">
                {contentsActionLogList &&
                  contentsActionLogList.map(e => (
                    <li key={'ContentHistory_list-type7-item__section' + e.actionLogId}>
                      <div className="list-type7-item__section">
                        <p className="list-type7-item__text">
                          <span className="date">{moment(e.regisAt).format('YYYY-MM-DD HH:mm')}</span>
                          <span className="name">
                            <Button
                              elem="a"
                              label={e?.register?.displayName || ''}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                              onClick={() => e?.register && ownerFunction(e?.register)}
                            />
                          </span>
                          {e.field && e.field === 'OWNER' && <span className="history">소유자 </span>}
                          {e.field && e.field === 'CATEGORY' && <span className="history">유형 </span>}
                          {e.field && e.field === 'TITLE' && <span className="history">제목 </span>}
                          {e.field && e.field === 'DATE' && <span className="history">날짜 </span>}
                          {e.field && e.field === 'CONTENT' && <span className="history">본문 </span>}
                          {e.field && e.field === 'RELATION' && <span className="history">연동 </span>}
                          {e.field && e.field === 'PROJECT' && <span className="history">프로젝트 </span>}
                          {e.field && e.field === 'TAG' && <span className="history">태그 </span>}
                          {e.field && e.field === 'ATTACHMENT' && <span className="history">첨부 </span>}
                          <span className="history">
                            {e?.workFieldNm && e?.workFieldNm !== ''} {e.workTypeNm}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default ContentHistory
