import FormInputToggle from '~/components/common/ui/FormInputToggle'
import Content from '~/components/contents/monitoring/Search/RightContent/Contents'
import { useMonitoringSearchOptions } from '~/utils/hooks/contents/monitoring/useMonitoringSearchOptions'

const RightContent = () => {
  const { monitoringList, licenseInfo, monitoringListOption, monitoringCategoryList, setMonitoringListOptionAction } =
    useMonitoringSearchOptions()
  return (
    <div className="aside-search__section">
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <h3 className="aside-search-header__title">모니터링</h3>
        </div>
        {licenseInfo.userLimit && licenseInfo.userLimit > 1 && (
          <FormInputToggle
            id="monitoring__toggle"
            name="monitoring__toggle"
            label="MY"
            reverse={true}
            checked={monitoringListOption}
            onChange={() => setMonitoringListOptionAction(!monitoringListOption, monitoringCategoryList)}
          />
        )}
      </div>
      <div className="aside-search__contents">
        {monitoringList &&
          monitoringList.length > 0 &&
          monitoringList.map(e => (
            <Content
              key={'monitoringList__accordion_category' + e.category}
              {...e}
            />
          ))}
      </div>
    </div>
  )
}

export default RightContent
