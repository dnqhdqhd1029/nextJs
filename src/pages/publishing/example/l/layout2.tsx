/**
 * @file layout2.tsx
 * @description layout2 페이지
 */

import Footer from '~/publishing/components/common/layouts/Footer'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="header-breadcrumb__section guide">브레드크럼</div>
      <div className="mb-container guide">
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
      </div>
      <Footer />
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT2'
