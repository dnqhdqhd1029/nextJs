import { Fragment, useEffect, useLayoutEffect } from 'react'

import ClipbookListPopup from '~/components/contents/common/forms/ClipbookListPopup/ClipbookListPopup'
import TagTotalSearch from '~/components/contents/common/forms/TagTotalForm/TagTotalSearch'
import SearchLimitAlarm from '~/components/contents/common/notiNodes/SearchLimitAlarm'
import LeftContent from '~/components/contents/monitoring/MonitoringList/LeftContent/LeftContent'
import SearchFilter from '~/components/contents/monitoring/MonitoringList/LeftContent/SearchFilter'
import Content from '~/components/contents/monitoring/MonitoringList/MiddleContent/Content/Content'
import Footer from '~/components/contents/monitoring/MonitoringList/MiddleContent/Footer/Footer'
import Header from '~/components/contents/monitoring/MonitoringList/MiddleContent/Header/Header'
import Notice from '~/components/contents/monitoring/MonitoringList/Notice/Notice'
import ConfirmPopup from '~/components/contents/monitoring/MonitoringList/Popup/ConfirmPopup'
import ContentDeletePopup from '~/components/contents/monitoring/MonitoringList/Popup/ContentDeletePopup'
import ExcelFileDownloadPopup from '~/components/contents/monitoring/MonitoringList/Popup/ExcelFileDownloadPopup'
import MediaTypePopup from '~/components/contents/monitoring/MonitoringList/Popup/MediaTypePopup'
import MonitoringAnalysisPopup from '~/components/contents/monitoring/MonitoringList/Popup/MonitoringAnalysisPopup'
import MonitoringReportPopup from '~/components/contents/monitoring/MonitoringList/Popup/MonitoringReportPopup'
import NewsDeletePopup from '~/components/contents/monitoring/MonitoringList/Popup/NewsDeletePopup'
import ReportCancelPopup from '~/components/contents/monitoring/MonitoringList/Popup/ReportCancelPopup'
import UserProfilePopup from '~/components/contents/monitoring/MonitoringList/Popup/UserProfilePopup'
import News from '~/components/contents/monitoring/MonitoringList/RightContent/NewsItem'
import SearchOption from '~/components/contents/monitoring/MonitoringList/SearchOption/SearchOption'
import MonitoringPopup from '~/components/contents/monitoring/MonitoringPopup/MonioringPopup'
import MonioringSearchOptionPopup from '~/components/contents/monitoring/MonitoringPopup/MonioringSearchOptionPopup'
import SearchOptionMediaTypePopup from '~/components/contents/monitoring/MonitoringPopup/Popup/MediaTypePopup'
import MonitoringCancelPopup from '~/components/contents/monitoring/MonitoringPopup/Popup/MonitoringCancelPopup'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const Search = () => {
  const {
    monitoringListParams,
    newsList,
    newsIdParams,
    isOwner,
    isFilterSubParam,
    monitoringDate,
    searchLimitAlarm,
    searchContentKeyList,
    tagPopup,
    editPageOpen,
    setInitTagPopupAction,
    init,
    setOwnerKey,
    editTaggingAction,
    afterClipbookAddReLoad,
  } = useMonitoringSearch()

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
              <LeftContent />
              <SearchFilter />
            </div>
          </div>
          {editPageOpen ? (
            <SearchOption />
          ) : (
            <Fragment>
              <div className="mb-contents search-result">
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
            </Fragment>
          )}
        </div>
      </div>
      <MediaTypePopup />
      <MonitoringPopup returnAction={() => setOwnerKey(isOwner, isFilterSubParam, monitoringDate)} />
      <MonioringSearchOptionPopup />
      <SearchOptionMediaTypePopup />
      <MonitoringAnalysisPopup />
      <ConfirmPopup />
      <MonitoringReportPopup />
      <ReportCancelPopup />
      <NewsDeletePopup />
      <UserProfilePopup />
      <ContentDeletePopup />
      <ExcelFileDownloadPopup />
      <MonitoringCancelPopup />
      <ClipbookListPopup
        onChangeInitAction={(e, k) =>
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

export default Search
