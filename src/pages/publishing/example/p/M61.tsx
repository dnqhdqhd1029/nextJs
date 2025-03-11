/**
 * @file M61.tsx
 * @description M61 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import icoSvgData from '~/publishing/components/common/ui/json/icoSvgData.json'
import Tag from '~/publishing/components/common/ui/Tag'
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
                        <li className="is-active">
                          <p className="steps__text">목록</p>
                        </li>
                        <li>
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
                  <p className="font-body__regular">추가하려는 미디어를 목록에 저장하고 싶으면 선택하세요.</p>
                </div>
              </li>
              <li>
                <div className="button-select-style__section">
                  <div className="button-select-style__group">
                    <Button
                      label={'목록 선택'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                    />
                  </div>
                  <div className="tags__section">
                    <ul className="tags__list">
                      <li>
                        <Tag
                          label={'경제/경영 잡지'}
                          cate={'n3'}
                          shape={'round'}
                          close={true}
                        />
                      </li>
                      <li>
                        <Tag
                          label={'영자지'}
                          cate={'n3'}
                          shape={'round'}
                          close={true}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <div className="mb-contents-footer__section">
              <div className="buttons__group type-between">
                <div className="buttons__group type-left">
                  <Button
                    label={'이전'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'outline-secondary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronThickLeft}
                  />
                  <Button
                    label={'취소'}
                    cate={'default'}
                    size={'m'}
                    color={'outline-secondary'}
                  />
                </div>
                <Button
                  label={'다음'}
                  cate={'default-ico-text'}
                  size={'m'}
                  color={'primary'}
                  icoRight={true}
                  icoRightData={icoSvgData.chevronThickRight}
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
