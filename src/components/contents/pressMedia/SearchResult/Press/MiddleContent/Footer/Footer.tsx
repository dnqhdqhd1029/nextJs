import MbPagination from '~/components/contents/common/forms/MbPagination'
import { usePressMediaSearchResult } from '~/utils/hooks/contents/pressMedia/usePressMediaSearchResult'

const Footer = () => {
  const { pageCount, pressDto, pressListParams, handlePressChangeSize, handlePressPaginationChange } =
    usePressMediaSearchResult()
  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={pressDto.page}
          viewCount={pressDto.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handlePressChangeSize(e, pressDto, pressListParams)}
          onPaginationChange={(e: number) => handlePressPaginationChange(e, pressDto, pressListParams)}
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default Footer
