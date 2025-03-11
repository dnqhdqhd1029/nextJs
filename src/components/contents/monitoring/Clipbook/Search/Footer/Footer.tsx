import MbPagination from '~/components/contents/common/forms/MbPagination'
import { useMonitoringClipbookSearch } from '~/utils/hooks/contents/monitoring/useClipbookSearch'

const Footer = () => {
  const { pageCount, clipbookListParams, handleChangeSize, handlePaginationChange } = useMonitoringClipbookSearch()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={clipbookListParams.page}
          viewCount={clipbookListParams.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handleChangeSize(e, clipbookListParams)}
          onPaginationChange={(e: number) => handlePaginationChange(e, clipbookListParams)}
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default Footer
