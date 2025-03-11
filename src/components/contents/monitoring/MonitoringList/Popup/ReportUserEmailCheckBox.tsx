import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import FormInputBtn from '~/components/common/ui/FormInputBtn'
import { NavigationLinkItem } from '~/types/common'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const ReportUserEmailCheckBox = (props: NavigationLinkItem) => {
  const { reportPopup, setMonitoringReportReleaseKeywordsSearchDataAction } = useMonitoringSearch()
  const [checked, setChecked] = useState(false)
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    const find = reportPopup.releaseStep.receiverList.find(e => e.id === props.id)
    setChecked(() => !!find)
  }, [reportPopup.releaseStep.receiverList.length])

  useEffect(() => {
    const findByTarget = reportPopup.releaseStep.targetEmail.find(e => e.id === props.pathLink)
    setDisable(() => !!findByTarget)
  }, [reportPopup.releaseStep.targetEmail.length])

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
            onChange={e => setMonitoringReportReleaseKeywordsSearchDataAction(e, reportPopup, props)}
          />
        </div>
      )}
    </li>
  )
}

export default ReportUserEmailCheckBox
