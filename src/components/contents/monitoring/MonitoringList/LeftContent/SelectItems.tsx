import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { NewsSrchDto } from '~/types/api/service'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const SelectItems = (props: NewsSrchDto) => {
  const { monitoringIdParams, isOwner, monitoringDate, monitoringListParams, setChangeCategoryId } =
    useMonitoringSearch()
  return (
    <li id={'ContentItem' + props.newsSrchId}>
      <button
        className={cn('select-form-option__item', {
          'is-selected': monitoringIdParams.toString() === props.newsSrchId?.toString(),
        })}
        onClick={() => setChangeCategoryId(props, monitoringDate, monitoringListParams, true, isOwner)}
      >
        {monitoringIdParams.toString() === props.newsSrchId?.toString() && <IcoSvg data={icoSvgData.checkThick} />}
        <span
          className="select-form-option__item-text"
          style={{ paddingLeft: 5 }}
        >
          {props.title}
        </span>
      </button>
    </li>
  )
}

export default SelectItems
