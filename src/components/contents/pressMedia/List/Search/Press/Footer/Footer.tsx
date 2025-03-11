import MbPagination from '~/components/contents/common/forms/MbPagination'
import { usePressListManagement } from '~/utils/hooks/contents/pressMedia/usePressListManagement'

const PressFooter = () => {
  const { isLoading, pageCount, pressListParams, handleChangeSize, handlePaginationChange } = usePressListManagement()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={pressListParams.page}
          viewCount={pressListParams.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handleChangeSize(e, pressListParams)}
          onPaginationChange={(e: number) => handlePaginationChange(e, pressListParams)}
          isPageLoadCompleted={!isLoading}
        />
      </div>
    </div>
  )
}

export default PressFooter
