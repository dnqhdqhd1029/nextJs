import MbPagination from '~/components/contents/common/forms/MbPagination'
import { useActivityList } from '~/utils/hooks/contents/activity/useActivityList'

const SearchFooter = () => {
  const { pageCount, apiParams, handlePressChangeSize, handlePressPaginationChange } = useActivityList()

  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={apiParams.page}
          viewCount={apiParams.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handlePressChangeSize(e, apiParams)}
          onPaginationChange={(e: number) => handlePressPaginationChange(e, apiParams)}
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default SearchFooter
