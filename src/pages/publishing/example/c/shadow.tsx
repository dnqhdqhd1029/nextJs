/**
 * @file shadow.tsx
 * @description 가이드 - shadow 페이지
 */

import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__hidden">Shadow</h1>
        <h2 className="guide__title">No shadow</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box">No shadow</div>
              <code className="guide__code"></code>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">Small shadow</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box shadow--small">Small shadow</div>
              <code className="guide__code">className=shadow--small</code>
              <code className="guide__code">@include shadowStyled(s)</code>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">Regular shadow</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box shadow--regular">Regular shadow</div>
              <code className="guide__code">className=shadow--regular</code>
              <code className="guide__code">@include shadowStyled(r)</code>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">Larger shadow</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <div className="guide__box shadow--large">Larger shadow</div>
              <code className="guide__code">className=shadow--large</code>
              <code className="guide__code">@include shadowStyled(l)</code>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
