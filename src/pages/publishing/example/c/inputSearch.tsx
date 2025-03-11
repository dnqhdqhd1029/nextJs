/**
 * @file inputSearch.tsx
 * @description 가이드 - form search 페이지
 */
import Link from 'next/link'

import FormInputSearch from '~/publishing/components/common/ui/FormInputSearch'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">input Search</h1>

        <code className="guide__code">
          &lt;FormInputSearch 속성명=&#123;'속성값'&#125; /&gt;
          <br />
          - 속성 (string) : title, placeholder, value, msg
          <br />- 속성 (boolean == true ? false) : required, tooltip, disabled, succeeded, failed
          <br />
          <br />- Tooltip = true 시, Tooltips 컴포넌트 적용 ex. " 타이틀 & 툴팁 "으로 찾기
          <br />-
          <Link
            href="/example/c/tooltip"
            legacyBehavior
          >
            <a target="_blank"> Tooltips 컴포넌트 가이드 보러가기</a>
          </Link>
        </code>

        <h2 className="guide__title">디폴트</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="guide__item--title">디폴트</p>
              <div className="guide__box g--type2">
                <FormInputSearch placeholder={'검색'} />
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
