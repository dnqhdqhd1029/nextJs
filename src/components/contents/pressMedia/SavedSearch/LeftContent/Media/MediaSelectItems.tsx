import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { MediaSrchDto } from '~/types/api/service'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const MediaSelectItems = (props: MediaSrchDto) => {
  const { savedMediaKey, isOwner, setMediaChangeCategoryId } = useSavedSearch()
  return (
    <li id={'ContentItem' + props.mediaSrchId}>
      <button
        className={cn('select-form-option__item', {
          'is-selected': savedMediaKey.toString() === props.mediaSrchId?.toString(),
        })}
        onClick={() => setMediaChangeCategoryId(props, true, isOwner)}
      >
        {savedMediaKey.toString() === props.mediaSrchId?.toString() && <IcoSvg data={icoSvgData.checkThick} />}
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
