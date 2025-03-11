import FormInputText from '~/components/common/ui/FormInputText'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const MonitoringReportName = () => {
  const { reportPopup, setMonitoringReportPopupTitleOnChange } = useClipbookDetail()
  return (
    <div className="popup-contents__section">
      <ul>
        <li>
          <FormInputText
            title={'보고서 이름'}
            required={true}
            onChange={e => setMonitoringReportPopupTitleOnChange(e.target.value, reportPopup)}
            failed={reportPopup.nameStep.nameErr !== ''}
            msg={reportPopup.nameStep.nameErr}
            value={reportPopup.nameStep.name}
          />
        </li>
      </ul>
    </div>
  )
}

export default MonitoringReportName
