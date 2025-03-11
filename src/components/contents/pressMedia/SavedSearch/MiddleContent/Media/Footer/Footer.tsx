import MbPagination from '~/components/contents/common/forms/MbPagination'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const MediaFooter = () => {
  const {
    mediaDto,
    isOwner,
    isFilterSubParam,
    pageCount,
    mediaListParams,
    savedMediaKey,
    handleMediaChangeSize,
    handleMediaPaginationChange,
  } = useSavedSearch()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={mediaDto.page}
          viewCount={mediaDto.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) =>
            handleMediaChangeSize(e, mediaDto, mediaListParams, savedMediaKey, isOwner, isFilterSubParam)
          }
          onPaginationChange={(e: number) =>
            handleMediaPaginationChange(e, mediaDto, mediaListParams, savedMediaKey, isOwner, isFilterSubParam)
          }
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default MediaFooter
