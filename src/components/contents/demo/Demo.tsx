/**
 * @file demo.tsx
 * @description 데모 신청
 */

import ApplyPage from '~/components/contents/demo/Apply/Apply'
import Complete from '~/components/contents/demo/Complete/Complete'
import { useDemo } from '~/utils/hooks/contents/demo/useDemo'

const DemoApplyPage = () => {
  const { pageType } = useDemo()

  return (
    <>
      {pageType === '0' && <ApplyPage />}
      {pageType === '1' && <Complete />}
    </>
  )
}

export default DemoApplyPage
