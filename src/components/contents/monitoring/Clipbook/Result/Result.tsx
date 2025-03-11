import { useEffect, useLayoutEffect } from 'react'

import ClipbookListPopup from '~/components/contents/common/forms/ClipbookListPopup/ClipbookListPopup'
import TagTotalSearch from '~/components/contents/common/forms/TagTotalForm/TagTotalSearch'
import SearchLimitAlarm from '~/components/contents/common/notiNodes/SearchLimitAlarm'
import LeftContent from '~/components/contents/monitoring/Clipbook/Result/LeftContent/LeftContent'
import SearchFilter from '~/components/contents/monitoring/Clipbook/Result/LeftContent/SearchFilter'
import Content from '~/components/contents/monitoring/Clipbook/Result/MiddleContent/Content/Content'
import Footer from '~/components/contents/monitoring/Clipbook/Result/MiddleContent/Footer/Footer'
import Header from '~/components/contents/monitoring/Clipbook/Result/MiddleContent/Header/Header'
import Notice from '~/components/contents/monitoring/Clipbook/Result/Notice/Notice'
import ClipbookAnalysisPopup from '~/components/contents/monitoring/Clipbook/Result/Popup/ClipbookAnalysisPopup'
import ConfirmPopup from '~/components/contents/monitoring/Clipbook/Result/Popup/ComfirmPopup'
import ContentDeletePopup from '~/components/contents/monitoring/Clipbook/Result/Popup/ContentDeletePopup'
import ExcelFileDownloadPopup from '~/components/contents/monitoring/Clipbook/Result/Popup/ExcelFileDownloadPopup'
import MonitoringReportPopup from '~/components/contents/monitoring/Clipbook/Result/Popup/MonitoringReportPopup'
import NewsDeletePopup from '~/components/contents/monitoring/Clipbook/Result/Popup/NewsDeletePopup'
import ReportCancelPopup from '~/components/contents/monitoring/Clipbook/Result/Popup/ReportCancelPopup'
import UserProfilePopup from '~/components/contents/monitoring/Clipbook/Result/Popup/UserProfilePopup'
import News from '~/components/contents/monitoring/Clipbook/Result/RightContent/NewsItem'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const Result = () => {
  const {
    clipbookIdKey,
    isOwner,
    isFilterSubParam,
    newsList,
    newsIdParams,
    monitoringListParams,
    searchLimitAlarm,
    tagPopup,
    searchContentKeyList,
    setInitTagPopupAction,
    init,
    afterClipbookPopupReLoadAction,
    editTaggingAction,
  } = useClipbookDetail()

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
        </div>
      </div>
      <ClipbookAnalysisPopup />
      <ConfirmPopup />
      <MonitoringReportPopup />
      <ReportCancelPopup />
      <NewsDeletePopup />
      <UserProfilePopup />
      <ContentDeletePopup />
      <ExcelFileDownloadPopup />
      <ClipbookListPopup
        onChangeInitAction={(k, i) =>
          newsIdParams &&
          afterClipbookPopupReLoadAction(
            clipbookIdKey,
            isOwner,
            isFilterSubParam,
            monitoringListParams,
            newsList,
            newsIdParams,
            k,
            i
          )
        }
      />
      <TagTotalSearch
        isOpen={tagPopup.isOpen}
        category={'NEWS'}
        targetCount={searchContentKeyList.length}
        originTagList={tagPopup.tagList}
        onChangeTagList={(e, i) =>
          newsIdParams &&
          editTaggingAction(
            e,
            searchContentKeyList,
            i,
            clipbookIdKey,
            isOwner,
            isFilterSubParam,
            monitoringListParams,
            newsList,
            newsIdParams
          )
        }
        closeTagTotalSearchPopup={() => setInitTagPopupAction()}
      />
    </>
  )
}

export default Result
