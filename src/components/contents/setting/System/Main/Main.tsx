import { Fragment, useEffect, useLayoutEffect } from 'react'

import NavigationBar from '~/components/contents/common/NavigationBar/NavigationBar'
import { DefaultSettingLinks } from '~/components/contents/setting/System/defaultData'
import { useSettingMain } from '~/utils/hooks/contents/setting/useSettingMain'

const SettingMain = () => {
  const {
    userInfo,
    landingPage,
    settingMainLoading,
    settingUserHomeData,
    userSelectGroup,
    changeSelectedGroup,
    initSettingUser,
  } = useSettingMain()

  useEffect(() => {
    initSettingUser()
  }, [])

  if (settingMainLoading) {
    return null
  }

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
                        <h2 className="common-title__title">설정 요약</h2>
                      </div>
                    </div>
                  </div>
                  <div className="setting-contents__section">
                    <ul className="interval-mt42">
                      <li>
                        <dl className="dl-table-type1__section">
                          <dt>
                            <p className="dl-table-type1__text">회사</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{settingUserHomeData.companyNm}</p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">권한</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{settingUserHomeData.role}</p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">랜딩 페이지</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{settingUserHomeData.landingPage}</p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">시스템 알림</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{settingUserHomeData.flagActive ? '켬' : '끔'}</p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">뉴스알리미 수신</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{settingUserHomeData.newsAlarm ? '켬' : '끔'}</p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">표준 시간대</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{settingUserHomeData.timeZone}</p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">사용권</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{settingUserHomeData.license}</p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">회원 등록</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{settingUserHomeData.regisAt}</p>
                          </dd>
                          <dt>
                            <p className="dl-table-type1__text">최종 로그인</p>
                          </dt>
                          <dd>
                            <p className="dl-table-type1__text">{settingUserHomeData.lastLoginAt}</p>
                          </dd>
                        </dl>
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

export default SettingMain
