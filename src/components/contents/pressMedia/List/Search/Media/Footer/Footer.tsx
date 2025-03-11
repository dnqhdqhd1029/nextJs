import MbPagination from '~/components/contents/common/forms/MbPagination'
import { useMediaListManagement } from '~/utils/hooks/contents/pressMedia/useMediaListManagement'

const MediaFooter = () => {
  const { pageCount, mediaListParams, handleChangeSize, handlePaginationChange } = useMediaListManagement()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={mediaListParams.page}
          viewCount={mediaListParams.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handleChangeSize(e, mediaListParams)}
          onPaginationChange={(e: number) => handlePaginationChange(e, mediaListParams)}
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default MediaFooter
