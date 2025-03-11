/**
 * @file layout5.tsx
 * @description layout5 페이지
 */

import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div
        className="header-breadcrumb__section guide"
        style={{ position: 'sticky', top: '52px' }}
      >
        브레드크럼
      </div>
      <div className="mb-container">
        <div className="mb-common-inner">
          <div
            className="mb-contents"
            style={{ background: '#999' }}
          >
            <div style={{ height: '50000px' }}>컨텐츠</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT5'
