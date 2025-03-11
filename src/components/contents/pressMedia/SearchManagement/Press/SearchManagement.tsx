import { useEffect, useLayoutEffect } from 'react'
import cn from 'classnames'

import PressContent from '~/components/contents/pressMedia/SearchManagement/Press/Content/Content'
import PressFooter from '~/components/contents/pressMedia/SearchManagement/Press/Footer/Footer'
import PressHeader from '~/components/contents/pressMedia/SearchManagement/Press/Header/Header'
import PressContentDeletePopup from '~/components/contents/pressMedia/SearchManagement/Press/Popup/ContentDeletePopup'
import PressOwnerChangePopup from '~/components/contents/pressMedia/SearchManagement/Press/Popup/OwnerChangePopup'
import PressSavedSearchEditPopup from '~/components/contents/pressMedia/SearchManagement/Press/Popup/PressSavedSearchEditPopup'
import PressUserProfilePopup from '~/components/contents/pressMedia/SearchManagement/Press/Popup/UserProfilePopup'
import { usePressSavedSearchManagement } from '~/utils/hooks/contents/pressMedia/usePressSavedSearchManagement'

const Management = () => {
  const { categoryList, categoryData, categoryDataHandle, init } = usePressSavedSearchManagement()

  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <div className="mb-container position-relative">
        <div className="mb-common-inner search">
          <div className="mb-lnb__section type-w1 overflow-y">
            <div className="lnb-search__section">
              <div className="lnb-search-result__header">
                <h2 className="lnb-search-result__title">맞춤 검색 관리</h2>
              </div>
              <ul className="lnb-search-result__list">
                {categoryList &&
                  categoryList.map(e => (
                    <li
                      key={'lnb-search-result__title_usePressMediaManagement' + e.count + e.id}
                      id={'usePressMediaManagement' + e.id}
                      onClick={i => categoryDataHandle(e)}
                    >
                      <button
                        type="button"
                        className={cn('lnb-search-result__menu', {
                          'is-selected': categoryData.id === e.id,
                        })}
                        id={'usePressMediaManagement_button' + e.id}
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
              <PressHeader />
              <PressContent />
              <PressFooter />
            </div>
          </div>
        </div>
      </div>
      <PressContentDeletePopup />
      <PressOwnerChangePopup />
      <PressUserProfilePopup />
      <PressSavedSearchEditPopup />
    </>
  )
}

export default Management
