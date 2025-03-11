import MbPagination from '~/components/contents/common/forms/MbPagination'
import { usePressSavedSearchManagement } from '~/utils/hooks/contents/pressMedia/usePressSavedSearchManagement'

const PressFooter = () => {
  const { pageCount, pressListParams, handleChangeSize, handlePaginationChange } = usePressSavedSearchManagement()
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
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default PressFooter
