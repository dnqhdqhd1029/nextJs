import MbPagination from '~/components/contents/common/forms/MbPagination'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const Footer = () => {
  const { pageCount, mediaDto, mediaListParams, handleMediaChangeSize, handleMediaPaginationChange } =
    usePressMediaSearchResult()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={mediaDto.page}
          viewCount={mediaDto.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handleMediaChangeSize(e, mediaDto, mediaListParams)}
          onPaginationChange={(e: number) => handleMediaPaginationChange(e, mediaDto, mediaListParams)}
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default Footer
