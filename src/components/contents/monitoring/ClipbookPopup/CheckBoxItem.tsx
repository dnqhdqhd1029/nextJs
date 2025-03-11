import { useEffect, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { NavigationLinkItem } from '~/types/common'
import { useMonitoringClipbookSearch } from '~/utils/hooks/contents/monitoring/useClipbookSearch'

const SharedCheckBox = (props: NavigationLinkItem) => {
  const { prjList, keywordList, clipbookPopupKeywordsSearchDataAction } = useMonitoringClipbookSearch()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (prjList && prjList.length > 0) {
      console.log('prjList', prjList)
      console.log('props.id', props.id)
      const find = prjList.find(e => e.id.toString() === props.id.toString())
      setChecked(() => !!find)
    }
  }, [prjList])

  return (
    <li key={'sharedPopup_filterSearchData' + props.id}>
      {/* <div className="lnb-filter-depth2__checkbox"> */}
      <div className="select-form-option__item-input">
        <FormInputBtn
          type="checkbox"
          name={props.id}
          id={props.id}
          label={props.title}
          checked={checked}
          onChange={e => clipbookPopupKeywordsSearchDataAction(e, prjList, props)}
        />
      </div>
    </li>
  )
}

export default SharedCheckBox
