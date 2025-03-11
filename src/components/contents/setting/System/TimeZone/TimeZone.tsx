import { Fragment, useEffect, useLayoutEffect } from 'react'

import Select from '~/components/common/ui/Select'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import { DefaultSettingLinks } from '~/components/contents/setting/System/defaultData'
import { useTimeZone } from '~/utils/hooks/contents/setting/useTimeZone'

const TimeZone = () => {
  const { timeZoneValue, timeZoneList, setTimeZoneValueAction } = useTimeZone()

  return (
    <Fragment>
      <div className="mb-container">
        <div className="mb-common-inner setting">
          <div className="mb-lnb__section type-w2">
            <NavigationBar
              headerTitle={'설정'}
              naviList={DefaultSettingLinks}
              isCustomerInfo={true}
            />
          </div>
          <div className="mb-contents">
            <div className="mb-contents-layout__section">
              <div className="mb-contents-layout__contents">
                <div className="setting__contents">
                  <div className="setting__header">
                    <div className="common-title__section">
                      <div className="common-title__group">
                        <h2 className="common-title__title">표준 시간대</h2>
                      </div>
                    </div>
                  </div>
                  <div className="setting-contents__section">
                    <ul className="interval-mt42 max-width__m">
                      <li>
                        <p>선택한 표준 시간대에 따라 시간 표시가 바뀝니다.</p>
                      </li>
                      <li>
                        <div className="select-form__section select-form-btn">
                          <Select
                            options={timeZoneList}
                            value={timeZoneValue}
                            onChange={e => setTimeZoneValueAction(e, timeZoneValue)}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default TimeZone
