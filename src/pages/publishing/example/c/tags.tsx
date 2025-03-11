/**
 * @file tags.tsx
 * @description 가이드 - tag 모음 페이지
 */

import Tag from '~/publishing/components/common/ui/Tag'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">Tag</h1>
        <code className="guide__code">
          &lt;Tag 속성명=&#123;'속성값'&#125; /&gt;
          <br />- 속성 : label, cate, shape, close
        </code>
        <code className="guide__code">
          - cate : n1, n2, n3
          <br />
          - shape: round, rounded
          <br />- close:: true ? false(기본값)
        </code>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">rounded</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그1'}
                    cate={'n1'}
                    shape={'rounded'}
                  />
                  <p className="cate">cate : n1</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그2'}
                    cate={'n2'}
                    shape={'rounded'}
                  />
                  <p className="cate">cate : n2</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그3'}
                    cate={'n3'}
                    shape={'rounded'}
                  />
                  <p className="cate">cate : n3</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그1'}
                    cate={'n1'}
                    shape={'rounded'}
                    close={true}
                  />
                  <p className="cate">cate : n1</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그2'}
                    cate={'n2'}
                    shape={'rounded'}
                    close={true}
                  />
                  <p className="cate">cate : n2</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그3'}
                    cate={'n3'}
                    shape={'rounded'}
                    close={true}
                  />
                  <p className="cate">cate : n3</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 className="guide__item--title">round</h2>
          <div className="guide__group">
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그1'}
                    cate={'n1'}
                    shape={'round'}
                  />
                  <p className="cate">cate : n1</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그2'}
                    cate={'n2'}
                    shape={'round'}
                  />
                  <p className="cate">cate : n2</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그3'}
                    cate={'n3'}
                    shape={'round'}
                  />
                  <p className="cate">cate : n3</p>
                </div>
              </li>
            </ul>
            <ul className="guide__list--row">
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그1'}
                    cate={'n1'}
                    shape={'round'}
                    close={true}
                  />
                  <p className="cate">cate : n1</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그2'}
                    cate={'n2'}
                    shape={'round'}
                    close={true}
                  />
                  <p className="cate">cate : n2</p>
                </div>
              </li>
              <li className="guide__item">
                <div className="guide__box g--type2">
                  <Tag
                    label={'태그3'}
                    cate={'n3'}
                    shape={'round'}
                    close={true}
                  />
                  <p className="cate">cate : n3</p>
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
