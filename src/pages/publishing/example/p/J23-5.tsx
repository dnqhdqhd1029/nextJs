/**
 * @file J23-5.tsx
 * @description J23-5 페이지
 */

import LnbCustomSearch3 from '~/publishing/components/common/layouts/LnbCustomSearch3'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-lnb__section type-w1 overflow-y">
          <LnbCustomSearch3 />
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
