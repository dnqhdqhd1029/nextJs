/**
 * @file typography.tsx
 * @description 가이드 - 폰트 페이지
 */

import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__hidden">Typography</h1>
        <h2 className="guide__title">Body</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="font-body__regular">Regular</p>
              <code className="guide__code">className="font-body__regular"</code>
              <code className="guide__code">@include fontBodyRegular(400)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__regular--medium">Regular Medium</p>
              <code className="guide__code">className="font-body__regular--medium"</code>
              <code className="guide__code">@include fontBodyRegular(500)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__regular--bold">Regular Bold</p>
              <code className="guide__code">className="font-body__regular--bold"</code>
              <code className="guide__code">@include fontBodyRegular(700)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__regular--light">Regular Light</p>
              <code className="guide__code">className="font-body__regular--light"</code>
              <code className="guide__code">@include fontBodyRegular(300)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__regular--italic">Regular Italic</p>
              <code className="guide__code">className="font-body__regular--italic"</code>
              <code className="guide__code">@include fontBodyRegular(400, italic)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__regular--underline">Regular Underline</p>
              <code className="guide__code">className="font-body__regular--underline"</code>
              <code className="guide__code">@include fontBodyRegular(400, normal, underline)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__regular--strike">Regular Strike</p>
              <code className="guide__code">className="font-body__regular--strike"</code>
              <code className="guide__code">@include fontBodyRegular(400, normal, line-through)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__small">small</p>
              <code className="guide__code">className="font-body__small"</code>
              <code className="guide__code">@include fontBodySmall</code>
            </li>
            <li className="guide__item">
              <p className="font-body__semi--small">Semi Small</p>
              <code className="guide__code">className="font-body__semi--small"</code>
              <code className="guide__code">@include fontBodySemiSmall</code>
            </li>
            <li className="guide__item">
              <p className="font-body__extra--small">Extra Small</p>
              <code className="guide__code">className="font-body__extra--small"</code>
              <code className="guide__code">@include fontBodyExtraSmall</code>
            </li>
            <li className="guide__item">
              <p className="font-body__semi--large">Semi Large</p>
              <code className="guide__code">className="font-body__semi--large"</code>
              <code className="guide__code">@include fontBodySemiLarge(400)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__semi--large-medium">Semi Large Medium</p>
              <code className="guide__code">className="font-body__semi--large-medium"</code>
              <code className="guide__code">@include fontBodySemiLarge(500)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__large">Large</p>
              <code className="guide__code">className="font-body__large"</code>
              <code className="guide__code">@include fontBodyLarge(400)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__large--medium">Large</p>
              <code className="guide__code">className="font-body__large--medium"</code>
              <code className="guide__code">@include fontBodyLarge(500)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__lead--semi">Semi Lead</p>
              <code className="guide__code">className="font-body__lead--semi"</code>
              <code className="guide__code">@include fontBodySemiLead</code>
            </li>
            <li className="guide__item">
              <p className="font-body__lead">Lead</p>
              <code className="guide__code">className="font-body__lead"</code>
              <code className="guide__code">@include fontBodyLead(400)</code>
            </li>
            <li className="guide__item">
              <p className="font-body__lead--medium">Lead medium</p>
              <code className="guide__code">className="font-body__lead--medium"</code>
              <code className="guide__code">@include fontBodyLead(500)</code>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">Headings</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="font-heading--h1">h1. MediaBee heading</p>
              <code className="guide__code">className="font-heading--h1"</code>
              <code className="guide__code">@include fontHeadings(h1)</code>
            </li>
            <li className="guide__item">
              <p className="font-heading--h2">h2. MediaBee heading</p>
              <code className="guide__code">className="font-heading--h2"</code>
              <code className="guide__code">@include fontHeadings(h2)</code>
            </li>
            <li className="guide__item">
              <p className="font-heading--h3">h3. MediaBee heading</p>
              <code className="guide__code">className="font-heading--h3"</code>
              <code className="guide__code">@include fontHeadings(h3)</code>
            </li>
            <li className="guide__item">
              <p className="font-heading--h4">h4. MediaBee heading</p>
              <code className="guide__code">className="font-heading--h4"</code>
              <code className="guide__code">@include fontHeadings(h4)</code>
            </li>
            <li className="guide__item">
              <p className="font-heading--h5">h5. MediaBee heading</p>
              <code className="guide__code">className="font-heading--h5"</code>
              <code className="guide__code">@include fontHeadings(h5)</code>
            </li>
            <li className="guide__item">
              <p className="font-heading--h6">h6. MediaBee heading</p>
              <code className="guide__code">className="font-heading--h6"</code>
              <code className="guide__code">@include fontHeadings(h6)</code>
            </li>
          </ul>
        </div>

        <h2 className="guide__title">Display headings</h2>
        <div className="guide__group">
          <ul className="guide__list--column">
            <li className="guide__item">
              <p className="font-display--d1">Display 1</p>
              <code className="guide__code">className="font-display--d1"</code>
              <code className="guide__code">@include fontHeadings(h1)</code>
            </li>
            <li className="guide__item">
              <p className="font-display--d2">Display 2</p>
              <code className="guide__code">className="font-display--d2"</code>
              <code className="guide__code">@include fontHeadings(h2)</code>
            </li>
            <li className="guide__item">
              <p className="font-display--d3">Display 3</p>
              <code className="guide__code">className="font-display--d3"</code>
              <code className="guide__code">@include fontHeadings(h3)</code>
            </li>
            <li className="guide__item">
              <p className="font-display--d4">Display 4</p>
              <code className="guide__code">className="font-display--d4"</code>
              <code className="guide__code">@include fontHeadings(h4)</code>
            </li>
            <li className="guide__item">
              <p className="font-display--d5">Display 5</p>
              <code className="guide__code">className="font-display--d5"</code>
              <code className="guide__code">@include fontHeadings(h5)</code>
            </li>
            <li className="guide__item">
              <p className="font-display--d6">Display 6</p>
              <code className="guide__code">className="font-display--d6"</code>
              <code className="guide__code">@include fontHeadings(h6)</code>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
