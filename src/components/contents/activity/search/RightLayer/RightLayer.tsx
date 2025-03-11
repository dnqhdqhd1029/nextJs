import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import ActivityLayer from '~/components/contents/activity/search/ContentLayer/Activity'
import ReleaseLayer from '~/components/contents/activity/search/ContentLayer/Release'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const RightLayer = () => {
  const { activityId, getActionData } = useActivityList()

  if (!activityId) {
    return null
  }

  if (!getActionData) {
    return null
  }
  return (
    <div className="aside-activity__section">
      <ul className="interval-mt20">
        <li>
          <div className="aside-activity__header">
            {activityId ? (
              <a
                href={`/activity/record/${Number(activityId) || 0}?category=${getActionData?.category}`}
                className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`, `colors-${'secondary'}`)}
              >
                <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                  자세히보기
                </span>
                <span className={cn(`button__ico-right button-${'link-text-arrow'}__ico-right`, [`ico-size${'m'}`])}>
                  <IcoSvg data={icoSvgData.chevronRight} />
                </span>
              </a>
            ) : (
              <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>자세히보기</span>
            )}
          </div>
        </li>
        <li>
          <h3 className="activity-detail__title">
            {getActionData?.category === 'PHONE_CALL' && <IcoSvg data={icoSvgData.actPhone} />}
            {getActionData?.category === 'MAILING' && <IcoSvg data={icoSvgData.actEmail} />}
            {getActionData?.category === 'PROMISE' && <IcoSvg data={icoSvgData.actPromise} />}
            {getActionData?.category === 'NOTE' && <IcoSvg data={icoSvgData.actNote} />}
            {getActionData?.category === 'PRESS_RELEASE' && <IcoSvg data={icoSvgData.actPressRelease} />}
            {getActionData?.category === 'INQUIRY' && <IcoSvg data={icoSvgData.actQuestion} />}
            {getActionData?.category === 'NEWSWIRE_RELEASE' && <IcoSvg data={icoSvgData.actNewswire} />}
            <a
              href={`/activity/record/${Number(activityId) || 0}?category=${getActionData?.category}`}
              className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`)}
            >
              <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
                <h3>
                  {getActionData?.category === 'PRESS_RELEASE'
                    ? getActionData?.mailingForAction?.titleForManage
                    : getActionData?.title || ''}
                </h3>
              </span>
            </a>
          </h3>
        </li>
        {getActionData.category !== 'PRESS_RELEASE' &&
        getActionData.category !== 'MAILING' &&
        getActionData.category !== 'NEWSWIRE_RELEASE' ? (
          <ActivityLayer />
        ) : (
          <ReleaseLayer />
        )}
      </ul>
    </div>
  )
}

export default RightLayer
