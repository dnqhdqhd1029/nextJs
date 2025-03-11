import Pagination from '~/components/common/ui/Pagination'
import { useMediaBriefing } from '~/utils/hooks/contents/mediaBriefing/useMediaBriefing'

const Footer = () => {
  const { pageCount, mediabriefingSearchParams, handlePaginationChange } = useMediaBriefing()
  return (
    <div className="mb-contents-footer__section type-pagination">
      <Pagination
        type={'n3'}
        count={pageCount.totalPageCount}
        page={mediabriefingSearchParams.page}
        onPageChange={(e: number) => handlePaginationChange(e, mediabriefingSearchParams)}
      />
    </div>
  )
}

export default Footer
