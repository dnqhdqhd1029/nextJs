import { useEffect } from 'react'
import cn from 'classnames'

import MediaContent from '~/components/contents/pressMedia/List/Search/Media/Content/Content'
import MediaFooter from '~/components/contents/pressMedia/List/Search/Media/Footer/Footer'
import MediaHeader from '~/components/contents/pressMedia/List/Search/Media/Header/Header'
import MediaContentAllDeletePopup from '~/components/contents/pressMedia/List/Search/Media/Popup/ContentAllDeletePopup'
import MediaContentDeletePopup from '~/components/contents/pressMedia/List/Search/Media/Popup/ContentDeletePopup'
import MediaAllPressContentShareCode from '~/components/contents/pressMedia/List/Search/Media/Popup/ContentShareCode'
import MediaContentDetailPopup from '~/components/contents/pressMedia/List/Search/Media/Popup/MediaContentDetailPopup'
import MediaGroupPopup from '~/components/contents/pressMedia/List/Search/Media/Popup/MediaGroupPopup'
import MediaOwnerChangePopup from '~/components/contents/pressMedia/List/Search/Media/Popup/OwnerChangePopup'
import MediaUserProfilePopup from '~/components/contents/pressMedia/List/Search/Media/Popup/UserProfilePopup'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const Management = () => {
  const { categoryList, categoryData, categoryDataHandle, init } = useMediaListManagement()

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
              <MediaHeader />
              <MediaContent />
              <MediaFooter />
            </div>
          </div>
        </div>
      </div>
      <MediaContentDeletePopup />
      <MediaOwnerChangePopup />
      <MediaUserProfilePopup />
      <MediaContentDetailPopup />
      <MediaGroupPopup />
      <MediaContentAllDeletePopup />
      <MediaAllPressContentShareCode />
    </>
  )
}

export default Management
