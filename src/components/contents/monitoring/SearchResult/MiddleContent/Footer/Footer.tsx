import MbPagination from '~/components/contents/common/forms/MbPagination'
import { SIZE_OPTIONS } from '~/constants/common'
import { useMonitoringSearchResult } from '~/utils/hooks/contents/monitoring/useMonitoringSearchResult'

const Footer = () => {
  const { pageCount, monitoringListParams, monitoringParams, handleChangeSize, handlePaginationChange } =
    useMonitoringSearchResult()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={monitoringListParams.page}
          viewCount={monitoringListParams.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handleChangeSize(e, monitoringListParams, monitoringParams)}
          onPaginationChange={(e: number) => handlePaginationChange(e, monitoringListParams, monitoringParams)}
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default Footer
