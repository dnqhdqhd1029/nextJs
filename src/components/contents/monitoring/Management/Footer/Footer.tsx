import MbPagination from '~/components/contents/common/forms/MbPagination'
import { useMonitoringManagement } from '~/utils/hooks/contents/monitoring/useManagement'

const Footer = () => {
  const { pageCount, managementListParams, handleChangeSize, handlePaginationChange } = useMonitoringManagement()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={managementListParams.page}
          viewCount={managementListParams.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handleChangeSize(e, managementListParams)}
          onPaginationChange={(e: number) => handlePaginationChange(e, managementListParams)}
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default Footer
