/**
 * @file SET01-2.tsx
 * @description SET01-2 페이지
 */

import LnbSetting from '~/publishing/components/common/layouts/LnbSetting'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner search">
        <div className="mb-lnb__section type-w2">
          <LnbSetting />
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
