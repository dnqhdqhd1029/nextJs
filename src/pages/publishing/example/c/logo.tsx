/**
 * @file logo.tsx
 * @description 가이드 - 로고 페이지
 */

import MediaBeeLogo from '~/publishing/components/common/ui/MediaBeeLogo'
import { PageType } from '~/types/common'
const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">MediaBee 로고</h1>
        <code className="guide__code">
          &lt;MediaBeeLogo 속성명=&#123;'속성값'&#125; /&gt;
          <br />- 속성 (number) : w
        </code>

        <div style={{ marginTop: '30px' }}>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <MediaBeeLogo />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
