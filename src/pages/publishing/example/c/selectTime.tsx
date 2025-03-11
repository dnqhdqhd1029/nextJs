/**
 * @file selectTime.tsx
 * @description 가이드 - 셀렉트박스 시간 페이지
 */

import SelectTime from '~/publishing/components/common/ui/SelectTime'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">셀렉트박스 - 시간</h1>

        <h2 className="guide__title">디폴트</h2>
        <code className="guide__code">
          &lt;SelectTime 속성명=&#123;'속성값'&#125; /&gt;
          <br />- 속성 (string) : placeholder
          <br />- 시 : 0~23 / 분: 0 ~ 60
        </code>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">기본</p>
              <div className="guide__box g--type2">
                <SelectTime placeholder={'시간 선택'} />
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
