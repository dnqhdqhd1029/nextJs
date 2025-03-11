import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { NavigationLinkItem } from '~/types/common'
import { useShared } from '~/utils/hooks/contents/shared/useShared'

const SharedCheckBox = (props: NavigationLinkItem) => {
  const { sharedPopup, sharedPopupKeywordsSearchDataAction } = useShared()
  const [checked, setChecked] = useState(false)
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    const find = sharedPopup.receiverList.find(e => e.id === props.id)
    setChecked(() => !!find)
  }, [sharedPopup.receiverList.length])

  useEffect(() => {
    const findByTarget = sharedPopup.targetEmail.find(e => e.id === props.pathLink)
    setDisable(() => !!findByTarget)
  }, [sharedPopup.targetEmail.length])

  return (
    <li key={'sharedPopup_filterSearchData' + props.id}>
      {!disable && (
        <div className="lnb-filter-depth2__checkbox">
          <FormInputBtn
            type="checkbox"
            name={props.id}
            id={props.id}
            label={props.title}
            checked={checked}
            onChange={e => sharedPopupKeywordsSearchDataAction(e, sharedPopup, props)}
          />
        </div>
      )}
    </li>
  )
}

export default SharedCheckBox
