/**
 * @file pagination.tsx
 * @description 가이드 - pagination 모음 페이지
 */

import Pagination from '~/publishing/components/common/ui/Pagination'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">Pagination</h1>
        <code className="guide__code">
          &lt;Pagination 속성명=&#123;'속성값'&#125; /&gt;
          <br />- 속성 : cate, option
        </code>
        <code className="guide__code">- cate: n1, n2, n3, n4</code>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">cate: n1</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Pagination cate={'n1'} />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">cate: n2</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Pagination cate={'n2'} />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">cate: n3</h2>
          <div className="guide__group">
            <div className="guide__box g--type2">
              <Pagination cate={'n3'} />
            </div>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">cate: n4</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Pagination cate={'n4'} />
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
