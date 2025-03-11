import FormInputToggle from '~/components/common/ui/FormInputToggle'
import MediaContent from '~/components/contents/pressMedia/PressSearch/SavedSearchList/MediaContent'
import PressContent from '~/components/contents/pressMedia/PressSearch/SavedSearchList/PressContent'
import { usePressSearchOptions } from '~/utils/hooks/contents/pressMedia/usePressSearch'

const SavedSearchList = () => {
  const { pressMediaListOption, licenseInfo, setPressMediaListOptionAction } = usePressSearchOptions()
  return (
    <div className="aside-search__section">
      <div className="aside-search__header">
        <div className="aside-search-header__group">
          <h3 className="aside-search-header__title">맞춤 검색</h3>
        </div>
        {licenseInfo.userLimit && licenseInfo.userLimit > 1 && (
          <FormInputToggle
            id="monitoring__toggle"
            name="monitoring__toggle"
            label="MY"
            reverse={true}
            checked={pressMediaListOption}
            onChange={() => setPressMediaListOptionAction(!pressMediaListOption)}
          />
        )}
      </div>
      <div className="aside-search__contents">
        <PressContent />
        <MediaContent />
      </div>
    </div>
  )
}

export default SavedSearchList
