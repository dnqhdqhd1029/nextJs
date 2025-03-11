import { useEffect, useLayoutEffect } from 'react'

import ClipbookListPopup from '~/components/contents/common/forms/ClipbookListPopup/ClipbookListPopup'
import TagTotalSearch from '~/components/contents/common/forms/TagTotalForm/TagTotalSearch'
import SearchLimitAlarm from '~/components/contents/common/notiNodes/SearchLimitAlarm'
import MonitoringPopup from '~/components/contents/monitoring/MonitoringPopup/MonioringPopup'
import MonioringSearchOptionPopup from '~/components/contents/monitoring/MonitoringPopup/MonioringSearchOptionPopup'
import SearchOptionMediaTypePopup from '~/components/contents/monitoring/MonitoringPopup/Popup/MediaTypePopup'
import MonitoringCancelPopup from '~/components/contents/monitoring/MonitoringPopup/Popup/MonitoringCancelPopup'
import SearchFilter from '~/components/contents/monitoring/SearchResult/LeftContent/SearchFilter'
import Content from '~/components/contents/monitoring/SearchResult/MiddleContent/Content/Content'
import Footer from '~/components/contents/monitoring/SearchResult/MiddleContent/Footer/Footer'
import Header from '~/components/contents/monitoring/SearchResult/MiddleContent/Header/Header'
import Notice from '~/components/contents/monitoring/SearchResult/Notice/Notice'
import ExcelFileDownloadPopup from '~/components/contents/monitoring/SearchResult/Popup/ExcelFileDownloadPopup'
import MediaTypePopup from '~/components/contents/monitoring/SearchResult/Popup/MediaTypePopup'
import MonitoringReportPopup from '~/components/contents/monitoring/SearchResult/Popup/MonitoringReportPopup'
import NewsDeletePopup from '~/components/contents/monitoring/SearchResult/Popup/NewsDeletePopup'
import ReportCancelPopup from '~/components/contents/monitoring/SearchResult/Popup/ReportCancelPopup'
import UserProfilePopup from '~/components/contents/monitoring/SearchResult/Popup/UserProfilePopup'
import News from '~/components/contents/monitoring/SearchResult/RightContent/NewsItem'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const SearchResult = () => {
  const {
    monitoringListParams,
    newsList,
    newsIdParams,
    searchLimitAlarm,
    tagPopup,
    searchContentKeyList,
    setInitTagPopupAction,
    init,
    afterClipbookAddReLoad,
    editTaggingAction,
  } = useMonitoringSearchResult()

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <SearchLimitAlarm isOpen={searchLimitAlarm} />
      <div className="mb-container position-relative">
        <div className="mb-common-inner search">
          <div className="mb-lnb__section type-w1 overflow-y">
            <div className="lnb-search__section">
              <SearchFilter />
            </div>
          </div>
          <div className="mb-contents  search-result">
            <div className="mb-contents-layout__section">
              <Header />
              <Content />
              <Footer />
            </div>
          </div>
          <div className="mb-aside__section type-w2">
            <Notice />
            <News />
          </div>
        </div>
      </div>
      <MediaTypePopup />
      <MonitoringPopup />
      <MonioringSearchOptionPopup />
      <SearchOptionMediaTypePopup />
      <MonitoringReportPopup />
      <ReportCancelPopup />
      <UserProfilePopup />
      <NewsDeletePopup />
      <ExcelFileDownloadPopup />
      <MonitoringCancelPopup />
      <ClipbookListPopup
        onChangeInitAction={(i, k) =>
          newsIdParams && afterClipbookAddReLoad(monitoringListParams, newsList, newsIdParams, k)
        }
      />
      <TagTotalSearch
        isOpen={tagPopup.isOpen}
        category={'NEWS'}
        targetCount={searchContentKeyList.length}
        originTagList={tagPopup.tagList}
        onChangeTagList={(e, i) =>
          newsIdParams && editTaggingAction(e, searchContentKeyList, i, monitoringListParams, newsList, newsIdParams)
        }
        closeTagTotalSearchPopup={() => setInitTagPopupAction()}
      />
    </>
  )
}

export default SearchResult
