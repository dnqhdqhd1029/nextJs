import cn from 'classnames'
import moment from 'moment/moment'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { MonitoringSearchNewsDocumentDto } from '~/types/contents/Monitoring'
import { getDateFormat } from '~/utils/common/date'
import { useAppSelector } from '~/utils/hooks/common/useRedux'

const CoverageItem = (props: MonitoringSearchNewsDocumentDto) => {
  const { timeZone } = useAppSelector(state => state.authSlice)
  return (
    <li key={'activityDataList' + props.newsid?.toString() || ''}>
      <div className="list-type1__item">
        <div className="list-type1__ico">
          <IcoSvg data={icoSvgData.paperclipTilt1} />
        </div>
        <div className="list-type1__text">
          <a
            href={`/news/record/${Number(props.newsid) || 0}`}
            className={cn(`button-${'link-text'}`, `size-${'m'}`, `colors-${'body-link'}`)}
          >
            <span className={cn(`button__label button-${'link-text'}__label`, `size-${'m'}`)}>
              {props?.title || ''}
            </span>
          </a>
          <p>
            클립북 {props.authors && props.authors} {getDateFormat(timeZone, props?.inserted || '')}
          </p>
        </div>
      </div>
    </li>
  )
}

export default CoverageItem
