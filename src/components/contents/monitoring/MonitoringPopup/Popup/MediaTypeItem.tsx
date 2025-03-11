import { useEffect, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { CommonCode } from '~/utils/api/common/useGetCommonCode'
import { openToast } from '~/utils/common/toast'
import { useMonitoringPopup } from '~/utils/hooks/contents/monitoring/useMonitoringPopup'

const MediaTypeItem = (props: CommonCode) => {
  const { monitoringSearchPopup, setMediaTypePopupSelectedItem } = useMonitoringPopup()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (monitoringSearchPopup.mediaTypePopup.selectedType.length > 0) {
      const find = monitoringSearchPopup.mediaTypePopup.selectedType.find(e => e.label === props.name.toString())
      setIsSelected(() => !!find)
    } else {
      setIsSelected(() => false)
    }
  }, [monitoringSearchPopup.mediaTypePopup.selectedType])

  return (
    <li>
      <div className="tree-menu__button-input">
        <FormInputBtn
          type="checkbox"
          name={'menu__button_MediaTypePopup' + props.commonCodeId}
          id={'menu__button_MediaTypePopup' + props.commonCodeId}
          checkDataLimit={30}
          checkDataLimitDisable={30 === monitoringSearchPopup.mediaTypePopup.selectedType.length ? 'action' : 'non'}
          label={props.name}
          subLabel={props.count}
          onChange={() => setMediaTypePopupSelectedItem(isSelected, props, monitoringSearchPopup.mediaTypePopup)}
          checked={isSelected}
        />
      </div>
    </li>
  )
}

export default MediaTypeItem
