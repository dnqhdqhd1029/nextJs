import cn from 'classnames'
import moment from 'moment/moment'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { searchContentListProps } from '~/stores/modules/contents/pressMedia/pressProfile'
import { getDateFormat } from '~/utils/common/date'
import { usePressProfile } from '~/utils/hooks/contents/pressMedia/usePressProfile'

const ActivityItem = (props: searchContentListProps) => {
  const { timeZone } = usePressProfile()

  return (
    <li key={'activityDataList' + props.actionId?.toString() || ''}>
      <div className="list-type1__item">
        <div className="list-type1__ico">
          {props?.category === 'PHONE_CALL' && <IcoSvg data={icoSvgData.actPhone} />}
          {props?.category === 'MAILING' && <IcoSvg data={icoSvgData.actEmail} />}
          {props?.category === 'PROMISE' && <IcoSvg data={icoSvgData.actPromise} />}
          {props?.category === 'NOTE' && <IcoSvg data={icoSvgData.actNote} />}
          {props?.category === 'PRESS_RELEASE' && <IcoSvg data={icoSvgData.actPressRelease} />}
          {props?.category === 'INQUIRY' && <IcoSvg data={icoSvgData.actQuestion} />}
          {props?.category === 'NEWSWIRE_RELEASE' && <IcoSvg data={icoSvgData.actNewswire} />}
        </div>
        <div className="list-type1__text">
          <a
            href={`/activity/record/${Number(props.actionId) || 0}`}
            className={cn(`button-${'link-text-arrow'}`, `size-${'m'}`, `colors-${'primary'}`)}
          >
            <span className={cn(`button__label button-${'link-text-arrow'}__label`, `size-${'m'}`)}>
              {props?.category === 'PRESS_RELEASE' ? props?.titleForManage : props?.title || ''}
            </span>
          </a>
          <p>
            {props.categoryName} {props.stateName} {props.owner && props.owner.displayName}{' '}
            {props.cuType === 'CREATE'
              ? getDateFormat(timeZone, props?.regisAt || '')
              : getDateFormat(timeZone, props?.updateAt || '')}
          </p>
        </div>
      </div>
    </li>
  )
}

export default ActivityItem
