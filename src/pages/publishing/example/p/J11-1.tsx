/**
 * @file J11.tsx
 * @description J11 페이지
 */

import LnbCustomSearch1 from '~/publishing/components/common/layouts/LnbCustomSearch1'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-contents overflow-y"></div>
        <div className="mb-aside__section type-w1">
          <LnbCustomSearch1 />
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
