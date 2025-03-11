/**
 * @file J21.tsx
 * @description J21 페이지
 */

import LnbSearchFilter from '~/publishing/components/common/layouts/LnbSearchFilter'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-lnb__section type-w1 overflow-y">
          <LnbSearchFilter />
        </div>
        <div className="mb-contents">
          <div className="mb-contents-layout__section"></div>
        </div>
        <div className="mb-aside__section type-w2"></div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
