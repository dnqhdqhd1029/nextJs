import { useEffect, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { fieldListProps } from '~/stores/modules/contents/pressMedia/pressSearch'
import { getCurrencyFormat } from '~/utils/common/number'
import { usePressSearchOptions } from '~/utils/hooks/contents/pressMedia/usePressSearch'

const MediaLocationItem = (props: fieldListProps) => {
  const { mediaLocationPopup, setMediaLocationPopupSelectedItem } = usePressSearchOptions()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (mediaLocationPopup.selectedType.length > 0) {
      const find = mediaLocationPopup.selectedType.find(e => e.id === props.name.toString())
      setIsSelected(() => !!find)
    } else {
      setIsSelected(() => false)
    }
  }, [mediaLocationPopup.selectedType])
  return (
    <li>
      <div className="tree-menu__button-input">
        <FormInputBtn
          type="checkbox"
          name={'menu__button_MediaTypePopup' + props.name}
          id={'menu__button_MediaTypePopup' + props.name}
          checkDataLimit={30}
          checkDataLimitDisable={30 === mediaLocationPopup.selectedType.length ? 'action' : 'non'}
          label={props.name}
          subLabel={getCurrencyFormat(props.count)}
          onChange={() => setMediaLocationPopupSelectedItem(isSelected, props, mediaLocationPopup)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}

export default MediaLocationItem
