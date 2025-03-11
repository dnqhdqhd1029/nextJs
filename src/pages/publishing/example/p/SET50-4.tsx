/**
 * @file SET50-4.tsx
 * @description SET50-4 페이지
 */

import Button from '~/publishing/components/common/ui/Button'
import FormInputText from '~/publishing/components/common/ui/FormInputText'
import IcoSvg from '~/publishing/components/common/ui/IcoSvg'
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
                  <h2 className="common-title__title">회원 추가</h2>
                  <div className="common-title__buttons">
                    <div className="steps__group">
                      <ul className="steps__list">
                        <li className="is-active">
                          <p className="steps__text">이메일</p>
                        </li>
                        <li>
                          <p className="steps__text">권한</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="setting-member__section">
              <ul className="interval-line-list28">
                <li>
                  <div className="mb-contents-pb16__group">
                    <h3 className="setting__headings6">1명씩 추가</h3>
                    <p className="font-body__regular">추가할 회원을 입력하세요</p>
                  </div>
                  <div className="form-pb0">
                    <div className="ipt-text__section w480">
                      <FormInputText
                        title={'이메일 추가'}
                        addBtn={true}
                      />
                      <div className="tags__section">
                        <ul className="tags__list">
                          <li>
                            <Tag
                              label={'abc123@gmail.com'}
                              cate={'n3'}
                              shape={'round'}
                              close={true}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-contents-pb16__group">
                    <h3 className="setting__headings6">엑셀로 추가</h3>
                    <p className="font-body__regular">
                      이메일이 입력된 엑셀 또는 CSV 파일로 여러 회원을 추가할 수 있습니다.
                    </p>
                  </div>
                  <div className="button-add__section">
                    <button
                      type="button"
                      className="button-add__button"
                    >
                      <span className="button-add__button-ico">
                        <IcoSvg data={icoSvgData.excelFill} />
                      </span>
                      <span className="button-add__button-text">엑셀로 추가</span>
                    </button>
                  </div>
                  <div className="tags__section">
                    <ul className="tags__list">
                      <li>
                        <Tag
                          label={'연락처.csv'}
                          cate={'n3'}
                          shape={'round'}
                          close={true}
                        />
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mb-contents-footer__section">
              <div className="buttons__group type-between">
                <div className="buttons__group type-left">
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
