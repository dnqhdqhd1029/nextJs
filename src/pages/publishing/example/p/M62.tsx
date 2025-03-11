/**
 * @file M62.tsx
 * @description M62 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import { PageType } from '~/types/common'

const Sample: PageType = () => {
  return (
    <>
      <div className="mb-container responsive-type1">
        <div className="mb-common-inner max-w960">
          <div className="mb-contents">
            <div className="mb-contents-header__section type-sticky">
              <div className="common-title__section">
                <div className="common-title__group">
                  <h2 className="common-title__title">엑셀로 미디어 추가</h2>
                  <div className="common-title__buttons">
                    <div className="steps__group">
                      <ul className="steps__list">
                        <li>
                          <p className="steps__text">파일</p>
                        </li>
                        <li>
                          <p className="steps__text">목록</p>
                        </li>
                        <li className="is-active">
                          <p className="steps__text">완료</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="interval-mt14">
              <li>
                <div className="mb-contents-pb16__group">
                  <p className="font-body__regular">미디어를 추가했습니다.</p>
                </div>
              </li>
            </ul>
            <div className="mb-contents-footer__section">
              <div className="buttons__group type-left">
                <Button
                  label={'미디어 추가'}
                  cate={'default'}
                  size={'m'}
                  color={'outline-secondary'}
                />
                <Button
                  elem="a"
                  url={'#!'}
                  label={'추가한 미디어 보기'}
                  cate={'default'}
                  size={'m'}
                  color={'primary'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sample
Sample.PublishingLayout = 'LAYOUT4'
