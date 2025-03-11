import { useEffect, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { mediaFieldListProps } from '~/stores/modules/contents/pressMedia/mediaSearch'
import { getCurrencyFormat } from '~/utils/common/number'
import { useMediaSearchOptions } from '~/utils/hooks/contents/pressMedia/useMediaSearchOptions'

const FieldItem = (props: mediaFieldListProps) => {
  const { mediaFieldPopup, setMediaFieldPopupSelectedItem } = useMediaSearchOptions()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (mediaFieldPopup.selectedType.length > 0) {
      const find = mediaFieldPopup.selectedType.find(e => e.id === props.name.toString())
      setIsSelected(() => !!find)
    } else {
      setIsSelected(() => false)
    }
  }, [mediaFieldPopup.selectedType])

  useEffect(() => {}, [])

  return (
    <li>
      <div className="tree-menu__button-input">
        <FormInputBtn
          type="checkbox"
          name={'menu__button_MediaTypePopup' + props.name}
          id={'menu__button_MediaTypePopup' + props.name}
          checkDataLimit={30}
          checkDataLimitDisable={30 === mediaFieldPopup.selectedType.length ? 'action' : 'non'}
          label={props.name}
          subLabel={getCurrencyFormat(props.count)}
          onChange={() => setMediaFieldPopupSelectedItem(isSelected, props, mediaFieldPopup)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}

export default FieldItem
