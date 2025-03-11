/**
 * @file M60.tsx
 * @description M60 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormTitle from '~/publishing/components/common/ui/FormTitle'
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
                        <li className="is-active">
                          <p className="steps__text">파일</p>
                        </li>
                        <li>
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
                  <p className="font-body__regular">업로드할 엑셀 파일은 아래 파일 샘플과 필드명이 일치해야 합니다.</p>
                </div>
              </li>
              <li>
                <div className="button-select-style__section">
                  <div className="button-select-style__group">
                    <Button
                      label={'엑셀 업로드'}
                      cate={'default'}
                      size={'m'}
                      color={'primary'}
                    />
                  </div>
                  <div className="tags__section">
                    <ul className="tags__list">
                      <li>
                        <Tag
                          label={'내가 작성한 기자 미디어.csv'}
                          cate={'n3'}
                          shape={'round'}
                          close={true}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div className="mb-contents-pb16__group">
                  <FormTitle title={'엑셀 샘플'} />
                  <Button
                    label={'입력 샘플 다운로드'}
                    cate={'link-ico-text'}
                    size={''}
                    color={'body-link'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.excelFill}
                  />
                </div>
              </li>
              <li>
                <div className="bullet-list__group">
                  <h6 className="bullet-list__title">주의 사항</h6>
                  <ul className="bullet-list">
                    <li>
                      <p className="bullet-list__text">
                        미디어를 위 샘플을 참고해 엑셀 또는 CSV파일로 저장한 후 업로드하세요.
                      </p>
                    </li>
                    <li>
                      <p className="bullet-list__text">미디어는 필수 입력 필드입니다.</p>
                    </li>
                    <li>
                      <p className="bullet-list__text">
                        필드 내에 2개 이상의 정보를 입력하는 경우, 세미콜론 (;)으로 구분해야 합니다.
                      </p>
                    </li>
                    <li>
                      <p className="bullet-list__text">한 번에 2,000개까지 뉴스를 업로드할 수 있습니다.</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div className="mb-contents-footer__section">
              <div className="buttons__group type-between">
                <div className="buttons__group type-left">
                  {/* <Button
                    label={'이전'}
                    cate={'default-ico-text'}
                    size={'m'}
                    color={'primary'}
                    icoLeft={true}
                    icoLeftData={icoSvgData.chevronThickLeft}
                    disabled={true}
                  /> */}
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
                  disabled={true}
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
