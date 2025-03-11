/**
 * @file layout4.tsx
 * @description layout4 페이지
 */

import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container guide">
        <div className="mb-common-inner type-w1">
          <div
            className="mb-lnb__section"
            style={{
              top: '52px',
              height: `calc(100% - ${52}px)`,
            }}
          >
            <div style={{ height: '4000px', background: 'yellow' }}>왼쪽</div>
          </div>
          <div
            className="mb-contents"
            style={{ background: '#999' }}
          >
            <div style={{ height: '5000px', background: 'green' }}>컨텐츠</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
