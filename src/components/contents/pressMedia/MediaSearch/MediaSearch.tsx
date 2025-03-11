import { useEffect, useLayoutEffect, useRef } from 'react'

import { draftTab } from '~/components/contents/pressMedia/MediaSearch/defaultData'
import LeftContent from '~/components/contents/pressMedia/MediaSearch/LeftContent/LeftContent'
import MiddleContent from '~/components/contents/pressMedia/MediaSearch/MiddleContent/MiddleContent'
import MediaFieldPopup from '~/components/contents/pressMedia/MediaSearch/Popup/MediaFieldPopup/MediaFieldPopup'
import MediaLocationPopup from '~/components/contents/pressMedia/MediaSearch/Popup/MediaLocationPopup/MediaLocationPopup'
import MediaTypePopup from '~/components/contents/pressMedia/MediaSearch/Popup/MediaTypePopup/MediaTypePopup'
import SavedSearchPopup from '~/components/contents/pressMedia/MediaSearch/Popup/SavedSearchPopup/SavedSearchPopup'
import SavedSearchList from '~/components/contents/pressMedia/MediaSearch/SavedSearchList/SavedSearchList'
import { useMediaSearchOptions } from '~/utils/hooks/contents/pressMedia/useMediaSearchOptions'

const MediaSearch = () => {
  const { categoryData, categoryDataHandle, init } = useMediaSearchOptions()
  const getOpenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <div className="mb-container">
        <div className="mb-common-inner search">
          <div className="mb-contents conditions overflow-y">
            <div className="header-breadcrumb__section breadcrumb-title-type2 type-sticky">
              <div className="tabs__section type1-medium">
                <div className="tabs-menu__group">
                  <ul className="tabs-menu__list">
                    {draftTab.map(e => (
                      <li
                        key={'draftTab_tab' + e.id + e.name}
                        className={categoryData.id === e.id ? 'is-active' : ''}
                      >
                        <button
                          type="button"
                          className="tabs-menu__btn"
                          onClick={() => categoryDataHandle(e)}
                        >
                          <span className="tabs-menu__name fw700">{e.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="flexible__section type-n2"
              ref={getOpenRef}
            >
              <LeftContent ref={getOpenRef} />
              <MiddleContent ref={getOpenRef} />
            </div>
          </div>
          <div className="mb-aside__section type-w1">
            <SavedSearchList />
          </div>
        </div>
      </div>
      <SavedSearchPopup />
      <MediaTypePopup />
      <MediaFieldPopup />
      <MediaLocationPopup />
    </>
  )
}

export default MediaSearch
