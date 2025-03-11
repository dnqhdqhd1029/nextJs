import { useEffect, useLayoutEffect, useRef } from 'react'

import { draftTab } from '~/components/contents/pressMedia/PressSearch/defaultData'
import LeftContent from '~/components/contents/pressMedia/PressSearch/LeftContent/LeftContent'
import MiddleContent from '~/components/contents/pressMedia/PressSearch/MiddleContent/MiddleContent'
import BasicFieldPopup from '~/components/contents/pressMedia/PressSearch/Popup/BasicFieldPopup/BasicFieldPopup'
import BasicLocationPopup from '~/components/contents/pressMedia/PressSearch/Popup/BasicLocationPopup/BasicLocationPopup'
import MediaFieldPopup from '~/components/contents/pressMedia/PressSearch/Popup/MediaFieldPopup/MediaFieldPopup'
import MediaLocationPopup from '~/components/contents/pressMedia/PressSearch/Popup/MediaLocationPopup/MediaLocationPopup'
import MediaTypePopup from '~/components/contents/pressMedia/PressSearch/Popup/MediaTypePopup/MediaTypePopup'
import SavedSearchPopup from '~/components/contents/pressMedia/PressSearch/Popup/SavedSearchPopup/SavedSearchPopup'
import SavedSearchList from '~/components/contents/pressMedia/PressSearch/SavedSearchList/SavedSearchList'
import { usePressSearchOptions } from '~/utils/hooks/contents/pressMedia/usePressSearch'

const PressSearch = () => {
  const { categoryData, categoryDataHandle, init } = usePressSearchOptions()
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
      <BasicFieldPopup />
      <MediaFieldPopup />
      <MediaTypePopup />
      <BasicLocationPopup />
      <MediaLocationPopup />
    </>
  )
}

export default PressSearch
