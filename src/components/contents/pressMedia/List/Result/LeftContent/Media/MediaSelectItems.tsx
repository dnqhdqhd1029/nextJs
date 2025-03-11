import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { JournalistMediaGroupItem } from '~/types/contents/PressMedia'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const MediaSelectItems = (props: JournalistMediaGroupItem) => {
  const { mediaArrayId, isOwner, setMediaChangeCategoryId } = usePressMediaListResult()
  return (
    <li id={'ContentItem' + props.mediaListId}>
      <button
        className={cn('select-form-option__item', {
          'is-selected': mediaArrayId.toString() === props.mediaListId?.toString(),
        })}
        onClick={() => setMediaChangeCategoryId(props, true, isOwner)}
      >
        {mediaArrayId.toString() === props.mediaListId?.toString() && <IcoSvg data={icoSvgData.checkThick} />}
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

export default MediaSelectItems
