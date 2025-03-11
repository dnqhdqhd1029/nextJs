/**
 * @file flags.tsx
 * @description 가이드 - flag 모음 페이지
 */

import Flag from '~/publishing/components/common/ui/Flag'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">Flag</h1>
        <code className="guide__code">
          &lt;Flag 속성명=&#123;'속성값'&#125; /&gt;
          <br />- 속성 : label, color, size
        </code>
        <code className="guide__code">
          - color : 'gray-500'
          <br />- size: s, es
        </code>

        <div style={{ marginTop: '30px' }}>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Flag
                    label={'공용'}
                    color={'gray-500'}
                    size={'s'}
                  />
                  <p className="cate">size : s</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Flag
                    label={'공용'}
                    color={'gray-500'}
                    size={'es'}
                  />
                  <p className="cate">size : es</p>
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
