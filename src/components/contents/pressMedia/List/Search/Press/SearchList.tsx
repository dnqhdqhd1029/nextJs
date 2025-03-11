import { useEffect, useLayoutEffect } from 'react'
import cn from 'classnames'

import PressContent from '~/components/contents/pressMedia/List/Search/Press/Content/Content'
import PressFooter from '~/components/contents/pressMedia/List/Search/Press/Footer/Footer'
import PressHeader from '~/components/contents/pressMedia/List/Search/Press/Header/Header'
import PressContentAllDeletePopup from '~/components/contents/pressMedia/List/Search/Press/Popup/ContentAllDeletePopup'
import PressContentDeletePopup from '~/components/contents/pressMedia/List/Search/Press/Popup/ContentDeletePopup'
import PressAllPressContentShareCode from '~/components/contents/pressMedia/List/Search/Press/Popup/ContentShareCode'
import PressOwnerChangePopup from '~/components/contents/pressMedia/List/Search/Press/Popup/OwnerChangePopup'
import PressContentDetailPopup from '~/components/contents/pressMedia/List/Search/Press/Popup/PressContentDetailPopup'
import PressGroupPopup from '~/components/contents/pressMedia/List/Search/Press/Popup/PressGroupPopup'
import PressUserProfilePopup from '~/components/contents/pressMedia/List/Search/Press/Popup/UserProfilePopup'
import { usePressListManagement } from '~/utils/hooks/contents/pressMedia/usePressListManagement'

const Management = () => {
  const { categoryList, categoryData, categoryDataHandle, init } = usePressListManagement()

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
                <h2 className="lnb-search-result__title">미디어 리스트</h2>
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
      <PressOwnerChangePopup />
      <PressUserProfilePopup />
      <PressContentDeletePopup />
      <PressContentDetailPopup />
      <PressGroupPopup />
      <PressContentAllDeletePopup />
      <PressAllPressContentShareCode />
    </>
  )
}

export default Management
