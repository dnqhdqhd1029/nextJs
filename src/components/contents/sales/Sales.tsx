/**
 * @file sales.tsx
 * @description 구매 상담
 */

import ApplyPage from '~/components/contents/sales/Apply/Apply'
import Complete from '~/components/contents/sales/Complete/Complete'
import { useSales } from '~/utils/hooks/contents/sales/useSales'

const SalesPage = () => {
  const { pageType } = useSales()

  return (
    <>
      {pageType === '0' && <ApplyPage />}
      {pageType === '1' && <Complete />}
    </>
  )
}

export default SalesPage
