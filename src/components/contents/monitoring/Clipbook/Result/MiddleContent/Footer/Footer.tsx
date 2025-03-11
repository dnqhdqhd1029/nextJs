import MbPagination from '~/components/contents/common/forms/MbPagination'
import { useClipbookDetail } from '~/utils/hooks/contents/monitoring/useClipbookDetail'

const Footer = () => {
  const {
    pageCount,
    isOwner,
    isFilterSubParam,
    clipbookIdKey,
    monitoringListParams,
    handleChangeSize,
    handlePaginationChange,
  } = useClipbookDetail()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={monitoringListParams.page}
          viewCount={monitoringListParams.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) =>
            handleChangeSize(e, monitoringListParams, clipbookIdKey, isOwner, isFilterSubParam)
          }
          onPaginationChange={(e: number) =>
            handlePaginationChange(e, monitoringListParams, clipbookIdKey, isOwner, isFilterSubParam)
          }
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default Footer
