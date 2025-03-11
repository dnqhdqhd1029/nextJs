import MbPagination from '~/components/contents/common/forms/MbPagination'
import { useTagMonitoring } from '~/utils/hooks/contents/monitoring/useTagMonitoring'

const TagFooter = () => {
  const { pageCount, tagType, tagListParams, handlePaginationChange, handleChangeSize } = useTagMonitoring()

  return (
    <div className="mb-contents-layout__footer">
      <div className="search-result__footer">
        <MbPagination
          totalCount={pageCount.totalCount}
          currentPageIndex={tagListParams.page}
          viewCount={tagListParams.size}
          totalPageCount={pageCount.totalPageCount}
          onSelectSize={(e: number) => handleChangeSize(e, tagListParams, tagType)}
          onPaginationChange={(e: number) => handlePaginationChange(e, tagListParams, tagType)}
          isPageLoadCompleted={true}
        />
      </div>
    </div>
  )
}

export default TagFooter
