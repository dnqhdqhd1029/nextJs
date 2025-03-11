import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import icoSvgData from '~/components/common/ui/icon/icoSvgData.json'
import IcoSvg from '~/components/common/ui/IcoSvg'
import { SelectListOptionItem } from '~/types/common'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const MonitoringFormItem = (props: SelectListOptionItem) => {
  const { reportPopup, setMonitoringReportReleaseFormAction } = useMonitoringSearch()
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    let temp = false
    if (props.id === 'isEmail') {
      temp = reportPopup.releaseStep.isEmail
    } else if (props.id === 'isPdf') {
      temp = reportPopup.releaseStep.isPdf
    } else {
      temp = reportPopup.releaseStep.isWord
    }
    setIsSelected(() => temp)
  }, [reportPopup.releaseStep])

  return (
    <li key={'defaultReportFormOptionList' + props.id}>
      <div className="template-ipt-btn__item">
        <input
          type="checkbox"
          name={props.name}
          id={props.id}
          checked={isSelected}
          onChange={e => setMonitoringReportReleaseFormAction(e.target.checked, props.id, reportPopup)}
        />
        <label htmlFor={props.id}>
          <b className="item__thumb">
            <span className="item-thumb__img">
              {props.id === 'isEmail' && <IcoSvg data={icoSvgData.envelopeFill} />}
              {props.id === 'isWord' && <IcoSvg data={icoSvgData.wordFill} />}
              {props.id === 'isPdf' && <IcoSvg data={icoSvgData.pdfFill} />}
            </span>
          </b>
          <span className="item__label">{props.name}</span>
        </label>
      </div>
    </li>
  )
}

export default MonitoringFormItem
