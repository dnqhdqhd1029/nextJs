import { useEffect, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'
import { getCurrencyFormat } from '~/utils/common/number'
import { openToast } from '~/utils/common/toast'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const MediaTypeItem = (props: CommonCode) => {
  const { mediaTypePopup, setMediaTypePopupSelectedItem } = useMonitoringSearch()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (mediaTypePopup.selectedType.length > 0) {
      const find = mediaTypePopup.selectedType.find(e => e.label === props.name.toString())
      setIsSelected(() => !!find)
    } else {
      setIsSelected(() => false)
    }
  }, [mediaTypePopup.selectedType])
  return (
    <li>
      <div className="tree-menu__button-input">
        <FormInputBtn
          type="checkbox"
          name={'menu__button_MediaTypePopup' + props.commonCodeId}
          id={'menu__button_MediaTypePopup' + props.commonCodeId}
          checkDataLimit={30}
          checkDataLimitDisable={30 === mediaTypePopup.selectedType.length ? 'action' : 'non'}
          label={props.name}
          subLabel={getCurrencyFormat(props.count)}
          onChange={() => setMediaTypePopupSelectedItem(isSelected, props, mediaTypePopup)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}

export default MediaTypeItem
