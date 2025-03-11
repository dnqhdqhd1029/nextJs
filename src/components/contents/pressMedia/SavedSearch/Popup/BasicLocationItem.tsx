import { useEffect, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { fieldListProps } from '~/stores/modules/contents/pressMedia/pressSearch'
import { getCurrencyFormat } from '~/utils/common/number'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const BasicLocationItem = (props: fieldListProps) => {
  const { basicLocationPopup, setBasicLocationPopupSelectedItem } = useSavedSearch()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (basicLocationPopup.selectedType.length > 0) {
      const find = basicLocationPopup.selectedType.find(e => e.id === props.name.toString())
      setIsSelected(() => !!find)
    } else {
      setIsSelected(() => false)
    }
  }, [basicLocationPopup.selectedType])
  return (
    <li>
      <div className="tree-menu__button-input">
        <FormInputBtn
          type="checkbox"
          name={'menu__button_MediaTypePopup' + props.name}
          id={'menu__button_MediaTypePopup' + props.name}
          checkDataLimit={30}
          checkDataLimitDisable={30 === basicLocationPopup.selectedType.length ? 'action' : 'non'}
          label={props.name}
          subLabel={getCurrencyFormat(props.count)}
          onChange={() => setBasicLocationPopupSelectedItem(isSelected, props, basicLocationPopup)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}

export default BasicLocationItem
