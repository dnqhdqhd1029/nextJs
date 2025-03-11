import MbPagination from '~/components/contents/common/forms/MbPagination'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const MediaFooter = () => {
  const {
    mediaDto,
    isOwner,
    isFilterSubParam,
    pageCount,
    mediaArrayId,
    handleMediaChangeSize,
    handleMediaPaginationChange,
  } = usePressMediaListResult()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={mediaDto.page}
          viewCount={mediaDto.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handleMediaChangeSize(e, mediaDto, mediaArrayId, isOwner, isFilterSubParam)}
          onPaginationChange={(e: number) =>
            handleMediaPaginationChange(e, mediaDto, mediaArrayId, isOwner, isFilterSubParam)
          }
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default MediaFooter
