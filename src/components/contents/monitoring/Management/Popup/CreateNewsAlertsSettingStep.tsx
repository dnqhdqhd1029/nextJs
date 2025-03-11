import { useState } from 'react'

import FormInputText from '~/components/common/ui/FormInputText'
import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import { defaultNewsSortOptions } from '~/components/contents/monitoring/Management/defaultData'
import { settingPageDataType } from '~/stores/modules/contents/newsAlert/newsAlert'
import { SelectListOptionItem } from '~/types/common'

type Props = {
  newsAlertsSettingData: settingPageDataType
  settingPageDataTitleOnChange: Function
  settingPageDataContentOnChange: Function
  settingPageDataSortOptionOnChange: Function
}

const CreateNewsAlertsSettingStep = ({
  newsAlertsSettingData,
  settingPageDataTitleOnChange,
  settingPageDataContentOnChange,
  settingPageDataSortOptionOnChange,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <ul>
        <li>
          <FormTitle
            title="제목"
            required={true}
          />
          <FormInputText
            required={true}
            onChange={e => settingPageDataTitleOnChange(e.target.value, newsAlertsSettingData)}
            failed={newsAlertsSettingData.titleErr !== ''}
            msg={newsAlertsSettingData.titleErr}
            value={newsAlertsSettingData.title}
          />
        </li>
        <li>
          <div className="textarea__area">
            <FormTitle title="설명" />
            <div className="textarea__group">
              <textarea
                placeholder=""
                rows={8}
                onChange={e => settingPageDataContentOnChange(e.target.value, newsAlertsSettingData)}
                value={newsAlertsSettingData.content}
                style={{
                  resize: 'none',
                }}
              ></textarea>
            </div>
          </div>
        </li>
        <li>
          <div className="select-form__section select-form-btn">
            <FormTitle title="뉴스 정렬" />
            <Select
              options={defaultNewsSortOptions}
              onChange={(option: SelectListOptionItem) =>
                settingPageDataSortOptionOnChange(option.id, newsAlertsSettingData)
              }
              value={defaultNewsSortOptions.find(e => e.id === newsAlertsSettingData.sortOption)}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default CreateNewsAlertsSettingStep
