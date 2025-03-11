import { useEffect } from 'react'
import cn from 'classnames'

import Button from '~/components/common/ui/Button'
import Content from '~/components/contents/monitoring/Management/Content/Content'
import Footer from '~/components/contents/monitoring/Management/Footer/Footer'
import Header from '~/components/contents/monitoring/Management/Header/Header'
import ContentDeletePopup from '~/components/contents/monitoring/Management/Popup/ContentDeletePopup'
import CreateNewsAlertsCancelPopup from '~/components/contents/monitoring/Management/Popup/CreateNewsAlertsCancelPopup'
import CreateNewsAlertsPopup from '~/components/contents/monitoring/Management/Popup/CreateNewsAlertsPopup'
import OwnerChangePopup from '~/components/contents/monitoring/Management/Popup/OwnerChangePopup'
import UserProfilePopup from '~/components/contents/monitoring/Management/Popup/UserProfilePopup'
import MonitoringPopup from '~/components/contents/monitoring/MonitoringPopup/MonioringPopup'
import MonioringSearchOptionPopup from '~/components/contents/monitoring/MonitoringPopup/MonioringSearchOptionPopup'
import SearchOptionMediaTypePopup from '~/components/contents/monitoring/MonitoringPopup/Popup/MediaTypePopup'
import MonitoringCheckPopup from '~/components/contents/monitoring/MonitoringPopup/Popup/MonitoringCheckPopup'
import { useMonitoringManagement } from '~/utils/hooks/contents/monitoring/useManagement'

const Management = () => {
  const { categoryList, managementListParams, handleChangeCategory, init } = useMonitoringManagement()

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="mb-container position-relative">
        <div className="mb-common-inner search">
          <div className="mb-lnb__section type-w1 overflow-y">
            <div className="lnb-search__section">
              <div
                className="lnb-search-result__header"
                style={{ justifyContent: 'space-between' }}
              >
                <h2 className="lnb-search-result__title">맞춤 검색 관리</h2>
                <Button
                  elem="a"
                  url={'/setting/news-notifier'}
                  label={'알리미'}
                  cate={'link-text'}
                  size={'m'}
                  color={'body-link'}
                />
              </div>
              <ul className="lnb-search-result__list">
                {categoryList &&
                  categoryList.map(e => (
                    <li
                      key={'lnb-search-result__title_mornitoringMangementList' + e.count + e.id}
                      id={'mornitoringMangementList_' + e.id}
                      onClick={i => {
                        i.preventDefault()
                        handleChangeCategory(e, managementListParams)
                      }}
                    >
                      <button
                        type="button"
                        className={cn('lnb-search-result__menu', {
                          'is-selected': managementListParams.category.id === e.id,
                        })}
                        id={'mornitoringMangementList_button' + e.id}
                      >
                        <span className="lnb-search-result__menu-text">{e.name}</span>
                        <span className="lnb-search-result__menu-text">{e.count}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="mb-contents manage">
            <div className="mb-contents-layout__section">
              <Header />
              <Content />
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <MonitoringPopup />
      <MonitoringCheckPopup />
      <OwnerChangePopup />
      <ContentDeletePopup />
      <UserProfilePopup />
      <MonioringSearchOptionPopup />
      <SearchOptionMediaTypePopup />
      <CreateNewsAlertsPopup />
    </>
  )
}

export default Management
