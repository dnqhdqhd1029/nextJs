/**
 * @file inputToggle.tsx
 * @description 가이드 - 토글버튼 페이지
 */

import FormInputToggle from '~/publishing/components/common/ui/FormInputToggle'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">input Toggle</h1>

        <code className="guide__code">
          &lt;FormInputToggle 속성명=&#123;'속성값'&#125; /&gt;
          <br />
          - 속성 (string) : title, name, id, label
          <br />- 속성 (boolean == true ? false) : checked, disabled, required, tooltip
          <br />
        </code>

        <h2 className="guide__title">단일</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputToggle
                  name="cT1"
                  id="cT1"
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">disabled</p>
              <div className="guide__box g--type2">
                <FormInputToggle
                  name="cT2"
                  id="cT2"
                  disabled={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">checked & disabled</p>
              <div className="guide__box g--type2">
                <FormInputToggle
                  name="cT3"
                  id="cT3"
                  checked={true}
                  disabled={true}
                />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">Label</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputToggle
                  name="cT11"
                  id="cT11"
                  label="라벨1"
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">디폴트 - reverse</p>
              <div
                className="guide__box g--type2"
                style={{ display: 'flex' }}
              >
                <FormInputToggle
                  name="cT100"
                  id="cT100"
                  label="라벨1"
                  reverse={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">disabled</p>
              <div className="guide__box g--type2">
                <FormInputToggle
                  name="cT12"
                  id="cT12"
                  label="라벨2"
                  disabled={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">checked & disabled</p>
              <div className="guide__box g--type2">
                <FormInputToggle
                  name="cT13"
                  id="cT13"
                  label="라벨3"
                  checked={true}
                  disabled={true}
                />
              </div>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">제목 있을 때</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputToggle
                  name="cT21"
                  id="cT21"
                  label="라벨1"
                  title={'제목입니다'}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">disabled</p>
              <div className="guide__box g--type2">
                <FormInputToggle
                  name="cT22"
                  id="cT22"
                  label="라벨2"
                  disabled={true}
                  title={'필수 제목입니다'}
                  required={true}
                />
              </div>
            </li>
            <li className="guide__item">
              <p className="guide__item--title">checked & disabled</p>
              <div className="guide__box g--type2">
                <FormInputToggle
                  name="cT23"
                  id="cT23"
                  label="라벨3"
                  checked={true}
                  disabled={true}
                  title={'툴팁형 제목'}
                  tooltip={true}
                />
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
