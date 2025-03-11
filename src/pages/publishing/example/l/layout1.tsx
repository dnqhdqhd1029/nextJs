/**
 * @file layout1.tsx
 * @description layout1 페이지
 */

import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-common-inner">
        <div
          className="mb-lnb__section"
          style={{
            width: '30%',
            background: '#eee',
          }}
        >
          <div style={{ height: '1000px' }}>왼쪽</div>
        </div>
        <div
          className="mb-contents"
          style={{ background: '#999' }}
        >
          <div
            className="header-breadcrumb__section guide"
            style={{ position: 'sticky', top: '0' }}
          >
            <div style={{ height: '1000px' }}>브레드크럼</div>
          </div>
          <div style={{ height: '5000px' }}>컨텐츠</div>
        </div>
        <div
          className="mb-aside__section"
          style={{
            width: '40%',
            background: '#eee',
          }}
        >
          <div style={{ height: '1500px' }}>오른쪽</div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT1'
