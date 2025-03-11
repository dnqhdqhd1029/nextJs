import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { JournalistSrchDto, MediaSrchDto } from '~/types/api/service'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressSelectItems = (props: JournalistSrchDto) => {
  const { savedJournalKey, isOwner, setPressChangeCategoryId } = useSavedSearch()
  return (
    <li id={'ContentItem' + props.jrnlstSrchId}>
      <button
        className={cn('select-form-option__item', {
          'is-selected': savedJournalKey.toString() === props.jrnlstSrchId?.toString(),
        })}
        onClick={() => setPressChangeCategoryId(props, true, isOwner)}
      >
        {savedJournalKey.toString() === props.jrnlstSrchId?.toString() && <IcoSvg data={icoSvgData.checkThick} />}
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
