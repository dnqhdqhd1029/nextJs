import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { clipbookContentListProps } from '~/stores/modules/contents/monitoring/clipbook'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const SelectItems = (props: clipbookContentListProps) => {
  const { clipbookIdKey, isOwner, setChangeCategoryId } = useClipbookDetail()
  return (
    <li id={'ContentItem' + props.clipBookId}>
      <button
        className={cn('select-form-option__item', {
          'is-selected': clipbookIdKey.toString() === props.clipBookId?.toString(),
        })}
        onClick={() => setChangeCategoryId(props, true, isOwner)}
      >
        {clipbookIdKey.toString() === props.clipBookId?.toString() && <IcoSvg data={icoSvgData.checkThick} />}
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
