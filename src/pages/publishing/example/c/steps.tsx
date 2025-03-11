/**
 * @file steps.tsx
 * @description 가이드 - steps 페이지
 */

import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <section className="guide__section">
        <h1 className="guide__title">steps</h1>

        <div style={{ marginTop: '30px' }}>
          <div className="guide__group">
            <div className="steps__group">
              <ul className="steps__list">
                <li className="is-active">
                  <p className="steps__text">파일</p>
                </li>
                <li>
                  <p className="steps__text">목록</p>
                </li>
                <li>
                  <p className="steps__text">설정</p>
                </li>
                <li>
                  <p className="steps__text">완료</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'BLANK'
