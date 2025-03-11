/**
 * @file TableBoardFooter.tsx
 * @description 게시판 하단 기능
 */
import MbPagination from '~/components/contents/common/forms/MbPagination'

interface Props {
  currentPageIndex?: number
  totalPageCount?: number
  totalCount?: number
  viewCount?: number
  paginationViewSize?: number
  onSelectSize?: (size: number) => void
  onPaginationChange?: (index: number) => void
  sizeOptions?: number[]
  isPageLoadCompleted?: boolean
}

const TableBoardFooter = ({
  isPageLoadCompleted,
  totalCount,
  currentPageIndex,
  viewCount,
  totalPageCount,
  onSelectSize,
  onPaginationChange,
  sizeOptions,
}: Props) => {
  if (!isPageLoadCompleted) {
    return null
  }
  return (
    <>
      <div className="setting-contents-list__footer">
        <MbPagination
          totalCount={totalCount}
          currentPageIndex={currentPageIndex}
          viewCount={viewCount}
          totalPageCount={totalPageCount}
          onSelectSize={onSelectSize}
          onPaginationChange={onPaginationChange}
          sizeOptions={sizeOptions}
          isPageLoadCompleted={isPageLoadCompleted}
        />
      </div>
    </>
  )
}

export default TableBoardFooter
