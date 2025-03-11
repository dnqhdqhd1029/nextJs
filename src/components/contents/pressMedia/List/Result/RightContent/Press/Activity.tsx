import cn from 'classnames'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '~/components/common/ui/Button'
import Skeleton from '~/components/common/ui/Skeleton'
import { getDateFormat } from '~/utils/common/date'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const Activity = () => {
  const router = useRouter()
  const {
    journalTab,
    timeZone,
    journalIdKey,
    activityLoading,
    journalActivityCountPage,
    journalIdKeyParam,
    activityListByJournalId,
    getActivitySearchByJournalId,
  } = usePressMediaListResult()

  if (!journalIdKeyParam) {
    return null
  }

  return (
    <div style={{ display: journalTab === 'activity' ? 'block' : 'none' }}>
      <div className={cn('profile__section', { 'tab-content__container': true })}>
        <div className="tabs-panel__group">
          <div className="list-type1__section">
            {activityLoading ? (
              <ul className="list-type1__group before-none">
                {Array.from({ length: 20 }).map((e, index) => (
                  <li key={'list-type5-list-type8__group' + 'searchContentList' + index}>
                    <Skeleton
                      key={10}
                      width={'100%'}
                      height={'42px'}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="list-type1__group before-none">
                {activityListByJournalId && activityListByJournalId.length > 0 ? (
                  <>
                    {activityListByJournalId.map(e => (
                      <li key={'newsListByJournalId' + e.actionId}>
                        <div className="list-type1__item">
                          <div className="list-type1__text">
                            <a
                              href={`/activity/record/${Number(e.actionId) || 0}`}
                              className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`, `colors-${'primary'}`)}
                            >
                              <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                                {e?.title || ''}
                              </span>
                            </a>
                            <p>
                              {e.categoryName} {e.stateName} {e.owner && e.owner.displayName}{' '}
                              {e.cuType === 'CREATE'
                                ? getDateFormat(timeZone, e?.regisAt || '')
                                : getDateFormat(timeZone, e?.updateAt || '')}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                    <div
                      className="list-type1__more"
                      style={{ paddingBottom: 40 }}
                    >
                      <Button
                        label={'더보기'}
                        cate={'link-text'}
                        size={'m'}
                        color={'body-link'}
                        onClick={() =>
                          getActivitySearchByJournalId(journalActivityCountPage + 10, 'activity', journalIdKey)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <div>활동이 없습니다.</div>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
