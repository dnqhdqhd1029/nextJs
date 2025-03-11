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
    mediaTab,
    timeZone,
    mediaIdKey,
    activityLoading,
    mediaActivityCountPage,
    mediaIdKeyParam,
    activityListByMediaId,
    getActivitySearchByMediaId,
  } = usePressMediaListResult()

  if (!mediaIdKeyParam) {
    return null
  }

  return (
    <div style={{ display: mediaTab === 'activity' ? 'block' : 'none' }}>
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
            ) : activityListByMediaId && activityListByMediaId.length > 0 ? (
              <>
                <ul className="list-type1__group before-none">
                  {activityListByMediaId.map(e => (
                    <li key={'activityListByMediaId' + e.actionId}>
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
                </ul>
                <div
                  className="list-type1__more"
                  style={{ paddingBottom: 40 }}
                >
                  <Button
                    label={'더보기'}
                    cate={'link-text'}
                    size={'m'}
                    color={'body-link'}
                    onClick={() => getActivitySearchByMediaId(mediaActivityCountPage + 10, 'activity', mediaIdKey)}
                  />
                </div>
              </>
            ) : (
              <div className="list-type1">활동이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
