import MbPagination from '~/components/contents/common/forms/MbPagination'
import { useSavedSearch } from '~/utils/hooks/contents/pressMedia/useSavedSearch'

const PressFooter = () => {
  const {
    pressDto,
    pageCount,
    isOwner,
    isFilterSubParam,
    pressListParams,
    savedJournalKey,
    handlePressChangeSize,
    handlePressPaginationChange,
  } = useSavedSearch()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={pressDto.page}
          viewCount={pressDto.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) =>
            handlePressChangeSize(e, pressDto, pressListParams, savedJournalKey, isOwner, isFilterSubParam)
          }
          onPaginationChange={(e: number) =>
            handlePressPaginationChange(e, pressDto, pressListParams, savedJournalKey, isOwner, isFilterSubParam)
          }
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default PressFooter
