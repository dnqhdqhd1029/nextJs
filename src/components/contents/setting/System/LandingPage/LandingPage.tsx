import { Fragment, useEffect, useLayoutEffect } from 'react'

import FormTitle from '~/components/common/ui/FormTitle'
import Select from '~/components/common/ui/Select'
import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import { DefaultSettingLinks } from '~/components/contents/setting/System/defaultData'
import { useLandingPage } from '~/utils/hooks/contents/setting/useLandingPage'
import { useTimeZone } from '~/utils/hooks/contents/setting/useTimeZone'

const LandingPage = () => {
  const { userInfo, landingDataList, landingPageData, updateProfileValidateAction } = useLandingPage()

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
                        <h2 className="common-title__title">랜딩 페이지</h2>
                      </div>
                    </div>
                  </div>
                  <div className="setting-contents__section">
                    <ul className="interval-mt42 max-width__m">
                      <li>
                        <p>로그인 직후 접속할 페이지를 선택하세요.</p>
                      </li>
                      <li>
                        <div className="select-form__section select-form-btn">
                          <FormTitle
                            title={'랜딩 페이지'}
                            required={true}
                          />
                          <Select
                            options={landingDataList}
                            value={landingPageData}
                            onChange={e => updateProfileValidateAction(e)}
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

export default LandingPage
