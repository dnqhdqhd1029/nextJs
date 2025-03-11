import { ChangeEvent, useEffect, useLayoutEffect, useRef } from 'react'

import MonitoringPopup from '~/components/contents/monitoring/MonitoringPopup/MonioringPopup'
import MonioringSearchOptionPopup from '~/components/contents/monitoring/MonitoringPopup/MonioringSearchOptionPopup'
import SearchOptionMediaTypePopup from '~/components/contents/monitoring/MonitoringPopup/Popup/MediaTypePopup'
import MonitoringCancelPopup from '~/components/contents/monitoring/MonitoringPopup/Popup/MonitoringCancelPopup'
import LeftContent from '~/components/contents/monitoring/Search/LeftContent/LeftContent'
import MiddleContent from '~/components/contents/monitoring/Search/MiddleContent/MiddleContent'
import MediaTypePopup from '~/components/contents/monitoring/Search/Popup/MediaTypePopup'
import RightContent from '~/components/contents/monitoring/Search/RightContent/RightContent'
import { useMonitoringSearchOptions } from '~/utils/hooks/contents/monitoring/useMonitoringSearchOptions'

const Search = () => {
  const { init } = useMonitoringSearchOptions()
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
              <div className="header-breadcrumb__group">
                <h2 className="header-breadcrumb__title fw700">뉴스 검색</h2>
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
            <RightContent />
          </div>
        </div>
      </div>
      <MediaTypePopup />
      <MonitoringPopup />
      <MonioringSearchOptionPopup />
      <SearchOptionMediaTypePopup />
      <MonitoringCancelPopup />
    </>
  )
}

export default Search
