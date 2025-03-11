import { useEffect } from 'react'
import moment from 'moment'

import Button from '~/components/common/ui/Button'
import { getDateFormat } from '~/utils/common/date'
import { useRecordActivity } from '~/utils/hooks/contents/activity/useRecordActivity'
import { useSearchActivity } from '~/utils/hooks/contents/activity/useSearchActivity'
const ContentHistory = () => {
  const { contentsTab, timeZone, contentsActionLogList, ownerFunction } = useRecordActivity()

  return (
    <>
      {contentsTab === 'log' && (
        <div className="tabs-panel__section">
          <div className="tabs-panel__group">
            <div className="list-type7__section">
              <ul className="interval-mt14">
                {contentsActionLogList &&
                  contentsActionLogList.map(e => (
                    <li key={'ActivitySearch_list-type7-item__section' + e.actionLogId}>
                      <div className="list-type7-item__section">
                        <p className="list-type7-item__text">
                          <span className="date">{getDateFormat(timeZone, e?.regisAt || '', true)}</span>
                          <span className="name">
                            <Button
                              elem="a"
                              label={e?.register?.name || ''}
                              cate={'link-text'}
                              size={'m'}
                              color={'body-link'}
                              onClick={() => e?.register && ownerFunction(e?.register)}
                            />
                          </span>
                          <span className="history">
                            {e?.workFieldNm && e?.workFieldNm !== '' && e?.workFieldNm} {e.workTypeNm}
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
