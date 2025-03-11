import MbPagination from '~/components/contents/common/forms/MbPagination'
import { usePressMediaListResult } from '~/utils/hooks/contents/pressMedia/useListResult'

const PressFooter = () => {
  const {
    pressDto,
    pageCount,
    isOwner,
    isFilterSubParam,
    journalArrayId,
    handlePressChangeSize,
    handlePressPaginationChange,
  } = usePressMediaListResult()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={pressDto.page}
          viewCount={pressDto.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handlePressChangeSize(e, pressDto, journalArrayId, isOwner, isFilterSubParam)}
          onPaginationChange={(e: number) =>
            handlePressPaginationChange(e, pressDto, journalArrayId, isOwner, isFilterSubParam)
          }
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default PressFooter
