/**
 * @file J14.tsx
 * @description J14 페이지
 */

import LnbFilter from '~/publishing/components/common/layouts/LnbFilter'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-lnb__section type-w1">
          <LnbFilter />
        </div>
        <div className="mb-contents"></div>
        <div className="mb-aside__section type-w2"></div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
