import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const PressSelectItems = (props: JournalistMediaGroupItem) => {
  const { journalArrayId, isOwner, setPressChangeCategoryId } = usePressMediaListResult()
  return (
    <li id={'ContentItem' + props.jrnlstListId}>
      <button
        className={cn('select-form-option__item', {
          'is-selected': journalArrayId.toString() === props.jrnlstListId?.toString(),
        })}
        onClick={() => setPressChangeCategoryId(props, true, isOwner)}
      >
        {journalArrayId.toString() === props.jrnlstListId?.toString() && <IcoSvg data={icoSvgData.checkThick} />}
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

export default PressSelectItems
