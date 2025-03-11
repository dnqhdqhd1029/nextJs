/**
 * @file MbPagination.tsx
 * @description 테이블 하단 기능
 */

import PageSizeSelect from '~/components/common/ui/PageSizeSelect'
import Pagination from '~/components/common/ui/Pagination'
import Skeleton from '~/components/common/ui/Skeleton'

const defaultSizeOptions = [10, 20, 30, 50, 100, 200, 300]

export interface Props {
  currentPageIndex?: number
  totalPageCount?: number
  totalCount?: number
  viewCount?: number
  paginationViewSize?: number
  isPageLoadCompleted?: boolean
  onSelectSize?: (size: number) => void
  onPaginationChange?: (index: number) => void
  sizeOptions?: number[]
}

const MbPagination = ({
  currentPageIndex = 1,
  totalPageCount = 1,
  viewCount = 10,
  paginationViewSize = 10,
  onSelectSize,
  onPaginationChange,
  totalCount,
  sizeOptions = defaultSizeOptions,
  isPageLoadCompleted,
}: Props) => {
  return (
    <>
      {totalCount !== undefined && totalCount > 0 && (
        <>
          {isPageLoadCompleted ? (
            <>
              <Pagination
                type={'n3'}
                count={totalPageCount}
                elementSize={viewCount}
                viewCount={paginationViewSize}
                page={currentPageIndex}
                onPageChange={onPaginationChange}
              />
              {onSelectSize && (
                <div className="display-flex align-items__center ml-8">
                  <PageSizeSelect
                    value={viewCount}
                    type="small"
                    onSelectSize={onSelectSize}
                    option={sizeOptions}
                  />
                </div>
              )}
            </>
          ) : (
            <Skeleton
              height={'35px'}
              width={'100%'}
              wrapperStyle={{
                display: 'flex',
                width: '100%',
                maxWidth: '470px',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            />
          )}
        </>
      )}
    </>
  )
}

export default MbPagination
