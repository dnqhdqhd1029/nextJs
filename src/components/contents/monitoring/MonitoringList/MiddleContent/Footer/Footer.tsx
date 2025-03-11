import MbPagination from '~/components/contents/common/forms/MbPagination'
import { SIZE_OPTIONS } from '~/constants/common'
import { useMonitoringSearch } from '~/utils/hooks/contents/monitoring/useMonitoringSearch'

const Footer = () => {
  const {
    pageCount,
    isOwner,
    isFilterSubParam,
    monitoringListParams,
    monitoringCategoryData,
    monitoringDate,
    monitoringParams,
    handleChangeSize,
    handlePaginationChange,
  } = useMonitoringSearch()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={monitoringListParams.page}
          viewCount={monitoringListParams.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) =>
            monitoringCategoryData &&
            handleChangeSize(
              e,
              monitoringListParams,
              monitoringParams,
              monitoringDate,
              monitoringCategoryData,
              isOwner,
              isFilterSubParam
            )
          }
          onPaginationChange={(e: number) =>
            monitoringCategoryData &&
            handlePaginationChange(
              e,
              monitoringListParams,
              monitoringParams,
              monitoringDate,
              monitoringCategoryData,
              isOwner,
              isFilterSubParam
            )
          }
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default Footer
